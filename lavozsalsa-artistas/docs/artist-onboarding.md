# Onboarding de Artistas

## Objetivo

Reutilizar el login y registro actual de `app.lavozsalsa.com` para que el artista entre a un onboarding específico antes de habilitar la subida de música.

## Principio

No crear un login aparte para artistas.

El acceso debe funcionar así:

1. El artista llega desde `artistas.lavozsalsa.com`.
2. Hace clic en `Únete como Artista`.
3. Usa el login o registro actual.
4. Si entra como artista por primera vez, el sistema lo redirige al onboarding.
5. La subida de música permanece bloqueada hasta completar onboarding y aceptación legal.

## Flujo propuesto

### Paso 1. Acceso

- Reutilizar el modal o pantalla actual de login/registro.
- Permitir email, Google y Apple como hoy.
- Guardar un origen de entrada, por ejemplo `source=artists`.

### Paso 2. Bienvenida al flujo de artistas

Pantalla corta con:

- título: `Bienvenido a La Voz Salsa para Artistas`
- texto: `Antes de subir música, necesitamos activar tu perfil artístico y validar la información clave del proyecto.`
- CTA: `Continuar`

### Paso 3. Completar perfil artístico

Campos mínimos sugeridos:

- nombre artístico
- foto de perfil
- imagen de portada
- biografía
- país
- ciudad
- Instagram
- Facebook
- YouTube
- TikTok
- sitio web opcional

### Paso 4. Política para artistas

Mostrar:

- resumen corto
- enlace a política completa
- versión del documento

Acción obligatoria:

- checkbox de aceptación

Texto sugerido:

`Declaro que he leído y acepto la Política para Artistas y Subida de Música de La Voz Salsa.`

### Paso 5. Declaración sobre los masters

Debe ser independiente del checkbox general.

Texto sugerido:

`Declaro bajo mi responsabilidad que soy titular de los derechos sobre los masters de la música que cargue en la plataforma, o que cuento con autorización suficiente para usarla y someterla a revisión dentro de La Voz Salsa.`

Campos sugeridos:

- nombre completo legal
- checkbox de declaración

### Paso 6. Confirmación

Mostrar:

- `Tu perfil de artista ya está listo`
- `Ahora puedes entrar al panel y subir música para revisión editorial.`

CTA:

- `Ir al panel`

## Reglas funcionales

- Sin aceptar política, no se habilita `Mi música`.
- Sin declarar titularidad de masters, no se habilita `Mi música`.
- Sin perfil básico completo, el onboarding no se marca como finalizado.
- La música nunca se publica automáticamente.
- Cada canción cargada queda en `pendiente_revision`.

## Estados sugeridos

### Usuario

- `listener_free`
- `listener_premium`
- `artist_active`
- `artist_inactive`
- `admin`

### Onboarding del artista

- `artist_profile_completed`
- `artist_policy_accepted`
- `artist_masters_declared`
- `artist_onboarding_completed`

### Canciones

- `borrador`
- `pendiente_revision`
- `aprobada`
- `rechazada`

## Evidencia mínima que debe guardar el sistema

- `policy_version`
- `policy_accepted_at`
- `policy_accepted_ip`
- `policy_accepted_user_agent`
- `masters_declared_at`
- `masters_declared_ip`
- `masters_declaration_name`

## Recomendación técnica

Fase 1:

- aceptación digital con checkbox + trazabilidad
- sin firma compleja
- rápido de implementar

Fase 2:

- OTP por correo
- constancia PDF
- historial de versiones aceptadas

## Resultado esperado

El artista usa el acceso existente, pero solo obtiene permisos reales de carga cuando:

1. completa su perfil
2. acepta la política
3. declara titularidad o autorización sobre los masters

Con esto el proceso sigue siendo simple para el usuario, pero queda mejor protegido para la operación editorial y legal de La Voz Salsa.
