# La Voz Salsa Analytics Web

Servicio autocontenido para:

- recibir eventos desde Android TV y Samsung Tizen
- guardar sesiones y eventos en SQLite
- exponer un dashboard web protegido
- calcular conectados en vivo, permanencia, picos, errores y ciudades aproximadas por IP

## Stack

- `Node 24+`
- `node:sqlite`
- dashboard estatico servido por el mismo proceso

No requiere dependencias de npm externas.

## Variables de entorno

Parte de `.env.example`:

- `PORT`
- `ANALYTICS_DB_PATH`
- `ANALYTICS_ADMIN_USERNAME`
- `ANALYTICS_ADMIN_PASSWORD`
- `ANALYTICS_INGEST_KEY`
- `ANALYTICS_IP_HASH_SALT`
- `GEOIP_CITY_DB_PATH`
- `GEOIP_LANGUAGE`
- `GEOIP_CACHE_TTL_MS`

El servidor ahora tambien carga automaticamente:

- `analytics-web/.env`
- `analytics-web/.env.local`

## Ejecutar local

```bash
cd analytics-web
node --no-warnings src/server.js
```

Dashboard:

- `http://localhost:8787/`

Healthcheck:

- `http://localhost:8787/api/v1/health`

## Ingesta de eventos

Endpoint:

- `POST /api/v1/events`

Cabeceras:

- `Content-Type: application/json`
- `X-Ingest-Key: <ANALYTICS_INGEST_KEY>`

Evento base:

```json
{
  "eventId": "uuid",
  "sessionId": "uuid",
  "deviceId": "anon-device-id",
  "platform": "android_tv",
  "appVersion": "1.0.0",
  "streamType": "live",
  "eventType": "heartbeat",
  "playbackState": "playing",
  "clientTimestamp": 1775510400000,
  "networkType": "wifi",
  "details": {
    "reason": "scheduled"
  }
}
```

Eventos recomendados:

- `session_started`
- `playback_buffering`
- `playback_ready`
- `heartbeat`
- `playback_error`
- `stream_switched`
- `session_ended`

## Configurar los clientes

### Android TV

El cliente Android toma la configuracion desde:

- [gradle.properties](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/gradle.properties)
- variables de entorno `LAVOZSALSA_ANALYTICS_ENDPOINT` y `LAVOZSALSA_ANALYTICS_INGEST_KEY`

Ejemplo:

```properties
lavozsalsa.analytics.endpoint=https://analytics.lavozsalsa.com
lavozsalsa.analytics.ingestKey=replace-with-a-long-random-key
```

### Samsung Tizen

El cliente Tizen toma la configuracion desde:

- [config.js](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/samsung-tv-tizen/js/config.js)

Ejemplo:

```js
window.LaVozSalsaConfig = {
    analyticsBaseUrl: 'https://analytics.lavozsalsa.com',
    analyticsIngestKey: 'replace-with-a-long-random-key',
    appVersion: '1.0.0'
};
```

## Despliegue en subdominio

Subdominio sugerido:

- `analytics.lavozsalsa.com`

Guia paso a paso para Webempresa + DigitalOcean:

- [README.digitalocean.md](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/analytics-web/deploy/README.digitalocean.md)

Si no tienes acceso al código de los clientes, también puedes poblar el panel rastreando directamente el tráfico HLS del servidor con el colector documentado ahí.

Nginx reverse proxy de ejemplo:

```nginx
server {
    listen 80;
    server_name analytics.lavozsalsa.com;

    location / {
        proxy_pass http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Produccion recomendada

1. Crear el subdominio `analytics.lavozsalsa.com`
2. Ejecutar el servicio con `systemd` o `pm2`
3. Guardar SQLite en un disco persistente
4. Activar HTTPS con Let's Encrypt
5. Rotar `ANALYTICS_ADMIN_PASSWORD`, `ANALYTICS_INGEST_KEY` y `ANALYTICS_IP_HASH_SALT`

## Geolocalizacion por ciudad

Para ver ciudad aproximada por conexion sin guardar la IP en claro, el servicio puede enriquecer eventos con una base local `GeoLite2-City.mmdb`.

Ejemplo:

```env
GEOIP_CITY_DB_PATH=/opt/lavozsalsa-analytics/shared/geoip/GeoLite2-City.mmdb
GEOIP_LANGUAGE=es
GEOIP_CACHE_TTL_MS=86400000
```

Notas:

- la ciudad es aproximada y depende de la IP publica del cliente
- las sesiones historicas anteriores no pueden rellenarse hacia atras si antes solo se guardo `ip_hash`
- la IP real no se persiste en SQLite; solo se guarda pais, region y ciudad

## Limitaciones actuales

- SQLite usa el modulo nativo experimental de Node 24
- la autenticacion del dashboard es `Basic Auth`
- la ciudad depende de la precision de la base GeoIP y puede variar por VPN, CGNAT o datos moviles
