# La Voz Salsa TV para Samsung TV

## Tecnologia correcta

Para Samsung Smart TV, la mejor ruta para tu caso es:

- **Tizen Web App**
- **HTML + CSS + JavaScript**
- **AVPlay** como reproductor de video de Samsung

No conviene reutilizar Android TV para esto. Samsung TV usa Tizen, y para streaming HLS en vivo la opcion correcta es **AVPlay**.

## Lo que ya deje creado

Esta carpeta ya tiene una app minima:

- `config.xml`
- `index.html`
- `css/style.css`
- `js/main.js`

La logica incluida hace esto:

1. Intenta reproducir `LIVE`
2. Si `LIVE` falla, cambia a `FALLBACK`
3. Mientras `FALLBACK` esta activo, revisa cada 15 segundos si el manifiesto de `LIVE` ya esta disponible
4. Si `LIVE` vuelve, toma el control automaticamente

## Instalacion en Mac

### Paso 1. Instala Tizen Studio

Descarga e instala **Tizen Studio**.

### Paso 2. Abre Package Manager

Dentro de Tizen Studio, abre:

- `Package Manager`

Instala estas dos extensiones:

- `TV Extensions`
- `Samsung Certificate Extension`

### Paso 3. Crea tu certificado

En Tizen Studio abre:

- `Tools > Certificate Manager`

Y crea un perfil tipo:

- `Samsung`
- `TV`

Guarda bien la contrasena del certificado.

### Paso 4. Importa esta app

En Tizen Studio abre:

- `File > Import > Tizen > Tizen Project`

Selecciona esta carpeta:

- `samsung-tv-tizen`

Si te pide perfil/version, usa:

- `Profile: tv-samsung`
- `Version: 5.0`

## Prueba recomendada

### Primero: emulador

Usa el emulador para confirmar:

- que la app abre
- que empaqueta bien
- que la interfaz aparece

### Despues: TV real

Usa la TV real para validar:

- reproduccion de video HLS
- cambio automatico entre `LIVE` y `FALLBACK`
- estabilidad de red

## Conectar una Samsung TV real

1. En la TV abre `Apps`
2. Marca `12345`
3. Activa `Developer Mode`
4. Escribe la IP de tu Mac
5. Reinicia la TV
6. En Tizen Studio abre `Tools > Device Manager`
7. Agrega la TV y conectala

## Ejecutar la app

Con el emulador o la TV ya conectados:

1. Selecciona el dispositivo destino en la parte superior de Tizen Studio
2. Haz clic derecho sobre el proyecto
3. Abre `Run As > Tizen Web Application`

## Nota importante

Esta version es la base minima funcional.

Como tus manifiestos responden con CORS abierto, esta app puede comprobar `LIVE` antes de cambiar el reproductor, lo cual evita cortes innecesarios sobre `FALLBACK`.
