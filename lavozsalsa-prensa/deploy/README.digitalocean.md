# Pulso Salsero en DigitalOcean

Guia corta para publicar o actualizar `prensa.lavozsalsa.com`.

## Dominio objetivo

- `prensa.lavozsalsa.com`

## Stack

- sitio estatico exportado desde Expo Web
- salida final en `dist/`

## App Platform

Usa estos valores:

- `source_dir`: `lavozsalsa-prensa`
- build command: `npm install && npm run build:web`
- output dir: `dist`

Archivo de referencia:

- [app-platform.spec.yaml](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-prensa/deploy/app-platform.spec.yaml)

## Droplet + Nginx

Archivo principal:

- [nginx.prensa.lavozsalsa.com.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-prensa/deploy/nginx.prensa.lavozsalsa.com.conf)

Archivo de preview:

- [nginx.preview.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-prensa/deploy/nginx.preview.conf)

## Flujo recomendado

1. exportar el sitio con `npm run build:web`
2. publicar el contenido de `dist/`
3. validar portada del home y portada del articulo
4. validar `og:image` del articulo publicado
5. revisar el sitemap antes de abrir indexacion masiva
