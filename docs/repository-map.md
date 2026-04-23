# Mapa del Repositorio

Esta guia resume que hace cada carpeta importante del monorepo y cuando conviene tocarla.

## Sitios publicos

### `lavozsalsa-web/`

Sitio principal de `lavozsalsa.com`.

- objetivo: home principal y entrada al ecosistema
- stack: React + Expo Web + TypeScript
- salida: `lavozsalsa-web/dist`
- documentacion: [README](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-web/README.md)

### `lavozsalsa-tv/`

Sitio dedicado de `tv.lavozsalsa.com`.

- objetivo: streaming en vivo, chat y comunidad en un subdominio propio
- stack: React + Expo Web + TypeScript + Firebase + hls.js
- salida: `lavozsalsa-tv/dist`
- documentacion: [README](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-tv/README.md)

### `lavozsalsa-artistas/`

Sitio de artistas.

- objetivo: home para artistas, Impulso y piezas internas/comerciales
- dominio: `artistas.lavozsalsa.com`
- documentacion: [README](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-artistas/README.md)

### `lavozsalsa-premium/`

Landing comercial de membresia para oyentes.

- objetivo: conversion a Premium
- dominio: `premium.lavozsalsa.com`
- documentacion: [README](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-premium/README.md)

### `lavozsalsa-prensa/`

Pulso Salsero.

- objetivo: sala de prensa y migracion editorial desde WordPress
- dominio: `prensa.lavozsalsa.com`
- archivo de contenido: `lavozsalsa-prensa/content/articles.js`
- shell visual: `lavozsalsa-prensa/App.tsx`
- documentacion: [README](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-prensa/README.md)

## Apps y plataformas

### `app/`

App Android principal de La Voz Salsa.

- build con Gradle
- integra el proyecto movil principal

### `samsung-tv-tizen/`

Version para Samsung TV / Tizen.

### `analytics-web/`

Herramientas internas de analitica y visualizacion.

## Soporte y datos

### `data/`

Datos auxiliares del proyecto.

### `docs/`

Documentacion operativa del monorepo.

## Fuera del alcance del monorepo actual

### `rockstars-radio/`

Proyecto legado anidado. Esta ignorado en git y no hace parte del repositorio oficial de La Voz Salsa.

No conviene mezclar cambios de La Voz Salsa con ese proyecto.
