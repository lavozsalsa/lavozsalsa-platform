# La Voz Salsa Platform

Monorepo principal de La Voz Salsa. Aqui conviven la app Android y los proyectos web publicos que hoy componen el ecosistema de la marca.

## Propiedades activas

- `lavozsalsa.com`: sitio principal
- `artistas.lavozsalsa.com`: acceso para artistas y propuesta Impulso
- `premium.lavozsalsa.com`: membresia para oyentes
- `prensa.lavozsalsa.com`: Pulso Salsero, sala de prensa y migracion editorial

## Estructura del repositorio

- `app/`: app Android principal
- `analytics-web/`: dashboard y herramientas de analitica
- `lavozsalsa-web/`: home principal de `lavozsalsa.com`
- `lavozsalsa-artistas/`: sitio para artistas, Impulso y material comercial
- `lavozsalsa-premium/`: landing comercial de Premium
- `lavozsalsa-prensa/`: Pulso Salsero y migracion del contenido editorial legado
- `samsung-tv-tizen/`: version para Samsung TV / Tizen
- `data/`: datos y archivos auxiliares del proyecto
- `docs/`: documentacion operativa del monorepo

No forma parte de este repositorio:

- `rockstars-radio/`: repo legado anidado, ignorado en `.gitignore`

## Documentacion recomendada

- [Mapa del repositorio](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/docs/repository-map.md)
- [Estado de migracion](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/docs/migration-status.md)
- [README del sitio principal](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/README.md)
- [README de artistas](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-artistas/README.md)
- [README de premium](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-premium/README.md)
- [README de prensa](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-prensa/README.md)

## Flujo rapido para proyectos web

Todos los sitios web nuevos usan la misma base:

- React
- Expo Web
- TypeScript

Comandos base:

```bash
cd lavozsalsa-web
npm install
npm run web
npm run build:web
```

Repite el mismo patron para:

- `lavozsalsa-artistas`
- `lavozsalsa-premium`
- `lavozsalsa-prensa`

Cada exportacion publica un sitio estatico en su carpeta `dist/`.

## Flujo rapido para Android

```bash
./gradlew :app:assembleDebug
```

## Despliegue

Los proyectos web se compilan como sitios estaticos y luego se publican en el servidor de produccion.

Consulta los README especificos en cada carpeta `deploy/` para:

- archivos Nginx
- source_dir de App Platform
- notas de SEO y publicacion

## Notas operativas

- Este repo ya esta conectado a GitHub bajo `lavozsalsa/lavozsalsa-platform`.
- Evita subir secretos, archivos `.env`, llaves o builds compilados.
- Para la migracion editorial, usa `lavozsalsa-prensa` como destino de las URLs heredadas de WordPress.
