'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { DatabaseSync } = require('node:sqlite');
const { createAnalyticsStore } = require('../src/store');

function createInMemoryStore() {
  const database = new DatabaseSync(':memory:');
  database.exec(`
    CREATE TABLE events (
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
    CREATE TABLE sessions (
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
  `);
  return createAnalyticsStore(database);
}

test('ingesta y resumen basico de una sesion', () => {
  const store = createInMemoryStore();
  const base = Date.now() - 5_000;

  const result = store.ingestPayload([
    {
      eventId: 'ev-1',
      sessionId: 'session-1',
      deviceId: 'device-1',
      platform: 'android_tv',
      appVersion: '1.0.0',
      streamType: 'live',
      eventType: 'session_started',
      playbackState: 'starting',
      clientTimestamp: base,
      networkType: 'wifi',
    },
    {
      eventId: 'ev-2',
      sessionId: 'session-1',
      deviceId: 'device-1',
      platform: 'android_tv',
      appVersion: '1.0.0',
      streamType: 'live',
      eventType: 'playback_ready',
      playbackState: 'playing',
      clientTimestamp: base + 500,
      networkType: 'wifi',
    },
    {
      eventId: 'ev-3',
      sessionId: 'session-1',
      deviceId: 'device-1',
      platform: 'android_tv',
      appVersion: '1.0.0',
      streamType: 'live',
      eventType: 'heartbeat',
      playbackState: 'playing',
      clientTimestamp: base + 2_000,
      networkType: 'wifi',
    },
  ]);

  assert.equal(result.accepted, 3);
  assert.equal(result.duplicates, 0);

  const snapshot = store.getDashboardSnapshot({ range: '1h', bucket: '1m' });
  assert.equal(snapshot.summary.connectedNow, 1);
  assert.equal(snapshot.summary.sessionsStarted, 1);
  assert.equal(snapshot.summary.uniqueDevices, 1);
  assert.equal(snapshot.summary.uniqueLocations, 0);
  assert.equal(snapshot.breakdowns.platforms[0].platform, 'android_tv');
  assert.equal(snapshot.recentSessions[0].status, 'playing');
  assert.equal(snapshot.recentSessions[0].heartbeatCount, 1);
});

test('eventos duplicados no se cuentan dos veces', () => {
  const store = createInMemoryStore();
  const event = {
    eventId: 'duplicate-event',
    sessionId: 'session-dup',
    deviceId: 'device-dup',
    platform: 'tizen_tv',
    appVersion: '1.0.0',
    streamType: 'fallback',
    eventType: 'session_started',
    playbackState: 'starting',
    clientTimestamp: Date.now(),
    networkType: 'ethernet',
  };

  const first = store.ingestPayload(event);
  const second = store.ingestPayload(event);

  assert.equal(first.accepted, 1);
  assert.equal(second.accepted, 0);
  assert.equal(second.duplicates, 1);
});

test('guarda ciudad y la expone en sesiones y top ubicaciones', () => {
  const store = createInMemoryStore();
  const base = Date.now() - 10_000;

  const result = store.ingestPayload({
    eventId: 'geo-1',
    sessionId: 'session-geo',
    deviceId: 'device-geo',
    platform: 'server_hls',
    appVersion: 'edge-log-observer',
    streamType: 'live',
    eventType: 'session_started',
    playbackState: 'starting',
    clientTimestamp: base,
    networkType: 'edge',
    details: {
      geo: {
        countryCode: 'CO',
        country: 'Colombia',
        region: 'Bogota D.C.',
        city: 'Bogota',
      },
    },
  });

  assert.equal(result.accepted, 1);

  const snapshot = store.getDashboardSnapshot({ range: '1h', bucket: '1m' });
  assert.equal(snapshot.summary.uniqueLocations, 1);
  assert.equal(snapshot.breakdowns.locations[0].locationLabel, 'Bogota, Bogota D.C., CO');
  assert.equal(snapshot.recentSessions[0].city, 'Bogota');
  assert.equal(snapshot.recentSessions[0].locationLabel, 'Bogota, Bogota D.C., CO');
});
