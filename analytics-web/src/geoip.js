'use strict';

const fs = require('node:fs');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');

const execFileAsync = promisify(execFile);
const DEFAULT_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function normalizeIp(rawValue) {
  if (typeof rawValue !== 'string') {
    return null;
  }

  const trimmed = rawValue.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith('::ffff:')) {
    return trimmed.slice('::ffff:'.length);
  }

  return trimmed;
}

function isPrivateIpv4(ip) {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return false;
  }

  if (parts[0] === 10 || parts[0] === 127) {
    return true;
  }

  if (parts[0] === 169 && parts[1] === 254) {
    return true;
  }

  if (parts[0] === 192 && parts[1] === 168) {
    return true;
  }

  return parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31;
}

function isPrivateIp(ip) {
  if (!ip) {
    return true;
  }

  if (ip.includes('.')) {
    return isPrivateIpv4(ip);
  }

  const normalized = ip.toLowerCase();
  return normalized === '::1' || normalized.startsWith('fc') || normalized.startsWith('fd') || normalized.startsWith('fe80:');
}

function parseScalarValue(rawOutput) {
  const output = String(rawOutput || '').trim();
  if (!output || output.includes('not found')) {
    return null;
  }

  const stringMatch = /"([^"]+)"\s*<[^>]+>/.exec(output);
  if (stringMatch) {
    return stringMatch[1].trim() || null;
  }

  const scalarMatch = /^([A-Za-z0-9._:-]+)\s*<[^>]+>$/.exec(output);
  if (scalarMatch) {
    return scalarMatch[1].trim() || null;
  }

  return null;
}

function normalizeLabel(value, maxLength = 120) {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return null;
  }

  return normalized.slice(0, maxLength);
}

function buildLocationLabel(geo) {
  const parts = [];

  if (geo.city) {
    parts.push(geo.city);
  }

  if (geo.region && geo.region !== geo.city) {
    parts.push(geo.region);
  }

  if (geo.countryCode) {
    parts.push(geo.countryCode);
  } else if (geo.country && geo.country !== geo.region) {
    parts.push(geo.country);
  }

  return parts.join(', ') || null;
}

async function runMmdbLookup(databasePath, ip, pathSegments) {
  try {
    const { stdout } = await execFileAsync('mmdblookup', [
      '--file',
      databasePath,
      '--ip',
      ip,
      ...pathSegments,
    ], {
      timeout: 2500,
    });

    return parseScalarValue(stdout);
  } catch (error) {
    const combinedOutput = `${error.stdout || ''}\n${error.stderr || ''}\n${error.message || ''}`.toLowerCase();
    if (
      combinedOutput.includes('lookup path does not match the data') ||
      combinedOutput.includes("key that doesn't exist") ||
      combinedOutput.includes('array index bigger than the array') ||
      combinedOutput.includes('not found')
    ) {
      return null;
    }

    throw error;
  }
}

function createGeoResolver(options = {}) {
  const databasePath = options.databasePath || process.env.GEOIP_CITY_DB_PATH || '';
  const language = options.language || process.env.GEOIP_LANGUAGE || 'es';
  const fallbackLanguage = options.fallbackLanguage || 'en';
  const cacheTtlMs = Number(options.cacheTtlMs || process.env.GEOIP_CACHE_TTL_MS || DEFAULT_CACHE_TTL_MS);
  const logger = options.logger || console;
  const cache = new Map();
  let warnedUnavailable = false;

  async function lookup(ip) {
    const normalizedIp = normalizeIp(ip);
    if (!normalizedIp || isPrivateIp(normalizedIp)) {
      return null;
    }

    if (!databasePath) {
      return null;
    }

    const cached = cache.get(normalizedIp);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.value;
    }

    if (!fs.existsSync(databasePath)) {
      if (!warnedUnavailable) {
        logger.warn(`[geoip] Base GeoIP no encontrada en ${databasePath}`);
        warnedUnavailable = true;
      }
      return null;
    }

    try {
      const countryCode = normalizeLabel(await runMmdbLookup(databasePath, normalizedIp, ['country', 'iso_code']), 8);
      let country = normalizeLabel(await runMmdbLookup(databasePath, normalizedIp, ['country', 'names', language]));
      let region = normalizeLabel(await runMmdbLookup(databasePath, normalizedIp, ['subdivisions', '0', 'names', language]));
      let city = normalizeLabel(await runMmdbLookup(databasePath, normalizedIp, ['city', 'names', language]));

      if (!country && language !== fallbackLanguage) {
        country = normalizeLabel(await runMmdbLookup(databasePath, normalizedIp, ['country', 'names', fallbackLanguage]));
      }

      if (!region && language !== fallbackLanguage) {
        region = normalizeLabel(await runMmdbLookup(databasePath, normalizedIp, ['subdivisions', '0', 'names', fallbackLanguage]));
      }

      if (!city && language !== fallbackLanguage) {
        city = normalizeLabel(await runMmdbLookup(databasePath, normalizedIp, ['city', 'names', fallbackLanguage]));
      }

      const geo = {
        countryCode: countryCode ? countryCode.toUpperCase() : null,
        country,
        region,
        city,
      };

      if (!geo.country && !geo.region && !geo.city) {
        cache.set(normalizedIp, {
          expiresAt: Date.now() + cacheTtlMs,
          value: null,
        });
        return null;
      }

      geo.locationLabel = buildLocationLabel(geo);
      cache.set(normalizedIp, {
        expiresAt: Date.now() + cacheTtlMs,
        value: geo,
      });
      return geo;
    } catch (error) {
      if (!warnedUnavailable) {
        logger.warn(`[geoip] No se pudo resolver ciudad con mmdblookup: ${error.message}`);
        warnedUnavailable = true;
      }
      return null;
    }
  }

  return {
    lookup,
  };
}

module.exports = {
  buildLocationLabel,
  createGeoResolver,
  normalizeIp,
};
