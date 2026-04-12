'use strict';

const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { createGeoResolver } = require('./geoip');
const { createAnalyticsStore, openAnalyticsDatabase } = require('./store');

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

loadEnvFile(path.join(ROOT_DIR, '.env'));
loadEnvFile(path.join(ROOT_DIR, '.env.local'));

const DEFAULT_PORT = Number(process.env.PORT || 8787);
const DATABASE_PATH = resolveConfigPath(
  process.env.ANALYTICS_DB_PATH,
  path.join(ROOT_DIR, 'data', 'analytics.sqlite')
);
const ADMIN_USERNAME = process.env.ANALYTICS_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ANALYTICS_ADMIN_PASSWORD || 'change-me';
const INGEST_KEY = process.env.ANALYTICS_INGEST_KEY || '';
const IP_HASH_SALT = process.env.ANALYTICS_IP_HASH_SALT || 'lavozsalsa-analytics';
const GEOIP_CITY_DB_PATH = resolveConfigPath(process.env.GEOIP_CITY_DB_PATH, '');

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.otf': 'font/otf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

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

function resolveConfigPath(rawPath, fallbackAbsolutePath) {
  if (!rawPath || !rawPath.trim()) {
    return fallbackAbsolutePath;
  }

  const trimmed = rawPath.trim();
  if (path.isAbsolute(trimmed)) {
    return trimmed;
  }

  return path.resolve(ROOT_DIR, trimmed);
}

function getClientRemoteAddress(request) {
  const forwardedFor = request.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  return request.socket.remoteAddress;
}

function attachGeoToEvent(rawEvent, geo) {
  if (!rawEvent || typeof rawEvent !== 'object') {
    return rawEvent;
  }

  const baseDetails = rawEvent.details && typeof rawEvent.details === 'object' && !Array.isArray(rawEvent.details)
    ? { ...rawEvent.details }
    : rawEvent.details == null
      ? {}
      : { note: String(rawEvent.details).slice(0, 500) };

  if (baseDetails.geo) {
    return rawEvent;
  }

  return {
    ...rawEvent,
    details: {
      ...baseDetails,
      geo,
    },
  };
}

async function enrichPayloadWithGeo(payload, remoteAddress, geoResolver) {
  if (!geoResolver) {
    return payload;
  }

  const geo = await geoResolver.lookup(remoteAddress);
  if (!geo) {
    return payload;
  }

  if (Array.isArray(payload)) {
    return payload.map((event) => attachGeoToEvent(event, geo));
  }

  if (payload && Array.isArray(payload.events)) {
    return {
      ...payload,
      events: payload.events.map((event) => attachGeoToEvent(event, geo)),
    };
  }

  if (payload && typeof payload === 'object') {
    return attachGeoToEvent(payload, geo);
  }

  return payload;
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk.toString('utf8');
      if (body.length > 2_000_000) {
        reject(new Error('Payload demasiado grande'));
        request.destroy();
      }
    });

    request.on('end', () => {
      if (!body.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('JSON invalido'));
      }
    });

    request.on('error', reject);
  });
}

function sendJson(response, statusCode, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'application/json; charset=utf-8',
    ...extraHeaders,
  });
  response.end(body);
}

function sendText(response, statusCode, payload, extraHeaders = {}) {
  response.writeHead(statusCode, {
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(payload),
    'Content-Type': 'text/plain; charset=utf-8',
    ...extraHeaders,
  });
  response.end(payload);
}

function parseBasicAuthHeader(headerValue) {
  if (!headerValue || !headerValue.startsWith('Basic ')) {
    return null;
  }

  const encoded = headerValue.slice('Basic '.length);
  const decoded = Buffer.from(encoded, 'base64').toString('utf8');
  const separatorIndex = decoded.indexOf(':');
  if (separatorIndex < 0) {
    return null;
  }

  return {
    username: decoded.slice(0, separatorIndex),
    password: decoded.slice(separatorIndex + 1),
  };
}

function isAdminAuthorized(request) {
  const credentials = parseBasicAuthHeader(request.headers.authorization);
  return Boolean(
    credentials &&
      credentials.username === ADMIN_USERNAME &&
      credentials.password === ADMIN_PASSWORD
  );
}

function requireAdminAuth(response) {
  response.writeHead(401, {
    'Cache-Control': 'no-store',
    'WWW-Authenticate': 'Basic realm="La Voz Salsa Analytics"',
  });
  response.end('Autenticacion requerida');
}

function isIngestAuthorized(request) {
  if (!INGEST_KEY) {
    return true;
  }

  const directKey = request.headers['x-ingest-key'];
  if (directKey && directKey === INGEST_KEY) {
    return true;
  }

  const authorization = request.headers.authorization || '';
  if (authorization.startsWith('Bearer ')) {
    return authorization.slice('Bearer '.length) === INGEST_KEY;
  }

  return false;
}

function applyCorsHeaders(response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Ingest-Key');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
}

function sanitizeStaticPath(requestPath) {
  const safePath = requestPath === '/' ? '/index.html' : requestPath;
  const resolvedPath = path.normalize(safePath).replace(/^(\.\.[/\\])+/, '');
  return path.join(PUBLIC_DIR, resolvedPath);
}

function serveStaticFile(requestPath, response) {
  const filePath = sanitizeStaticPath(requestPath);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    sendText(response, 403, 'Ruta no permitida');
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    sendText(response, 404, 'No encontrado');
    return;
  }

  const extension = path.extname(filePath);
  const mimeType = MIME_TYPES[extension] || 'application/octet-stream';
  const body = fs.readFileSync(filePath);

  response.writeHead(200, {
    'Cache-Control': extension === '.html' ? 'no-store' : 'public, max-age=60',
    'Content-Length': body.byteLength,
    'Content-Type': mimeType,
  });
  response.end(body);
}

function createServer(options = {}) {
  const database = options.database || openAnalyticsDatabase(DATABASE_PATH);
  const store = options.store || createAnalyticsStore(database, { ipHashSalt: IP_HASH_SALT });
  const geoResolver = options.geoResolver || createGeoResolver({
    databasePath: GEOIP_CITY_DB_PATH,
    logger: console,
  });

  return http.createServer(async (request, response) => {
    const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    if (request.method === 'OPTIONS') {
      applyCorsHeaders(response);
      response.writeHead(204);
      response.end();
      return;
    }

    if (pathname === '/api/v1/health' && request.method === 'GET') {
      sendJson(response, 200, {
        status: 'ok',
        databasePath: DATABASE_PATH,
        ingestProtected: Boolean(INGEST_KEY),
        generatedAt: Date.now(),
      });
      return;
    }

    if (pathname === '/api/v1/events' && request.method === 'POST') {
      applyCorsHeaders(response);

      if (!isIngestAuthorized(request)) {
        sendJson(response, 401, { error: 'No autorizado para ingesta' });
        return;
      }

      try {
        const remoteAddress = getClientRemoteAddress(request);
        const payload = await readJsonBody(request);
        const enrichedPayload = await enrichPayloadWithGeo(payload, remoteAddress, geoResolver);
        const result = store.ingestPayload(enrichedPayload, {
          remoteAddress,
          userAgent: request.headers['user-agent'],
        });
        sendJson(response, 202, result);
      } catch (error) {
        sendJson(response, 400, { error: error.message || 'No se pudo procesar la solicitud' });
      }
      return;
    }

    const isReadRequest = request.method === 'GET' || request.method === 'HEAD';
    const wantsDashboardSnapshot = pathname === '/api/v1/dashboard/snapshot' && request.method === 'GET';
    const wantsStatic =
      isReadRequest &&
      (
        pathname === '/' ||
        pathname.startsWith('/app.js') ||
        pathname.startsWith('/style.css') ||
        pathname.startsWith('/assets/')
      );

    if (wantsDashboardSnapshot || wantsStatic) {
      if (!isAdminAuthorized(request)) {
        requireAdminAuth(response);
        return;
      }
    }

    if (wantsDashboardSnapshot) {
      try {
        const snapshot = store.getDashboardSnapshot({
          range: url.searchParams.get('range') || undefined,
          bucket: url.searchParams.get('bucket') || undefined,
        });
        sendJson(response, 200, snapshot);
      } catch (error) {
        sendJson(response, 500, { error: error.message || 'No se pudo construir el dashboard' });
      }
      return;
    }

    if (wantsStatic) {
      serveStaticFile(pathname, response);
      return;
    }

    sendJson(response, 404, { error: 'Ruta no encontrada' });
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(DEFAULT_PORT, () => {
    console.log(`La Voz Salsa Analytics escuchando en http://0.0.0.0:${DEFAULT_PORT}`);
    console.log(`Dashboard protegido con usuario "${ADMIN_USERNAME}"`);
  });
}

module.exports = {
  createServer,
};
