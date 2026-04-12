# Despliegue en DigitalOcean y DNS en Webempresa

Asumido:

- subdominio final: `analytics.lavozsalsa.com`
- servidor: Ubuntu en DigitalOcean
- proceso Node directo con `systemd`
- Nginx como reverse proxy

## 1. Crear el DNS en Webempresa

En el panel DNS de Webempresa crea:

- tipo: `A`
- host: `analytics`
- valor: IP publica del droplet de DigitalOcean

TTL:

- `300` o el menor que te permita

## 2. Preparar el droplet

Paquetes recomendados:

```bash
sudo apt update
sudo apt install -y nginx nodejs npm
```

Crear usuario del servicio:

```bash
sudo adduser --system --group --home /opt/lavozsalsa-analytics lavozsalsa
```

## 3. Copiar la app al servidor

Estructura sugerida:

- `/opt/lavozsalsa-analytics/current`
- `/opt/lavozsalsa-analytics/shared/.env`
- `/opt/lavozsalsa-analytics/shared/data/analytics.sqlite`

Copiar el repo o solo `analytics-web` al path:

```bash
sudo mkdir -p /opt/lavozsalsa-analytics/current
sudo mkdir -p /opt/lavozsalsa-analytics/shared
sudo chown -R lavozsalsa:lavozsalsa /opt/lavozsalsa-analytics
```

## 4. Crear el archivo de entorno

Basate en:

- [env.production.example](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/analytics-web/deploy/.env.production.example)

Guárdalo como:

- `/opt/lavozsalsa-analytics/shared/.env`

Ejemplo:

```env
PORT=8787
ANALYTICS_DB_PATH=/opt/lavozsalsa-analytics/shared/data/analytics.sqlite
ANALYTICS_ADMIN_USERNAME="Mix Jhonsy"
ANALYTICS_ADMIN_PASSWORD="#Mixjhonsy2021"
ANALYTICS_INGEST_KEY=6e8c6d58bb11d148f022a7e21dbdf7cc99a2b1dd7d13e7e9
ANALYTICS_IP_HASH_SALT=bf24809fc67b397c18f98cb9baf3d6de7d8078130229a94d
GEOIP_CITY_DB_PATH=/opt/lavozsalsa-analytics/shared/geoip/GeoLite2-City.mmdb
GEOIP_LANGUAGE=es
GEOIP_CACHE_TTL_MS=86400000
```

## 5. Crear el servicio systemd

Usa:

- [lavozsalsa-analytics.service](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/analytics-web/deploy/lavozsalsa-analytics.service)

Copialo a:

- `/etc/systemd/system/lavozsalsa-analytics.service`

Luego:

```bash
sudo systemctl daemon-reload
sudo systemctl enable lavozsalsa-analytics
sudo systemctl start lavozsalsa-analytics
sudo systemctl status lavozsalsa-analytics
```

## 6. Configurar Nginx

Usa como base:

- [nginx.analytics.lavozsalsa.com.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/analytics-web/deploy/nginx.analytics.lavozsalsa.com.conf)

Copialo a:

- `/etc/nginx/sites-available/analytics.lavozsalsa.com`

Activar:

```bash
sudo ln -s /etc/nginx/sites-available/analytics.lavozsalsa.com /etc/nginx/sites-enabled/analytics.lavozsalsa.com
sudo nginx -t
sudo systemctl reload nginx
```

## 7. Activar HTTPS

Con Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d analytics.lavozsalsa.com
```

## 8. Probar desde fuera

Healthcheck:

```bash
curl https://analytics.lavozsalsa.com/api/v1/health
```

Dashboard:

- `https://analytics.lavozsalsa.com/`

## 9. Conectar los clientes

### Android TV

En [gradle.properties](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/gradle.properties) o variables de entorno:

```properties
lavozsalsa.analytics.endpoint=https://analytics.lavozsalsa.com
lavozsalsa.analytics.ingestKey=6e8c6d58bb11d148f022a7e21dbdf7cc99a2b1dd7d13e7e9
```

### Samsung Tizen

En [config.js](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/samsung-tv-tizen/js/config.js):

```js
window.LaVozSalsaConfig = {
    analyticsBaseUrl: 'https://analytics.lavozsalsa.com',
    analyticsIngestKey: '6e8c6d58bb11d148f022a7e21dbdf7cc99a2b1dd7d13e7e9',
    appVersion: '1.0.0'
};
```

## Recomendaciones

- No reutilices la misma clave admin para la llave de ingesta
- Cuando el servidor quede estable, cambia la contraseña admin por una mas larga
- Mantén el puerto `8787` cerrado al exterior y expón solo `80/443`
- Haz backup diario de `analytics.sqlite`

## 10. Rastrear HLS desde el servidor

Si no tienes acceso al código de la web o la app, este es el método recomendado.

El colector observa las peticiones del access log y rastrea estos prefijos:

- `/live-abr/`
- `/fallback-abr/`

Eso cubre mejor:

- `https://streaming.lavozsalsa.com/live-abr/master.m3u8`
- `https://streaming.lavozsalsa.com/fallback-abr/master.m3u8`

y también playlists hijas y segmentos del mismo stream.

### Variables necesarias

En `/opt/lavozsalsa-analytics/shared/.env` agrega:

```env
ANALYTICS_COLLECTOR_BASE_URL=http://127.0.0.1:8787
HLS_ACCESS_LOG_PATH=/var/log/nginx/access.log
HLS_SCAN_INTERVAL_MS=2000
HLS_IDLE_TIMEOUT_MS=120000
HLS_HEARTBEAT_INTERVAL_MS=60000
```

### Instalar el servicio

```bash
cp /opt/lavozsalsa-analytics/current/analytics-web/deploy/lavozsalsa-hls-forwarder.service /etc/systemd/system/
usermod -aG adm lavozsalsa
systemctl daemon-reload
systemctl enable --now lavozsalsa-hls-forwarder
systemctl status lavozsalsa-hls-forwarder --no-pager
```

Si el servicio muestra `EACCES` al abrir `/var/log/nginx/access.log`, verifica:

```bash
ls -l /var/log/nginx/access.log
id lavozsalsa
```

En Ubuntu normalmente el log pertenece al grupo `adm`, y por eso el servicio incluye `SupplementaryGroups=adm`.

### Ver logs del colector

```bash
journalctl -u lavozsalsa-hls-forwarder -f
```

### Nota operativa

Si tu streaming usa otro access log distinto de `/var/log/nginx/access.log`, cambia `HLS_ACCESS_LOG_PATH` por el archivo correcto.

## 11. Ubicacion por ciudad

Si quieres ver ciudad aproximada por conexion:

```bash
apt install -y mmdb-bin
mkdir -p /opt/lavozsalsa-analytics/shared/geoip
```

Luego coloca ahi tu base `GeoLite2-City.mmdb` y verifica:

```bash
mmdblookup --file /opt/lavozsalsa-analytics/shared/geoip/GeoLite2-City.mmdb --ip 8.8.8.8 city names es
```

Con estas variables en `.env`:

```env
GEOIP_CITY_DB_PATH=/opt/lavozsalsa-analytics/shared/geoip/GeoLite2-City.mmdb
GEOIP_LANGUAGE=es
GEOIP_CACHE_TTL_MS=86400000
```

reinicia ambos servicios:

```bash
systemctl restart lavozsalsa-analytics
systemctl restart lavozsalsa-hls-forwarder
```

Importante:

- la ciudad no es exacta; es una aproximacion por IP
- los datos historicos anteriores no se rellenan hacia atras
- la nueva geolocalizacion aplica a las conexiones nuevas que lleguen despues del cambio
