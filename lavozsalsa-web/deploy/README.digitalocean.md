# La Voz Salsa Web en DigitalOcean

Esta es la ruta recomendada para publicar primero en un host temporal y luego pasar al dominio.

## Recomendacion

Usar **DigitalOcean App Platform** como sitio estatico.

Ventajas:

- no administras servidor
- te da URL temporal al publicar
- luego conectas dominio o subdominio
- despliegue simple desde GitHub

Archivo listo:

- [app-platform.spec.yaml](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/deploy/app-platform.spec.yaml)

## Paso recomendado a `lavozsalsa.com`

Como `lavozsalsa.com` hoy viene de WordPress y ya tiene URLs indexadas, la migracion correcta es por fases:

1. pasar solo la home nueva a `lavozsalsa.com`
2. redirigir `www.lavozsalsa.com` hacia `lavozsalsa.com`
3. mantener temporalmente en WordPress las rutas viejas que aun no migremos
4. hacer `301` o proxy de esas rutas mientras se reemplazan

Archivo sugerido para este paso:

- [nginx.lavozsalsa.com.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/deploy/nginx.lavozsalsa.com.conf)

El build ya deja listos:

- `canonical` a `https://lavozsalsa.com/`
- `og:url`
- `robots.txt`
- `sitemap.xml`
- preview social

## Opcion A: App Platform

### 1. Subir el repo

Sube este repo a GitHub para que DigitalOcean lo pueda leer.

### 2. Ajustar la spec

Edita:

- `github.repo`
- `github.branch`

Archivo:

- [app-platform.spec.yaml](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/deploy/app-platform.spec.yaml)

### 3. Crear la app

Desde el panel de DigitalOcean:

1. Ve a `App Platform`
2. Crea una nueva app desde GitHub
3. Selecciona el repo
4. Usa `lavozsalsa-web` como `source_dir`
5. Verifica:
   - build command: `npm install --cache .npm-cache && npm run build:web`
   - output dir: `dist`

### 4. Publicar en host temporal

App Platform te entrega una URL temporal tipo:

- `https://lavozsalsa-web-xxxxx.ondigitalocean.app`

Ese es el host inicial para revisar diseño, performance y contenido antes del dominio.

### 5. Pasar al dominio despues

Cuando ya la aprobemos:

1. Entra a la app en DigitalOcean
2. Abre `Settings` o `Domains`
3. Agrega `lavozsalsa.com` o un subdominio como `preview.lavozsalsa.com`
4. Crea los registros DNS que te indique DigitalOcean
5. Espera propagacion
6. Verifica HTTPS

## Opcion B: Droplet + Nginx

Usa esta opcion si prefieres control total del servidor desde el inicio.

Archivos listos:

- [nginx.preview.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/deploy/nginx.preview.conf)
- [nginx.lavozsalsa.com.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/deploy/nginx.lavozsalsa.com.conf)
- [Dockerfile](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/Dockerfile)

Flujo base:

1. Crear un Droplet Ubuntu
2. Instalar Node y Nginx
3. Ejecutar:

```bash
cd /var/www/lavozsalsa-web
npm install --cache .npm-cache
npm run build:web
```

4. Copiar `deploy/nginx.preview.conf` a Nginx
5. Servir `dist`
6. Probar primero por IP o subdominio temporal
7. Luego apuntar `lavozsalsa.com`

## Archivos de salida

Despues de `npm run build:web`, el sitio listo para publicar queda en:

- `/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/dist`

Incluye:

- `index.html`
- `404.html`
- `favicon.svg`
- `social-preview.svg`
- `site.webmanifest`
- `robots.txt`
- `_expo/static/...`
