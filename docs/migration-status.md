# Estado de Migracion

Resumen rapido del estado actual del ecosistema web de La Voz Salsa.

## Dominios y subdominios

### `lavozsalsa.com`

- estado: activo
- rol: sitio principal
- Search Console: verificado

### `artistas.lavozsalsa.com`

- estado: activo
- rol: acceso para artistas y propuesta Impulso

Rutas internas no indexables:

- `artistas.lavozsalsa.com/propuesta-comercial/`
- `artistas.lavozsalsa.com/politica-para-artistas/`

### `premium.lavozsalsa.com`

- estado: activo
- rol: conversion a membresia de oyentes
- analytics: usa la misma etiqueta del sitio principal
- indexacion: temporalmente en `noindex`

### `prensa.lavozsalsa.com`

- estado: activo
- nombre visible: `Pulso Salsero`
- rol: sala de prensa y destino de migracion editorial

## Migracion editorial

La migracion no se esta haciendo en bloque. Se prioriza por trafico e intencion SEO usando Search Console.

### Prioridad alta ya trabajada

- `cantantes-de-salsa`
- `salsa-baul`

### Criterio de migracion

1. conservar el slug historico cuando aporte SEO
2. respetar la intencion de busqueda original
3. mejorar estructura, legibilidad y presentacion
4. sumar portada y metadatos para compartir
5. dejar los 301 para una etapa posterior y controlada

## Nota de trabajo

Para `Pulso Salsero`, la portada estandar por articulo se maneja en `1200x630`:

- portada limpia para el articulo
- variante social con titular encima para `og:image`
