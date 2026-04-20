# La Voz Salsa Comercial en DigitalOcean

Guía corta para publicar o actualizar `comercial.lavozsalsa.com`.

## Dominio objetivo

- `comercial.lavozsalsa.com`

## Stack

- sitio estatico exportado desde Expo Web
- salida final en `dist/`

## App Platform

Usa estos valores:

- `source_dir`: `lavozsalsa-comercial`
- build command: `npm install && npm run build:web`
- output dir: `dist`

Archivo de referencia:

- [app-platform.spec.yaml](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-comercial/deploy/app-platform.spec.yaml)

## Droplet + Nginx

Archivo principal:

- [nginx.comercial.lavozsalsa.com.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-comercial/deploy/nginx.comercial.lavozsalsa.com.conf)

Archivo de preview:

- [nginx.preview.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-comercial/deploy/nginx.preview.conf)

## Flujo recomendado

1. exportar el sitio con `npm run build:web`
2. publicar el contenido de `dist/`
3. validar SSL
4. confirmar analytics
5. mantener `noindex` hasta que la pagina este lista para abrirse a Google
