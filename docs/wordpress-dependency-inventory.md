# Inventario de Dependencias del WordPress Viejo

Fecha de corte: 2026-04-12

## Pulso Salsero

- Articulos que aun consumen media desde `www.lavozsalsa.com/wp-content/uploads/`:
  - `cantantes-de-salsa`
  - `exitos-de-la-salsa-romantica`
  - `adolescentes-orquesta-la-historia-verdadera-de-porfi-baloa`
- Total de assets historicos todavia referenciados desde el WordPress viejo: `46`

## Descargar Salsa

- Total de pistas en la landing: `78`
- Estado: los MP3 ya se sirven desde `prensa.lavozsalsa.com/media/audio/descargas/`
- Observacion: en `descargar-salsa-audios.json` se conserva `sourceUrl` del WordPress viejo solo como referencia historica, pero ya no es dependencia operativa del frontend.

## Riesgos si se apaga WordPress hoy

- Se rompen imagenes dentro de articulos ya publicados en `Pulso Salsero`.
- Se pierde la capa de compatibilidad de algunas rutas aun atendidas por Nginx/proxy.
- Se corta el acceso a `wp-content/uploads/` mientras no se mueva esa media.

## Condicion minima para apagar WordPress sin romper prensa

1. Migrar las `46` imagenes historicas restantes al stack actual.
2. Reemplazar sus referencias en `lavozsalsa-prensa/content/articles.js`.
3. Confirmar que `www.lavozsalsa.com/wp-content/uploads/` ya no sea necesario para `Pulso Salsero`.
4. Mantener el dominio viejo solo como capa de `301`, `410` y rutas tecnicas puntuales si todavia hicieran falta.
