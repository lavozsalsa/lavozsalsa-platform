# La Voz Salsa Artistas

Sitio independiente para la vertical de artistas de La Voz Salsa.

## URLs activas

- [artistas.lavozsalsa.com](https://artistas.lavozsalsa.com)
- [artistas.lavozsalsa.com/impulso/](https://artistas.lavozsalsa.com/impulso/)

Rutas internas:

- `propuesta-comercial/`
- `politica-para-artistas/`

## Stack

- React
- Expo Web
- TypeScript

## Ejecutar local

```bash
cd lavozsalsa-artistas
npm install
npm run web
```

## Exportar sitio estatico

```bash
npm run build:web
```

La salida queda en:

- `lavozsalsa-artistas/dist`

## Archivos clave

- [App.tsx](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-artistas/App.tsx)
- [postbuild-web.js](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-artistas/scripts/postbuild-web.js)
- [artist-onboarding.md](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-artistas/docs/artist-onboarding.md)

## Notas de producto

- Reutiliza la identidad visual de La Voz Salsa para la capa B2B / artistas
- Convive con el onboarding de artistas definido en `docs/artist-onboarding.md`
- Algunas rutas son publicas comerciales y otras deben quedar fuera de indexacion
