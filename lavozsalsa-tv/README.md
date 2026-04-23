# La Voz Salsa TV

Nueva base web para `tv.lavozsalsa.com`.

## Objetivo

- separar TV del resto del ecosistema sin perder la continuidad de usuarios
- servir video en vivo propio desde el subdominio correcto
- conectar el chat actual de Firestore y el mismo acceso de Firebase Auth

## Estado

- dominio activo: [tv.lavozsalsa.com](https://tv.lavozsalsa.com)
- app nueva en este monorepo
- preparada para escuchar `Config` y `Chats` desde Firestore

## Stack

- React
- Expo Web
- TypeScript
- Firebase Web SDK
- hls.js

## Ejecutar local

```bash
cd lavozsalsa-tv
npm install
npm run web
```

## Exportar sitio estatico

```bash
npm run build:web
```

La salida queda en:

- `lavozsalsa-tv/dist`

## Archivos clave

- [App.tsx](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-tv/App.tsx)
- [postbuild-web.js](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-tv/scripts/postbuild-web.js)
- [nginx.tv.lavozsalsa.com.conf](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-tv/deploy/nginx.tv.lavozsalsa.com.conf)

## Contrato actual reutilizado

La app parte de lo que ya existe hoy en producción:

- `Config`: define el modo del canal y las URLs activas
- `Chats`: mensajes del chat en vivo
- `users/{uid}`: documento base del usuario autenticado

## Siguiente capa recomendada

1. reglas de Firestore para moderación y rate limit
2. presencia en línea con Realtime Database
3. roles con custom claims
4. panel de moderación para TV
