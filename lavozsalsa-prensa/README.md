# Pulso Salsero

Sala de prensa de La Voz Salsa y destino de migracion del contenido editorial heredado de WordPress.

## URL activa

- [prensa.lavozsalsa.com](https://prensa.lavozsalsa.com)

## Nombre publico

- marca visible: `Pulso Salsero`
- respaldo institucional: `Sala de prensa de La Voz Salsa`

## Stack

- React
- Expo Web
- TypeScript

## Ejecutar local

```bash
cd lavozsalsa-prensa
npm install
npm run web
```

## Exportar sitio estatico

```bash
npm run build:web
```

La salida queda en:

- `lavozsalsa-prensa/dist`

## Archivos clave

- [App.tsx](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-prensa/App.tsx)
- [articles.js](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-prensa/content/articles.js)
- [postbuild-web.js](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-prensa/scripts/postbuild-web.js)
- [generate-social-cover.swift](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-prensa/scripts/generate-social-cover.swift)

## Flujo editorial rapido

Cada articulo puede tener dos imagenes:

- portada del articulo
- imagen social con titular para compartir

Estandar recomendado:

- tamano base: `1200x630`
- una imagen limpia para el articulo
- una variante social con H1 encima

Comando util para generar la portada social:

```bash
swift scripts/generate-social-cover.swift \
  --input /ruta/imagen.jpg \
  --output assets/covers/slug-social.jpg \
  --title "Titular del articulo"
```

## Como se publica un articulo

1. crear o actualizar el contenido en `content/articles.js`
2. asociar `coverImage`, `coverAlt` y `shareImage` si aplica
3. compilar con `npm run build:web`
4. publicar `dist/`

El proceso de build:

- inyecta metadatos SEO por articulo
- publica `og:image` y `twitter:image`
- copia las portadas desde `assets/covers/` a `dist/media/covers/`

## Objetivo editorial

- migrar las URLs fuertes del WordPress viejo sin perder la intencion SEO
- mejorar presentacion, velocidad y compartibilidad
- conectar cada lectura con el resto del ecosistema de La Voz Salsa
