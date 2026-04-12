# La Voz Salsa Web

Landing React independiente para `lavozsalsa.com`, separada de `rockstars-radio`.

## Stack

- React
- Expo Web
- TypeScript

## Ejecutar local

1. Instalar dependencias:

```bash
cd lavozsalsa-web
npm install --cache .npm-cache
```

2. Levantar en web:

```bash
npm run web
```

3. Exportar estatico:

```bash
npm run build:web
```

La exportacion genera:

- `dist/index.html`
- `dist/_expo/static/...`
- `dist/favicon.svg`
- `dist/social-preview.svg`
- `dist/site.webmanifest`
- `dist/robots.txt`

## Hosting temporal recomendado

### Opcion A: DigitalOcean App Platform

Es la opcion recomendada para el flujo que quieres:

- publicar primero en un host temporal
- revisar la web
- luego pasar al dominio

Archivos listos:

- [app-platform.spec.yaml](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/deploy/app-platform.spec.yaml)
- [README.digitalocean.md](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/deploy/README.digitalocean.md)

### Opcion B: VPS o Droplet propio con Nginx

Archivos listos:

- [nginx.preview.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/deploy/nginx.preview.conf)
- [Dockerfile](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/Dockerfile)

Si luego prefieres servidor administrado a mano, ya esta preparado tambien.

## Paso posterior: mover al dominio

Cuando ya la aprobemos en el host temporal:

1. Cambiar DNS del dominio o subdominio.
2. Ajustar `server_name` o conectar el dominio en Vercel.
3. Activar HTTPS.
4. Si definimos dominio final, agregar canonical y sitemap con esa URL final.

## Objetivo

- Home comercial inspirada en la claridad estructural de Spotify
- Marca, radio, TV, app y comunidad en un proyecto aislado
- Base limpia para contenido, SEO, tracking y despliegue propio
