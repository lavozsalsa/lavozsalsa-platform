# La Voz Salsa Premium en DigitalOcean

Guia corta para publicar o actualizar `premium.lavozsalsa.com`.

## Dominio objetivo

- `premium.lavozsalsa.com`

## Stack

- sitio estatico exportado desde Expo Web
- salida final en `dist/`

## App Platform

Usa estos valores:

- `source_dir`: `lavozsalsa-premium`
- build command: `npm install && npm run build:web`
- output dir: `dist`

Archivo de referencia:

- [app-platform.spec.yaml](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-premium/deploy/app-platform.spec.yaml)

## Droplet + Nginx

Archivo principal:

- [nginx.premium.lavozsalsa.com.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-premium/deploy/nginx.premium.lavozsalsa.com.conf)

Archivo de preview:

- [nginx.preview.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-premium/deploy/nginx.preview.conf)

## Flujo recomendado

1. exportar el sitio con `npm run build:web`
2. publicar el contenido de `dist/`
3. validar SSL
4. confirmar analytics
5. mantener `noindex` hasta que la pagina este lista para abrirse a Google
