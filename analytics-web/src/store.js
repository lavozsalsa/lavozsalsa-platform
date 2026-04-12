'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const ACTIVE_WINDOW_MS = 90_000;
const DEFAULT_RANGE = '24h';
const DEFAULT_BUCKET = '15m';
const MAX_RECENT_SESSIONS = 30;
const MAX_RECENT_EVENTS = 40;
const MAX_TOP_ERRORS = 10;
const MAX_TOP_LOCATIONS = 10;

const RANGE_PRESETS = {
  '1h': { key: '1h', label: 'Ultima hora', ms: 60 * 60 * 1000, defaultBucket: '1m' },
  '6h': { key: '6h', label: 'Ultimas 6 horas', ms: 6 * 60 * 60 * 1000, defaultBucket: '5m' },
  '24h': { key: '24h', label: 'Ultimas 24 horas', ms: 24 * 60 * 60 * 1000, defaultBucket: '15m' },
  '7d': { key: '7d', label: 'Ultimos 7 dias', ms: 7 * 24 * 60 * 60 * 1000, defaultBucket: '1h' },
};

const BUCKET_PRESETS = {
  '1m': { key: '1m', label: '1 min', ms: 60 * 1000 },
  '5m': { key: '5m', label: '5 min', ms: 5 * 60 * 1000 },
  '15m': { key: '15m', label: '15 min', ms: 15 * 60 * 1000 },
  '1h': { key: '1h', label: '1 hora', ms: 60 * 60 * 1000 },
};

function ensureDirectoryForFile(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function ensureTableColumn(database, tableName, columnName, columnDefinition) {
  const columns = database.prepare(`PRAGMA table_info(${tableName})`).all();
  if (columns.some((column) => column.name === columnName)) {
    return;
  }

  database.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDefinition}`);
}

function escapeLikeUnsafeText(value, maxLength = 200) {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return null;
  }

  return normalized.slice(0, maxLength);
}

function normalizeToken(value, fallback, maxLength = 64) {
  const normalized = escapeLikeUnsafeText(value, maxLength);
  if (!normalized) {
    return fallback;
  }

  return normalized.toLowerCase().replace(/[^a-z0-9._-]+/g, '_');
}

function normalizeTimestamp(value, fallback) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) {
      return numeric;
    }

    const parsed = Date.parse(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function createEventId() {
  return crypto.randomUUID();
}

function serializeDetails(details) {
  if (details == null) {
    return '{}';
  }

  if (typeof details === 'string') {
    return JSON.stringify({ note: details.slice(0, 500) });
  }

  if (typeof details === 'object') {
    return JSON.stringify(details);
  }

  return JSON.stringify({ value: details });
}

function normalizeCountryCode(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toUpperCase().replace(/[^A-Z]/g, '');
  return normalized ? normalized.slice(0, 8) : null;
}

function extractGeoDetails(details) {
  if (!details || typeof details !== 'object' || Array.isArray(details)) {
    return {
      countryCode: null,
      country: null,
      region: null,
      city: null,
    };
  }

  const source = details.geo && typeof details.geo === 'object' && !Array.isArray(details.geo)
    ? details.geo
    : details;

  return {
    countryCode: normalizeCountryCode(
      source.countryCode || source.country_code || source.isoCode || source.countryIsoCode
    ),
    country: escapeLikeUnsafeText(source.country, 120),
    region: escapeLikeUnsafeText(source.region || source.regionName || source.subdivision, 120),
    city: escapeLikeUnsafeText(source.city, 120),
  };
}

function createLocationLabel(countryCode, country, region, city) {
  const parts = [];

  if (city) {
    parts.push(city);
  }

  if (region && region !== city) {
    parts.push(region);
  }

  if (countryCode) {
    parts.push(countryCode);
  } else if (country && country !== region) {
    parts.push(country);
  }

  return parts.join(', ') || null;
}

function hashRemoteAddress(remoteAddress, salt) {
  const value = escapeLikeUnsafeText(remoteAddress, 120);
  if (!value) {
    return null;
  }

  return crypto.createHash('sha256').update(`${salt}:${value}`).digest('hex').slice(0, 24);
}

function openAnalyticsDatabase(databasePath) {
  ensureDirectoryForFile(databasePath);
  const database = new DatabaseSync(databasePath);

  database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id TEXT NOT NULL UNIQUE,
      session_id TEXT NOT NULL,
      device_id TEXT NOT NULL,
      platform TEXT NOT NULL,
      app_version TEXT,
      stream_type TEXT NOT NULL,
      event_type TEXT NOT NULL,
      playback_state TEXT,
      error_code TEXT,
      error_message TEXT,
      network_type TEXT,
      client_timestamp INTEGER NOT NULL,
      server_timestamp INTEGER NOT NULL,
      ip_hash TEXT,
      user_agent TEXT,
      country_code TEXT,
      country TEXT,
      region TEXT,
      city TEXT,
      details_json TEXT NOT NULL DEFAULT '{}'
    );

    CREATE INDEX IF NOT EXISTS idx_events_server_timestamp ON events(server_timestamp DESC);
    CREATE INDEX IF NOT EXISTS idx_events_session_id ON events(session_id);
    CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);
    CREATE INDEX IF NOT EXISTS idx_events_platform ON events(platform);
    CREATE INDEX IF NOT EXISTS idx_events_stream_type ON events(stream_type);

    CREATE TABLE IF NOT EXISTS sessions (
      session_id TEXT PRIMARY KEY,
      device_id TEXT NOT NULL,
      platform TEXT NOT NULL,
      app_version TEXT,
      stream_type TEXT NOT NULL,
      status TEXT NOT NULL,
      started_at INTEGER NOT NULL,
      playback_ready_at INTEGER,
      ended_at INTEGER,
      last_seen_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      last_event_type TEXT NOT NULL,
      last_error TEXT,
      network_type TEXT,
      ip_hash TEXT,
      user_agent TEXT,
      country_code TEXT,
      country TEXT,
      region TEXT,
      city TEXT,
      heartbeat_count INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_last_seen_at ON sessions(last_seen_at DESC);
    CREATE INDEX IF NOT EXISTS idx_sessions_started_at ON sessions(started_at DESC);
    CREATE INDEX IF NOT EXISTS idx_sessions_platform ON sessions(platform);
    CREATE INDEX IF NOT EXISTS idx_sessions_stream_type ON sessions(stream_type);
    CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
  `);

  ensureTableColumn(database, 'events', 'country_code', 'TEXT');
  ensureTableColumn(database, 'events', 'country', 'TEXT');
  ensureTableColumn(database, 'events', 'region', 'TEXT');
  ensureTableColumn(database, 'events', 'city', 'TEXT');
  ensureTableColumn(database, 'sessions', 'country_code', 'TEXT');
  ensureTableColumn(database, 'sessions', 'country', 'TEXT');
  ensureTableColumn(database, 'sessions', 'region', 'TEXT');
  ensureTableColumn(database, 'sessions', 'city', 'TEXT');

  return database;
}

function resolveRangePreset(rangeKey) {
  return RANGE_PRESETS[rangeKey] || RANGE_PRESETS[DEFAULT_RANGE];
}

function resolveBucketPreset(bucketKey, rangePreset) {
  if (bucketKey && BUCKET_PRESETS[bucketKey]) {
    return BUCKET_PRESETS[bucketKey];
  }

  return BUCKET_PRESETS[rangePreset.defaultBucket] || BUCKET_PRESETS[DEFAULT_BUCKET];
}

function normalizeIncomingEvent(rawEvent, context) {
  const now = Date.now();
  const sessionId = escapeLikeUnsafeText(rawEvent.sessionId || rawEvent.session_id, 96);
  const deviceId = escapeLikeUnsafeText(rawEvent.deviceId || rawEvent.device_id, 128);
  const geo = extractGeoDetails(rawEvent.details);

  if (!sessionId) {
    throw new Error('sessionId es obligatorio');
  }

  if (!deviceId) {
    throw new Error('deviceId es obligatorio');
  }

  const clientTimestamp = normalizeTimestamp(
    rawEvent.clientTimestamp || rawEvent.client_timestamp || rawEvent.timestamp,
    now
  );

  return {
    eventId: escapeLikeUnsafeText(rawEvent.eventId || rawEvent.event_id, 96) || createEventId(),
    sessionId,
    deviceId,
    platform: normalizeToken(rawEvent.platform, 'unknown', 48),
    appVersion: escapeLikeUnsafeText(rawEvent.appVersion || rawEvent.app_version, 64),
    streamType: normalizeToken(rawEvent.streamType || rawEvent.stream_type, 'unknown', 48),
    eventType: normalizeToken(rawEvent.eventType || rawEvent.event_type, 'unknown', 48),
    playbackState: normalizeToken(rawEvent.playbackState || rawEvent.playback_state, 'unknown', 48),
    errorCode: escapeLikeUnsafeText(rawEvent.errorCode || rawEvent.error_code, 64),
    errorMessage: escapeLikeUnsafeText(rawEvent.errorMessage || rawEvent.error_message, 280),
    networkType: normalizeToken(rawEvent.networkType || rawEvent.network_type, 'unknown', 48),
    clientTimestamp,
    serverTimestamp: now,
    ipHash: context.ipHash || null,
    userAgent: escapeLikeUnsafeText(context.userAgent, 240),
    countryCode: geo.countryCode,
    country: geo.country,
    region: geo.region,
    city: geo.city,
    detailsJson: serializeDetails(rawEvent.details),
  };
}

function extractPayloadEvents(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.events)) {
    return payload.events;
  }

  if (payload && typeof payload === 'object') {
    return [payload];
  }

  return [];
}

function deriveSessionStatus(previousSession, event) {
  switch (event.eventType) {
    case 'session_started':
      return 'starting';
    case 'playback_buffering':
      return 'buffering';
    case 'playback_ready':
    case 'heartbeat':
      return previousSession && previousSession.playback_ready_at == null && event.eventType === 'heartbeat'
        ? previousSession.status
        : 'playing';
    case 'playback_error':
      return 'error';
    case 'session_ended':
      return 'ended';
    case 'stream_switched':
      return previousSession ? previousSession.status : 'starting';
    default:
      return previousSession ? previousSession.status : 'starting';
  }
}

function toSessionDurationSeconds(session, now) {
  if (!session || !session.started_at) {
    return 0;
  }

  const end = session.ended_at || now;
  return Math.max(0, Math.round((end - session.started_at) / 1000));
}

function mapRecentSession(session, now) {
  return {
    sessionId: session.session_id,
    deviceId: session.device_id,
    platform: session.platform,
    appVersion: session.app_version,
    streamType: session.stream_type,
    status: session.status,
    startedAt: session.started_at,
    playbackReadyAt: session.playback_ready_at,
    endedAt: session.ended_at,
    lastSeenAt: session.last_seen_at,
    lastEventType: session.last_event_type,
    lastError: session.last_error,
    networkType: session.network_type,
    countryCode: session.country_code,
    country: session.country,
    region: session.region,
    city: session.city,
    locationLabel: createLocationLabel(session.country_code, session.country, session.region, session.city),
    heartbeatCount: session.heartbeat_count,
    durationSeconds: toSessionDurationSeconds(session, now),
  };
}

function mapRecentEvent(event) {
  return {
    eventId: event.event_id,
    sessionId: event.session_id,
    platform: event.platform,
    streamType: event.stream_type,
    eventType: event.event_type,
    playbackState: event.playback_state,
    errorCode: event.error_code,
    errorMessage: event.error_message,
    networkType: event.network_type,
    countryCode: event.country_code,
    country: event.country,
    region: event.region,
    city: event.city,
    locationLabel: createLocationLabel(event.country_code, event.country, event.region, event.city),
    serverTimestamp: event.server_timestamp,
  };
}

function createAnalyticsStore(database, options = {}) {
  const activeWindowMs = options.activeWindowMs || ACTIVE_WINDOW_MS;
  const ipHashSalt = options.ipHashSalt || 'lavozsalsa-analytics';

  const insertEvent = database.prepare(`
    INSERT INTO events (
      event_id,
      session_id,
      device_id,
      platform,
      app_version,
      stream_type,
      event_type,
      playback_state,
      error_code,
      error_message,
      network_type,
      client_timestamp,
      server_timestamp,
      ip_hash,
      user_agent,
      country_code,
      country,
      region,
      city,
      details_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const selectSession = database.prepare(`
    SELECT
      session_id,
      device_id,
      platform,
      app_version,
      stream_type,
      status,
      started_at,
      playback_ready_at,
      ended_at,
      last_seen_at,
      updated_at,
      last_event_type,
      last_error,
      network_type,
      ip_hash,
      user_agent,
      country_code,
      country,
      region,
      city,
      heartbeat_count
    FROM sessions
    WHERE session_id = ?
  `);

  const insertSession = database.prepare(`
    INSERT INTO sessions (
      session_id,
      device_id,
      platform,
      app_version,
      stream_type,
      status,
      started_at,
      playback_ready_at,
      ended_at,
      last_seen_at,
      updated_at,
      last_event_type,
      last_error,
      network_type,
      ip_hash,
      user_agent,
      country_code,
      country,
      region,
      city,
      heartbeat_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const updateSession = database.prepare(`
    UPDATE sessions
    SET
      device_id = ?,
      platform = ?,
      app_version = ?,
      stream_type = ?,
      status = ?,
      started_at = ?,
      playback_ready_at = ?,
      ended_at = ?,
      last_seen_at = ?,
      updated_at = ?,
      last_event_type = ?,
      last_error = ?,
      network_type = ?,
      ip_hash = ?,
      user_agent = ?,
      country_code = ?,
      country = ?,
      region = ?,
      city = ?,
      heartbeat_count = ?
    WHERE session_id = ?
  `);

  const countConnectedNow = database.prepare(`
    SELECT COUNT(*) AS value
    FROM sessions
    WHERE playback_ready_at IS NOT NULL
      AND ended_at IS NULL
      AND last_seen_at >= ?
  `);

  const countConnectingNow = database.prepare(`
    SELECT COUNT(*) AS value
    FROM sessions
    WHERE playback_ready_at IS NULL
      AND ended_at IS NULL
      AND last_seen_at >= ?
  `);

  const countSessionsStarted = database.prepare(`
    SELECT COUNT(*) AS value
    FROM sessions
    WHERE started_at >= ?
  `);

  const countSessionsCompleted = database.prepare(`
    SELECT COUNT(*) AS value
    FROM sessions
    WHERE ended_at IS NOT NULL
      AND ended_at >= ?
  `);

  const countUniqueDevices = database.prepare(`
    SELECT COUNT(DISTINCT device_id) AS value
    FROM sessions
    WHERE started_at >= ?
  `);

  const countUniqueLocations = database.prepare(`
    SELECT COUNT(DISTINCT COALESCE(city, region, country_code, country)) AS value
    FROM sessions
    WHERE started_at >= ?
      AND COALESCE(city, region, country_code, country) IS NOT NULL
  `);

  const averageDurationSeconds = database.prepare(`
    SELECT AVG((COALESCE(ended_at, ?) - started_at) / 1000.0) AS value
    FROM sessions
    WHERE started_at >= ?
      AND playback_ready_at IS NOT NULL
  `);

  const countErrorsInRange = database.prepare(`
    SELECT COUNT(*) AS value
    FROM events
    WHERE event_type = 'playback_error'
      AND server_timestamp >= ?
  `);

  const breakdownByPlatform = database.prepare(`
    SELECT
      platform,
      COUNT(*) AS sessions_started,
      SUM(CASE WHEN playback_ready_at IS NOT NULL THEN 1 ELSE 0 END) AS played_sessions,
      SUM(
        CASE
          WHEN playback_ready_at IS NOT NULL
            AND ended_at IS NULL
            AND last_seen_at >= ?
          THEN 1
          ELSE 0
        END
      ) AS active_now
    FROM sessions
    WHERE started_at >= ?
    GROUP BY platform
    ORDER BY active_now DESC, sessions_started DESC, platform ASC
  `);

  const breakdownByStream = database.prepare(`
    SELECT
      stream_type,
      COUNT(*) AS sessions_started,
      SUM(CASE WHEN playback_ready_at IS NOT NULL THEN 1 ELSE 0 END) AS played_sessions,
      SUM(
        CASE
          WHEN playback_ready_at IS NOT NULL
            AND ended_at IS NULL
            AND last_seen_at >= ?
          THEN 1
          ELSE 0
        END
      ) AS active_now
    FROM sessions
    WHERE started_at >= ?
    GROUP BY stream_type
    ORDER BY active_now DESC, sessions_started DESC, stream_type ASC
  `);

  const breakdownByLocation = database.prepare(`
    SELECT
      city,
      region,
      country_code,
      country,
      COUNT(*) AS sessions_started,
      SUM(CASE WHEN playback_ready_at IS NOT NULL THEN 1 ELSE 0 END) AS played_sessions,
      SUM(
        CASE
          WHEN playback_ready_at IS NOT NULL
            AND ended_at IS NULL
            AND last_seen_at >= ?
          THEN 1
          ELSE 0
        END
      ) AS active_now
    FROM sessions
    WHERE started_at >= ?
      AND COALESCE(city, region, country_code, country) IS NOT NULL
    GROUP BY city, region, country_code, country
    ORDER BY active_now DESC, sessions_started DESC, city ASC, region ASC, country_code ASC, country ASC
    LIMIT ?
  `);

  const sessionsInTimeWindow = database.prepare(`
    SELECT COUNT(*) AS value
    FROM sessions
    WHERE started_at >= ?
      AND started_at < ?
  `);

  const errorsInTimeWindow = database.prepare(`
    SELECT COUNT(*) AS value
    FROM events
    WHERE event_type = 'playback_error'
      AND server_timestamp >= ?
      AND server_timestamp < ?
  `);

  const activeAtTimeWindow = database.prepare(`
    SELECT COUNT(*) AS value
    FROM sessions
    WHERE playback_ready_at IS NOT NULL
      AND playback_ready_at <= ?
      AND (ended_at IS NULL OR ended_at > ?)
      AND last_seen_at >= ?
  `);

  const recentSessions = database.prepare(`
    SELECT
      session_id,
      device_id,
      platform,
      app_version,
      stream_type,
      status,
      started_at,
      playback_ready_at,
      ended_at,
      last_seen_at,
      updated_at,
      last_event_type,
      last_error,
      network_type,
      country_code,
      country,
      region,
      city,
      heartbeat_count
    FROM sessions
    ORDER BY last_seen_at DESC
    LIMIT ?
  `);

  const topErrors = database.prepare(`
    SELECT
      COALESCE(error_message, error_code, 'Error sin detalle') AS label,
      COUNT(*) AS count,
      MAX(server_timestamp) AS last_seen_at
    FROM events
    WHERE event_type = 'playback_error'
      AND server_timestamp >= ?
    GROUP BY label
    ORDER BY count DESC, last_seen_at DESC, label ASC
    LIMIT ?
  `);

  const latestEvents = database.prepare(`
    SELECT
      event_id,
      session_id,
      platform,
      stream_type,
      event_type,
      playback_state,
      error_code,
      error_message,
      network_type,
      country_code,
      country,
      region,
      city,
      server_timestamp
    FROM events
    ORDER BY server_timestamp DESC
    LIMIT ?
  `);

  const latestSessionTouch = database.prepare(`
    SELECT MAX(last_seen_at) AS value
    FROM sessions
  `);

  function upsertSessionForEvent(event) {
    const previous = selectSession.get(event.sessionId);
    const nextHeartbeatCount = (previous ? previous.heartbeat_count : 0) + (event.eventType === 'heartbeat' ? 1 : 0);
    const nextStatus = deriveSessionStatus(previous, event);
    const nextStartedAt = previous ? previous.started_at : event.clientTimestamp;
    const nextReadyAt = event.eventType === 'playback_ready'
      ? previous && previous.playback_ready_at != null
        ? Math.min(previous.playback_ready_at, event.clientTimestamp)
        : event.clientTimestamp
      : previous
        ? previous.playback_ready_at
        : null;
    const nextEndedAt = event.eventType === 'session_ended'
      ? event.clientTimestamp
      : previous
        ? previous.ended_at
        : null;
    const nextLastError = event.eventType === 'playback_error'
      ? event.errorMessage || event.errorCode || 'Error de reproduccion'
      : previous
        ? previous.last_error
        : null;

    if (!previous) {
      insertSession.run(
        event.sessionId,
        event.deviceId,
        event.platform,
        event.appVersion,
        event.streamType,
        nextStatus,
        nextStartedAt,
        nextReadyAt,
        nextEndedAt,
        event.serverTimestamp,
        event.serverTimestamp,
        event.eventType,
        nextLastError,
        event.networkType,
        event.ipHash,
        event.userAgent,
        event.countryCode,
        event.country,
        event.region,
        event.city,
        nextHeartbeatCount
      );
      return;
    }

    updateSession.run(
      event.deviceId,
      event.platform,
      event.appVersion || previous.app_version,
      event.streamType || previous.stream_type,
      nextStatus,
      nextStartedAt,
      nextReadyAt,
      nextEndedAt,
      event.serverTimestamp,
      event.serverTimestamp,
      event.eventType,
      nextLastError,
      event.networkType || previous.network_type,
      previous.ip_hash || event.ipHash,
      previous.user_agent || event.userAgent,
      previous.country_code || event.countryCode,
      previous.country || event.country,
      previous.region || event.region,
      previous.city || event.city,
      nextHeartbeatCount,
      event.sessionId
    );
  }

  function ingestPayload(payload, requestContext = {}) {
    const rawEvents = extractPayloadEvents(payload);
    const acceptedSessions = new Set();
    const issues = [];
    let accepted = 0;
    let duplicates = 0;

    if (!rawEvents.length) {
      return {
        received: 0,
        accepted: 0,
        duplicates: 0,
        rejected: 0,
        issues: ['No llegaron eventos validos'],
      };
    }

    database.exec('BEGIN IMMEDIATE');

    try {
      for (const rawEvent of rawEvents) {
        let event;
        try {
          event = normalizeIncomingEvent(rawEvent, {
            ipHash: hashRemoteAddress(requestContext.remoteAddress, ipHashSalt),
            userAgent: requestContext.userAgent,
          });
        } catch (error) {
          issues.push(error.message);
          continue;
        }

        try {
          insertEvent.run(
            event.eventId,
            event.sessionId,
            event.deviceId,
            event.platform,
            event.appVersion,
            event.streamType,
            event.eventType,
            event.playbackState,
            event.errorCode,
            event.errorMessage,
            event.networkType,
          event.clientTimestamp,
          event.serverTimestamp,
          event.ipHash,
          event.userAgent,
          event.countryCode,
          event.country,
          event.region,
          event.city,
          event.detailsJson
        );
        } catch (error) {
          if (String(error.message).includes('UNIQUE constraint failed: events.event_id')) {
            duplicates += 1;
            continue;
          }

          throw error;
        }

        upsertSessionForEvent(event);
        accepted += 1;
        acceptedSessions.add(event.sessionId);
      }

      database.exec('COMMIT');
    } catch (error) {
      database.exec('ROLLBACK');
      throw error;
    }

    return {
      received: rawEvents.length,
      accepted,
      duplicates,
      rejected: issues.length,
      issues,
      sessionsTouched: Array.from(acceptedSessions),
    };
  }

  function buildConcurrencySeries(startMs, endMs, bucketMs) {
    const buckets = [];

    for (let bucketStart = startMs; bucketStart <= endMs; bucketStart += bucketMs) {
      const bucketEnd = Math.min(bucketStart + bucketMs, endMs);
      const connected = activeAtTimeWindow.get(bucketEnd, bucketStart, bucketStart - activeWindowMs).value;
      const starts = sessionsInTimeWindow.get(bucketStart, bucketEnd).value;
      const errors = errorsInTimeWindow.get(bucketStart, bucketEnd).value;

      buckets.push({
        bucketStart,
        bucketEnd,
        connected,
        starts,
        errors,
      });
    }

    return buckets;
  }

  function getDashboardSnapshot(options = {}) {
    const now = Date.now();
    const rangePreset = resolveRangePreset(options.range);
    const bucketPreset = resolveBucketPreset(options.bucket, rangePreset);
    const rangeStart = now - rangePreset.ms;
    const activeThreshold = now - activeWindowMs;
    const concurrency = buildConcurrencySeries(rangeStart, now, bucketPreset.ms);

    const recentSessionRows = recentSessions.all(MAX_RECENT_SESSIONS);
    const latestEventRows = latestEvents.all(MAX_RECENT_EVENTS);
    const lastSeen = latestSessionTouch.get().value;

    return {
      generatedAt: now,
      freshness: {
        activeWindowMs,
        latestSessionTouchAt: lastSeen || null,
      },
      range: {
        key: rangePreset.key,
        label: rangePreset.label,
        startMs: rangeStart,
        endMs: now,
        bucket: bucketPreset,
      },
      summary: {
        connectedNow: countConnectedNow.get(activeThreshold).value,
        connectingNow: countConnectingNow.get(activeThreshold).value,
        sessionsStarted: countSessionsStarted.get(rangeStart).value,
        sessionsCompleted: countSessionsCompleted.get(rangeStart).value,
        uniqueDevices: countUniqueDevices.get(rangeStart).value,
        uniqueLocations: countUniqueLocations.get(rangeStart).value,
        avgSessionMinutes: Number((averageDurationSeconds.get(now, rangeStart).value || 0) / 60).toFixed(1),
        errorEvents: countErrorsInRange.get(rangeStart).value,
        peakConcurrent: concurrency.reduce((peak, point) => Math.max(peak, point.connected), 0),
      },
      breakdowns: {
        platforms: breakdownByPlatform.all(activeThreshold, rangeStart).map((row) => ({
          platform: row.platform,
          sessionsStarted: row.sessions_started,
          playedSessions: row.played_sessions,
          activeNow: row.active_now,
        })),
        streams: breakdownByStream.all(activeThreshold, rangeStart).map((row) => ({
          streamType: row.stream_type,
          sessionsStarted: row.sessions_started,
          playedSessions: row.played_sessions,
          activeNow: row.active_now,
        })),
        locations: breakdownByLocation.all(activeThreshold, rangeStart, MAX_TOP_LOCATIONS).map((row) => ({
          locationLabel: createLocationLabel(row.country_code, row.country, row.region, row.city) || 'Sin dato',
          sessionsStarted: row.sessions_started,
          playedSessions: row.played_sessions,
          activeNow: row.active_now,
        })),
      },
      charts: {
        concurrency,
      },
      recentSessions: recentSessionRows.map((row) => mapRecentSession(row, now)),
      recentEvents: latestEventRows.map(mapRecentEvent),
      topErrors: topErrors.all(rangeStart, MAX_TOP_ERRORS).map((row) => ({
        label: row.label,
        count: row.count,
        lastSeenAt: row.last_seen_at,
      })),
    };
  }

  return {
    ingestPayload,
    getDashboardSnapshot,
  };
}

module.exports = {
  ACTIVE_WINDOW_MS,
  BUCKET_PRESETS,
  DEFAULT_BUCKET,
  DEFAULT_RANGE,
  RANGE_PRESETS,
  createAnalyticsStore,
  openAnalyticsDatabase,
  resolveBucketPreset,
  resolveRangePreset,
};
