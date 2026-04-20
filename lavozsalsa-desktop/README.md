# La Voz Salsa Desktop

Primera base para una app de escritorio para macOS y Windows.

## Que hace esta primera version

- Abre la app web viva de La Voz Salsa.
- Conserva el mismo login.
- Conserva el mismo chat de Firestore en TV.
- Conserva la misma radio y la misma seccion de TV que ya existen en produccion.

## Por que esta ruta

La app de escritorio reusa el sitio existente en `app.lavozsalsa.com`, asi el chat, la
autenticacion y el contenido quedan sincronizados sin duplicar backend.

## Requisitos

- Node.js
- `npm install`

La carpeta incluye un `.npmrc` propio para que Electron descargue su binario desde un
espejo estable sin tocar la configuracion del resto del proyecto.

## Ejecutar

```bash
cd lavozsalsa-desktop
npm install
npm start
```

Para abrir directo en TV:

```bash
npm start -- --tv
```

## Empaquetar

```bash
npm run release:mac:local
npm run release:win
```

`release:mac:local` prepara una base local de Electron usando la instalacion de Visual
Studio Code que ya existe en esta Mac y luego genera instaladores `.pkg` y paquetes `.zip`
para `x64` y `arm64`.

`release:win` genera el instalador `NSIS` de Windows en `x64`.

Si prefieres usar la descarga normal de Electron para macOS:

```bash
npm run release:mac
```

La salida queda en `release/`.

## Artefactos

- Windows: `La Voz Salsa Setup <version>.exe`
- macOS Apple Silicon: `La Voz Salsa-<version>-arm64.pkg`
- macOS Intel: `La Voz Salsa-<version>-x64.pkg`
- Copias `.zip` para macOS como respaldo o distribucion manual

## Firma y publicacion

Para revisar que variables faltan antes de una publicacion:

```bash
npm run release:check
```

Para validar artefactos y generar manifiesto de entrega:

```bash
npm run release:finalize
```

Eso genera:

- `release/release-manifest.json`
- `release/SHA256SUMS.txt`

Variables de ejemplo:

- [`.env.release.example`](/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-desktop/.env.release.example)

Puedes crear un archivo local:

```bash
lavozsalsa-desktop/.env.release.local
```

Los scripts de release ya lo cargan automaticamente. Ese archivo no se sube a Git.

Firma de macOS:

- `CSC_LINK`
- `CSC_KEY_PASSWORD`
- `MAC_INSTALLER_IDENTITY` si quieres que el `.pkg` tambien salga firmado

Notarizacion de macOS:

- `APPLE_ID`
- `APPLE_APP_SPECIFIC_PASSWORD`
- `APPLE_TEAM_ID`

Firma de Windows:

- `WIN_CSC_LINK`
- `WIN_CSC_KEY_PASSWORD`
- `WIN_PUBLISHER_NAME`

Si esas variables estan presentes, `electron-builder` intentara firmar automaticamente y el
script de notarizacion correra despues de firmar la app de macOS.

## Como pasarme las credenciales

Yo no puedo entrar a tus cuentas de Apple o Microsoft por mi cuenta, pero si puedo hacer la
firma aqui mismo si dejas los archivos y variables en el workspace.

Lo mas practico es:

1. Crear `lavozsalsa-desktop/.env.release.local`
2. Poner ahi las variables de firma y notarizacion
3. Si usas certificados en archivo, dejar los `.p12` dentro de una carpeta local como:

```bash
lavozsalsa-desktop/secrets/
```

Luego en `.env.release.local` puedes apuntar asi:

```bash
CSC_LINK=/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-desktop/secrets/macos-dev-id.p12
CSC_KEY_PASSWORD=tu_password
MAC_INSTALLER_IDENTITY=Developer ID Installer: LAVOZSALSA LLC (LU62YBMD4A)
APPLE_ID=tu_correo_apple
APPLE_APP_SPECIFIC_PASSWORD=tu_password_de_app
APPLE_TEAM_ID=tu_team_id

WIN_CSC_LINK=/Users/Mix/AndroidStudioProjects/LaVozSalsaTV/lavozsalsa-desktop/secrets/windows-cert.p12
WIN_CSC_KEY_PASSWORD=tu_password_windows
WIN_PUBLISHER_NAME=La Voz Salsa
```

Con eso, yo puedo correr los builds firmados desde aqui.

Si todavia no tienes `Developer ID Installer`, la app de macOS puede quedar firmada y notarizada
igual, pero el `.pkg` saldra sin firma de instalador.

## Nota de macOS

En esta maquina `hdiutil` fallo al crear `.dmg`, asi que el flujo principal de release para
Mac queda basado en `.pkg`, que sigue siendo un instalador nativo valido.

## Flujo recomendado

1. Abre la app en modo radio.
2. Cambia a TV para validar el chat de Firestore.
3. Revisa inicio de sesión con Google, Apple y correo.
4. Empaqueta cuando la sesión, el video y el chat estén estables.

## Notas de Firebase

El proyecto ya usa Firestore en la coleccion `Chats`.

Las reglas que compartiste se mantienen tal como estan mientras el equipo de desarrollo las
ajusta, para no mezclar este trabajo con la configuracion general del proyecto.

## Aislamiento

La app usa una sesion propia de Electron con partition aislada, para no mezclar cookies ni
estado con otros navegadores o proyectos locales.

## Importante

Este directorio vive aparte del resto del monorepo para no mezclar el trabajo desktop con los
sitios web ni con Android.
