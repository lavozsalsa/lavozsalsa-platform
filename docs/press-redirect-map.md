# Mapa de Redirecciones de Prensa

Listado base de URLs ya migradas desde el WordPress viejo hacia `prensa.lavozsalsa.com`.

Estas son las rutas que ya tienen destino editorial nuevo en `prensa.lavozsalsa.com`. A partir del 12 de abril de 2026 este inventario ya puede usarse para activar y mantener los `301` desde el dominio viejo.

## URLs ya migradas

| URL vieja | URL nueva |
| --- | --- |
| `https://www.lavozsalsa.com/cantantes-de-salsa/` | `https://prensa.lavozsalsa.com/cantantes-de-salsa/` |
| `https://www.lavozsalsa.com/exitos-de-la-salsa-romantica/` | `https://prensa.lavozsalsa.com/exitos-de-la-salsa-romantica/` |
| `https://www.lavozsalsa.com/descargar-salsa/` | `https://prensa.lavozsalsa.com/descargar-salsa/` |
| `https://www.lavozsalsa.com/salsa-baul/` | `https://prensa.lavozsalsa.com/salsa-baul/` |
| `https://www.lavozsalsa.com/adolescentes-orquesta-la-historia-verdadera-de-porfi-baloa/` | `https://prensa.lavozsalsa.com/adolescentes-orquesta-la-historia-verdadera-de-porfi-baloa/` |
| `https://www.lavozsalsa.com/bares-salsa-medellin/` | `https://prensa.lavozsalsa.com/bares-salsa-medellin/` |
| `https://www.lavozsalsa.com/frankie-ruiz-el-papa-de-la-salsa/` | `https://prensa.lavozsalsa.com/frankie-ruiz-el-papa-de-la-salsa/` |
| `https://www.lavozsalsa.com/yo-me-llamo-frankie-ruiz/` | `https://prensa.lavozsalsa.com/yo-me-llamo-frankie-ruiz/` |
| `https://www.lavozsalsa.com/david-zahan-y-frankie-ruiz-reviviendo-al-papa-de-la-salsa/` | `https://prensa.lavozsalsa.com/david-zahan-y-frankie-ruiz-reviviendo-al-papa-de-la-salsa/` |
| `https://www.lavozsalsa.com/mimi-ibarra-cantautora/` | `https://prensa.lavozsalsa.com/mimi-ibarra-cantautora/` |
| `https://www.lavozsalsa.com/internacional-grupo-gale-toda-una-historia-musical/` | `https://prensa.lavozsalsa.com/internacional-grupo-gale-toda-una-historia-musical/` |
| `https://www.lavozsalsa.com/tito-rojas/` | `https://prensa.lavozsalsa.com/tito-rojas/` |

## Estado

- `301` activables desde `www.lavozsalsa.com`
- inventario alineado con `legacyUrl` dentro de [articles.js](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-prensa/content/articles.js)
- snippet listo en [nginx.legacy-press-redirects.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-prensa/deploy/nginx.legacy-press-redirects.conf)

## Nota operativa

La recomendacion sigue siendo:

1. agregar nuevas rutas migradas al inventario y al snippet
2. probar `nginx -t` despues de cada cambio
3. validar `301` con y sin slash final
4. actualizar sitemap y Search Console cuando terminemos la migracion completa
