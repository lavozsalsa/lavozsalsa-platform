'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const http = require('node:http');
const https = require('node:https');
const { createGeoResolver } = require('./geoip');

const ROOT_DIR = path.resolve(__dirname, '..');

loadEnvFile(path.join(ROOT_DIR, '.env'));
loadEnvFile(path.join(ROOT_DIR, '.env.local'));

const ANALYTICS_BASE_URL = String(
  process.env.ANALYTICS_COLLECTOR_BASE_URL ||
  process.env.ANALYTICS_BASE_URL ||
  'http://127.0.0.1:8787'
).replace(/\/+$/, '');
const ANALYTICS_INGEST_KEY = process.env.ANALYTICS_INGEST_KEY || '';
const HLS_ACCESS_LOG_PATH = process.env.HLS_ACCESS_LOG_PATH || '/var/log/nginx/access.log';
const HLS_SCAN_INTERVAL_MS = Number(process.env.HLS_SCAN_INTERVAL_MS || 2000);
const HLS_IDLE_TIMEOUT_MS = Number(process.env.HLS_IDLE_TIMEOUT_MS || 120000);
const HEARTBEAT_INTERVAL_MS = Number(process.env.HLS_HEARTBEAT_INTERVAL_MS || 60000);
const GEOIP_CITY_DB_PATH = process.env.GEOIP_CITY_DB_PATH || '';
const STREAM_RULES = [
  { streamType: 'live', marker: '/live-abr/' },
  { streamType: 'fallback', marker: '/fallback-abr/' },
];

const sessions = new Map();
const geoResolver = createGeoResolver({
  databasePath: GEOIP_CITY_DB_PATH,
  logger: console,
});
let fileOffset = 0;
let carryover = '';
let shuttingDown = false;

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex <= 0) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    if (!key || Object.prototype.hasOwnProperty.call(process.env, key)) {
      continue;
    }

    process.env[key] = rawValue
      .replace(/^"(.*)"$/, '$1')
      .replace(/^'(.*)'$/, '$1');
  }
}

function sha256(value, take = 24) {
  return crypto.createHash('sha256').update(value).digest('hex').slice(0, take);
}

function createUuid() {
  return crypto.randomUUID();
}

function parseTimeLocal(timeLocal) {
  const match = /^(\d{2})\/([A-Za-z]{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2}) ([+-]\d{4})$/.exec(timeLocal);
  if (!match) {
    return Date.now();
  }

  const [, day, monthName, year, hour, minute, second, offset] = match;
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  const month = months[monthName] || '01';
  const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}${offset.slice(0, 3)}:${offset.slice(3)}`;
  const parsed = Date.parse(iso);
  return Number.isFinite(parsed) ? parsed : Date.now();
}

function parseAccessLogLine(line) {
  const match = /^(?<ip>\S+) \S+ \S+ \[(?<timeLocal>[^\]]+)\] "(?<method>\S+) (?<path>\S+) (?<protocol>[^"]*)" (?<status>\d{3}) (?<bytes>\S+) "(?<referer>[^"]*)" "(?<userAgent>[^"]*)"/.exec(line);
  if (!match || !match.groups) {
    return null;
  }

  const requestPath = match.groups.path;
  const streamRule = STREAM_RULES.find((rule) => requestPath.includes(rule.marker));
  if (!streamRule) {
    return null;
  }

  const status = Number(match.groups.status);
  if (status < 200 || status >= 400) {
    return null;
  }

  return {
    clientIp: match.groups.ip,
    method: match.groups.method,
    path: requestPath,
    status,
    referer: match.groups.referer,
    userAgent: match.groups.userAgent,
    timestamp: parseTimeLocal(match.groups.timeLocal),
    streamType: streamRule.streamType,
  };
}

function createEvent(session, eventType, timestamp, details = {}, playbackState) {
  return {
    eventId: createUuid(),
    sessionId: session.sessionId,
    deviceId: session.deviceId,
    platform: 'server_hls',
    appVersion: 'edge-log-observer',
    streamType: session.streamType,
    eventType,
    playbackState: playbackState || session.playbackState,
    clientTimestamp: timestamp,
    networkType: 'edge',
    details,
  };
}

function postEvents(events) {
  if (!events.length) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const target = new URL(`${ANALYTICS_BASE_URL}/api/v1/events`);
    const body = JSON.stringify({ events });
    const transport = target.protocol === 'https:' ? https : http;

    const request = transport.request({
      protocol: target.protocol,
      hostname: target.hostname,
      port: target.port || (target.protocol === 'https:' ? 443 : 80),
      path: `${target.pathname}${target.search}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
        ...(ANALYTICS_INGEST_KEY ? { 'X-Ingest-Key': ANALYTICS_INGEST_KEY } : {}),
      },
    }, (response) => {
      response.resume();
      response.on('end', resolve);
    });

    request.on('error', (error) => {
      console.error('[hls-forwarder] No se pudieron enviar eventos:', error.message);
      resolve();
    });

    request.end(body);
  });
}

async function handleParsedRequest(entry) {
  const sessionKey = sha256(`${entry.clientIp}|${entry.userAgent}|${entry.streamType}`, 40);
  let session = sessions.get(sessionKey);
  const events = [];

  if (!session) {
    const geo = await geoResolver.lookup(entry.clientIp);
    session = {
      sessionId: createUuid(),
      deviceId: sha256(`${entry.clientIp}|${entry.userAgent}`, 32),
      streamType: entry.streamType,
      playbackState: 'playing',
      lastSeenAt: entry.timestamp,
      lastHeartbeatAt: entry.timestamp,
      geo: geo || null,
    };
    sessions.set(sessionKey, session);

    events.push(createEvent(session, 'session_started', entry.timestamp, {
      source: 'nginx_access_log',
      path: entry.path,
      status: entry.status,
      referer: entry.referer,
      userAgent: entry.userAgent,
      clientHash: sha256(entry.clientIp, 16),
      geo: session.geo,
    }, 'starting'));
    events.push(createEvent(session, 'playback_ready', entry.timestamp, {
      source: 'nginx_access_log',
      path: entry.path,
      status: entry.status,
      referer: entry.referer,
      userAgent: entry.userAgent,
      clientHash: sha256(entry.clientIp, 16),
      geo: session.geo,
    }, 'playing'));
  } else {
    session.lastSeenAt = entry.timestamp;
    session.playbackState = 'playing';
    if (entry.timestamp - session.lastHeartbeatAt >= HEARTBEAT_INTERVAL_MS) {
      session.lastHeartbeatAt = entry.timestamp;
      events.push(createEvent(session, 'heartbeat', entry.timestamp, {
        source: 'nginx_access_log',
        path: entry.path,
        status: entry.status,
        geo: session.geo,
      }, 'playing'));
    }
  }

  await postEvents(events);
}

async function processChunk(chunk) {
  const content = carryover + chunk;
  const lines = content.split(/\r?\n/);
  carryover = lines.pop() || '';

  for (const line of lines) {
    const parsed = parseAccessLogLine(line);
    if (parsed) {
      await handleParsedRequest(parsed);
    }
  }
}

async function pollLogFile() {
  if (shuttingDown) {
    return;
  }

  try {
    const stats = fs.statSync(HLS_ACCESS_LOG_PATH);
    if (stats.size < fileOffset) {
      fileOffset = 0;
      carryover = '';
    }

    if (stats.size > fileOffset) {
      const stream = fs.createReadStream(HLS_ACCESS_LOG_PATH, {
        encoding: 'utf8',
        start: fileOffset,
        end: stats.size - 1,
      });

      let chunk = '';
      for await (const piece of stream) {
        chunk += piece;
      }

      fileOffset = stats.size;
      await processChunk(chunk);
    }
  } catch (error) {
    console.error('[hls-forwarder] No se pudo leer el log HLS:', error.message);
  }
}

async function sweepInactiveSessions() {
  if (shuttingDown) {
    return;
  }

  const now = Date.now();
  const events = [];

  for (const [sessionKey, session] of sessions.entries()) {
    if (now - session.lastSeenAt <= HLS_IDLE_TIMEOUT_MS) {
      continue;
    }

    events.push(createEvent(session, 'session_ended', now, {
      source: 'nginx_access_log',
      reason: 'idle_timeout',
      geo: session.geo,
    }, session.playbackState));
    sessions.delete(sessionKey);
  }

  await postEvents(events);
}

async function shutdown(reason) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  const now = Date.now();
  const events = [];
  for (const session of sessions.values()) {
    events.push(createEvent(session, 'session_ended', now, {
      source: 'nginx_access_log',
      reason,
      geo: session.geo,
    }, session.playbackState));
  }
  await postEvents(events);
  process.exit(0);
}

console.log(`[hls-forwarder] Observando ${HLS_ACCESS_LOG_PATH}`);
console.log(`[hls-forwarder] Reportando a ${ANALYTICS_BASE_URL}/api/v1/events`);

setInterval(() => {
  pollLogFile().catch((error) => {
    console.error('[hls-forwarder] Error en pollLogFile:', error.message);
  });
}, HLS_SCAN_INTERVAL_MS);

setInterval(() => {
  sweepInactiveSessions().catch((error) => {
    console.error('[hls-forwarder] Error cerrando sesiones inactivas:', error.message);
  });
}, Math.min(HLS_SCAN_INTERVAL_MS * 2, 15_000));

pollLogFile().catch((error) => {
  console.error('[hls-forwarder] Error inicial:', error.message);
});

process.on('SIGINT', () => {
  shutdown('sigint').catch(() => process.exit(1));
});

process.on('SIGTERM', () => {
  shutdown('sigterm').catch(() => process.exit(1));
});
