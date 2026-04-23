import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

const ROOT_ROUTE = '/';
const IMPULSO_ROUTE = '/impulso/';
const POLICY_ROUTE = '/politica-para-artistas/';
const PROPOSAL_ROUTE = '/propuesta-comercial/';
const MAIN_SITE_URL = 'https://lavozsalsa.com';
const APP_URL = 'https://app.lavozsalsa.com';
const LIVE_STREAMING_URL = 'https://tv.lavozsalsa.com';
const PANEL_URL = 'https://panel.artistas.lavozsalsa.com';
const APP_DOWNLOAD_URL = 'https://onelink.to/w5n2k9';
const WHATSAPP_PROPOSAL_URL =
  'https://api.whatsapp.com/send?text=Hola%20La%20Voz%20Salsa%2C%20quiero%20solicitar%20una%20propuesta%20para%20Impulso%20La%20Voz%20Salsa%20para%20Artistas.';
const PRIVACY_URL = 'https://app.lavozsalsa.com/privacidad';
const TERMS_URL = 'https://app.lavozsalsa.com/terminos';
const COOKIES_URL = 'https://app.lavozsalsa.com/politica-de-cookies';

const BRAND_LOGO_SRC = '/brand/logo-lavozsalsa-artistas-v2.png';
const PROPOSAL_BRAND_LOGO_SRC = '/brand/propuesta-logo-lavozsalsa.png';
const ARTIST_HERO_IMAGE_SRC = '/media/artist-home-hero-optimized.jpg';
const IMPULSO_HOME_BG_SRC = '/media/impulso-home-bg.jpg';
const IMPULSO_PROPOSAL_COVER_SRC = '/media/impulso-proposal-cover.png';
const IMPULSO_ECOSYSTEM_PREVIEW_SRC = '/media/impulso-ecosystem-preview.jpg';
const IMPULSO_STUDIO_SHOT_SRC = '/media/impulso-studio-shot.jpeg';
const IMPULSO_LOGO_CHRISTIAN_ALICEA_SRC = '/media/impulso-logo-christian-alicea.png';
const IMPULSO_LOGO_DAVID_ZAHAN_SRC = '/media/impulso-logo-david-zahan.png';
const IMPULSO_LOGO_FRANKIE_RUIZ_SRC = '/media/impulso-logo-frankie-ruiz.png';
const IMPULSO_LOGO_GRUPO_GALE_SRC = '/media/impulso-logo-grupo-gale.png';
const IMPULSO_LOGO_MILES_PENA_SRC = '/media/impulso-logo-miles-pena.png';
const IMPULSO_LOGO_MIMI_IBARRA_SRC = '/media/impulso-logo-mimi-ibarra.png';
const IMPULSO_LOGO_REY_RUIZ_SRC = '/media/impulso-logo-rey-ruiz.png';
const IMPULSO_LOGO_WILLIE_GONZALEZ_SRC = '/media/impulso-logo-willie-gonzalez.png';

const artistNav = [
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Plan', href: '#plan' },
  { label: 'FAQ', href: '#faq' },
];

const policyNav = [
  { label: 'Resumen', href: '#resumen' },
  { label: 'Titularidad', href: '#titularidad' },
  { label: 'Revisión', href: '#revision' },
  { label: 'Contacto', href: '#contacto' },
];

const proposalNav = [
  { label: 'Alcance', href: '#alcance' },
  { label: 'Plan', href: '#plan-promocional' },
  { label: 'Términos', href: '#terminos' },
];

const artistHighlights = [
  {
    title: 'Perfil oficial',
    copy: 'Organiza tu presencia artística con biografía, redes, identidad visual y contexto editorial.',
  },
  {
    title: 'Panel propio',
    copy: 'Sube tu música, gestiona tu cuenta y sigue el estado editorial desde un solo lugar.',
  },
  {
    title: 'Radar curado',
    copy: 'Tu proyecto entra a una plataforma pensada para salsa nueva, playlists editoriales y descubrimiento real.',
  },
];

const artistSteps = [
  {
    step: '01',
    title: 'Ingresa o regístrate',
    copy: 'Usas el acceso actual de La Voz Salsa para entrar al flujo de artistas sin crear otro login aparte.',
  },
  {
    step: '02',
    title: 'Completa tu perfil',
    copy: 'Configuras nombre artístico, biografía, ciudad, portada y redes para presentar tu proyecto con claridad.',
  },
  {
    step: '03',
    title: 'Acepta la política',
    copy: 'Antes de subir música debes aceptar la política para artistas y declarar que eres dueño de los masters o que tienes autorización suficiente.',
  },
  {
    step: '04',
    title: 'Sube música para revisión',
    copy: 'Solo después se habilita la carga. Cada canción entra a revisión editorial antes de vivir dentro de La Voz Salsa.',
  },
];

const artistPlanFeatures = [
  'Acceso al panel de administración para artistas.',
  'Gestión del perfil artístico.',
  'Subida de música desde su panel.',
  'Biografía.',
  'Redes sociales.',
  'Insignia de artista verificado.',
  'Publicación del catálogo bajo aprobación interna.',
  'Oportunidad de entrar en playlists curadas por La Voz Salsa.',
  'Posibilidad de conectar con una audiencia interesada en salsa nueva.',
  'Consideración de temas para la emisora.',
];

const artistPlanSummary = [
  'Panel propio para gestionar tu cuenta artística.',
  'Perfil verificado con biografía, imagen y redes.',
  'Subida de música sujeta a revisión editorial.',
  'Posibilidad de entrar en playlists y ser considerado para la emisora.',
];

const artistFaqItems = [
  {
    question: '¿Qué incluye La Voz Salsa para Artistas?',
    answer:
      'Incluye acceso a panel de administración, gestión de perfil, subida de música, biografía, redes sociales, insignia verificada, publicación bajo aprobación interna, posibilidad de entrar en playlists curadas y consideración de temas para la emisora.',
  },
  {
    question: '¿Puedo subir mi música directamente?',
    answer:
      'Sí. Tendrás acceso a un panel de artista desde donde podrás subir tu música para revisión.',
  },
  {
    question: '¿La música se publica automáticamente?',
    answer:
      'No. Todo el contenido pasa por aprobación interna para asegurar la identidad y calidad editorial de La Voz Salsa.',
  },
  {
    question: '¿Qué significa tener perfil verificado?',
    answer:
      'Significa que tu perfil contará con una insignia oficial dentro de la plataforma, lo que aporta mayor confianza e identidad frente a la audiencia.',
  },
  {
    question: '¿La suscripción garantiza sonar en la emisora?',
    answer:
      'No. La suscripción te da la posibilidad de ser considerado editorialmente, pero la selección depende de criterios internos de La Voz Salsa.',
  },
  {
    question: '¿Qué pasa si quiero más promoción?',
    answer:
      'Puedes solicitar una propuesta personalizada en el plan Impulso La Voz Salsa para Artistas a través de WhatsApp.',
  },
  {
    question: '¿Qué podré hacer desde el panel de artistas?',
    answer:
      'Podrás editar tu perfil, actualizar tu biografía y redes, subir tu música y revisar el estado editorial de tus canciones.',
  },
];

const artistPolicySections = [
  {
    id: 'resumen',
    number: '1',
    title: 'Objeto',
    paragraphs: [
      'La presente política regula las condiciones aplicables al registro de artistas, creación de perfiles artísticos y carga de música dentro de la plataforma digital de La Voz Salsa.',
    ],
  },
  {
    id: 'alcance',
    number: '2',
    title: 'Alcance',
    paragraphs: [
      'Esta política aplica a todo artista, agrupación, representante, sello, manager o tercero que cree un perfil de artista, cargue música, entregue materiales promocionales o solicite visibilidad dentro del ecosistema digital de La Voz Salsa.',
    ],
  },
  {
    id: 'servicio',
    number: '3',
    title: 'Naturaleza del servicio para artistas',
    paragraphs: [
      'La Voz Salsa ofrece un espacio curado para artistas dentro de su plataforma, a través del cual los artistas pueden gestionar su perfil, cargar música y presentar su proyecto musical para evaluación editorial interna.',
      'El acceso al servicio para artistas podrá incluir beneficios como acceso al panel de administración, gestión del perfil artístico, carga de música, publicación de biografía y redes sociales, insignia de artista verificado, posibilidad de ser considerado para playlists curadas y para la emisora.',
    ],
  },
  {
    id: 'registro',
    number: '4',
    title: 'Registro y perfil del artista',
    paragraphs: [
      'Para acceder al panel de artista, el usuario deberá suministrar información veraz, actualizada y suficiente sobre su identidad artística y su proyecto musical.',
      'La Voz Salsa podrá solicitar nombre artístico, fotografía de perfil, imagen de portada, biografía, país, ciudad, enlaces a redes sociales, sitio web si aplica e información básica sobre lanzamientos musicales.',
      'El artista será responsable de que toda la información suministrada sea auténtica, exacta y no infrinja derechos de terceros.',
    ],
  },
  {
    id: 'subida',
    number: '5',
    title: 'Subida de música',
    paragraphs: [
      'El artista podrá cargar su música a través del panel habilitado por La Voz Salsa, junto con la información editorial y promocional que corresponda.',
      'La carga de un archivo musical o de cualquier material relacionado no implica aceptación automática, publicación inmediata ni inclusión garantizada dentro de la plataforma, playlists o emisora.',
    ],
  },
  {
    id: 'revision',
    number: '6',
    title: 'Revisión editorial y aprobación interna',
    paragraphs: [
      'Todo contenido cargado por un artista quedará sujeto a revisión editorial interna por parte de La Voz Salsa.',
      'La Voz Salsa se reserva el derecho de aprobar, rechazar, aplazar, retirar o solicitar ajustes sobre cualquier perfil, canción, portada, metadata, imagen, biografía o material promocional cargado por el artista.',
      'La revisión podrá considerar, entre otros criterios, calidad técnica mínima del material, coherencia con la línea editorial, integridad de la información entregada, identidad y autenticidad del proyecto artístico, cumplimiento de requisitos de formato y ausencia de contenidos ilegales, engañosos, ofensivos o infractores.',
    ],
  },
  {
    id: 'publicacion',
    number: '7',
    title: 'No publicación automática',
    paragraphs: [
      'La música no se publica automáticamente. Todo contenido cargado por el artista quedará pendiente de revisión hasta su aprobación interna por parte de La Voz Salsa.',
    ],
  },
  {
    id: 'verificado',
    number: '8',
    title: 'Perfil verificado',
    paragraphs: [
      'La insignia o condición de perfil verificado dentro de la plataforma de La Voz Salsa tiene un carácter identificador y editorial.',
      'Su otorgamiento depende de criterios internos de validación y no constituye certificación pública de fama, representación exclusiva, titularidad absoluta de derechos ni garantía comercial de resultados.',
      'La Voz Salsa podrá otorgar, negar, retirar o suspender dicha insignia cuando lo considere necesario para preservar la confianza, integridad y coherencia de la plataforma.',
    ],
  },
  {
    id: 'titularidad',
    number: '9',
    title: 'Derechos sobre el contenido cargado',
    paragraphs: [
      'El artista declara y garantiza que es titular de los derechos sobre los masters de la música cargada o que cuenta con las autorizaciones, facultades y permisos suficientes para cargar, compartir, presentar o someter a revisión la música y demás materiales entregados a La Voz Salsa.',
      'Esta declaración cubre música, imágenes, portadas, biografías, nombres artísticos, logos, marcas, videos, textos y cualquier otro material relacionado con el perfil del artista.',
      'El artista será el único responsable frente a cualquier reclamación derivada de infracción de derechos de autor, derechos conexos, uso no autorizado de imagen, marcas, nombres, diseños, fonogramas o cualquier derecho de terceros.',
    ],
  },
  {
    id: 'licencia',
    number: '10',
    title: 'Licencia de uso para operación de la plataforma',
    paragraphs: [
      'Al cargar contenido en la plataforma, el artista autoriza a La Voz Salsa, de manera no exclusiva, revocable en los casos que correspondan y limitada a la operación del servicio, para almacenar, visualizar, revisar, organizar, exhibir dentro de la plataforma, relacionar con el perfil del artista y usar dicho contenido en los espacios internos o públicos de La Voz Salsa en los que resulte necesario para la prestación del servicio.',
      'Esta autorización no implica obligación de publicación, promoción, difusión radial ni explotación comercial distinta de la operación normal de la plataforma, salvo pacto expreso adicional.',
    ],
  },
  {
    id: 'playlists',
    number: '11',
    title: 'Playlists curadas y consideración editorial',
    paragraphs: [
      'La existencia del perfil de artista o el pago del plan para artistas no garantiza inclusión automática en playlists, rotación dentro de la emisora, campañas promocionales, entrevistas, difusión en redes sociales ni resultados de audiencia.',
      'La Voz Salsa podrá considerar canciones o proyectos para sus playlists curadas y para su emisora con base en criterios editoriales, curatoriales, técnicos y estratégicos definidos internamente.',
    ],
  },
  {
    id: 'promocionales',
    number: '12',
    title: 'Planes promocionales adicionales',
    paragraphs: [
      'La Voz Salsa podrá ofrecer alternativas promocionales adicionales o propuestas personalizadas para artistas. Estas opciones, cuando existan, serán independientes de la mera creación del perfil y estarán sujetas a condiciones particulares.',
    ],
  },
  {
    id: 'conductas',
    number: '13',
    title: 'Conductas no permitidas',
    bullets: [
      'Cargar contenido falso, engañoso o que suplante a terceros.',
      'Subir música o materiales sin contar con derechos o autorizaciones suficientes.',
      'Manipular metadata, estadísticas o identidad del proyecto artístico.',
      'Usar la plataforma para spam, fraude o actividades ilícitas.',
      'Publicar materiales ofensivos, discriminatorios, difamatorios o contrarios a la ley.',
      'Intentar eludir los procesos de revisión o aprobación de La Voz Salsa.',
    ],
  },
  {
    id: 'retiro',
    number: '14',
    title: 'Suspensión o retiro de contenido',
    paragraphs: [
      'La Voz Salsa podrá suspender perfiles, retirar canciones, ocultar materiales o cancelar accesos cuando detecte incumplimientos, reclamaciones de terceros, inconsistencias de identidad, riesgos legales, problemas técnicos o cualquier situación que afecte la seguridad, reputación o funcionamiento de la plataforma.',
    ],
  },
  {
    id: 'modificaciones',
    number: '15',
    title: 'Modificaciones',
    paragraphs: [
      'La Voz Salsa podrá modificar esta política en cualquier momento. Las versiones actualizadas serán publicadas en los canales oficiales correspondientes.',
    ],
  },
  {
    id: 'contacto',
    number: '16',
    title: 'Contacto',
    paragraphs: [
      'Para consultas relacionadas con perfiles de artista, subida de música o revisión editorial, el usuario podrá comunicarse con La Voz Salsa a través de los canales oficiales publicados en la plataforma.',
    ],
  },
];

const impulsoNav = [
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Plan artistas', href: ROOT_ROUTE },
];

const impulsoBenefits = [
  'Mayor visibilidad dentro del ecosistema La Voz Salsa.',
  'Prioridad en oportunidades promocionales.',
  'Posibilidad de campañas especiales.',
  'Apoyo estratégico para lanzamientos.',
];

const impulsoHighlights = [
  {
    title: 'Más visibilidad',
    copy: 'Tu proyecto puede ganar una presencia más fuerte dentro del ecosistema La Voz Salsa según el momento del lanzamiento y el tipo de campaña.',
  },
  {
    title: 'Prioridad promocional',
    copy: 'Abrimos una conversación para identificar oportunidades especiales de exposición y activarlas con más intención.',
  },
  {
    title: 'Estrategia a la medida',
    copy: 'La propuesta se diseña según tu realidad, tu música y lo que de verdad tenga sentido mover para tu carrera.',
  },
];

const impulsoProposalFormats = [
  {
    tag: 'Ecosistema',
    title: 'Más presencia dentro de La Voz Salsa',
    copy: 'La propuesta puede abrir espacios de visibilidad mejor ubicados dentro del ecosistema según el momento del artista y el objetivo del lanzamiento.',
  },
  {
    tag: 'Promoción',
    title: 'Prioridad en oportunidades especiales',
    copy: 'Impulso permite evaluar oportunidades promocionales con más intención, no como una acción genérica sino como una ruta diseñada para el proyecto.',
  },
  {
    tag: 'Campaña',
    title: 'Acciones hechas a la medida',
    copy: 'Cuando el proyecto lo necesita, la propuesta puede tomar forma en acciones especiales de impulso, presencia editorial y acompañamiento estratégico.',
  },
  {
    tag: 'Propuesta',
    title: 'Un plan comercial personalizado',
    copy: 'No hay checkout directo porque primero entendemos tu proyecto. Luego definimos qué sí vale la pena activar y cómo presentarlo.',
  },
];

const impulsoSteps = [
  {
    step: '01',
    title: 'Cuéntanos tu proyecto',
    copy: 'Nos compartes tu momento, tu música y qué tipo de impulso estás buscando.',
  },
  {
    step: '02',
    title: 'Diseñamos la propuesta',
    copy: 'Te presentamos una ruta promocional personalizada, alineada con tu realidad y tus objetivos.',
  },
  {
    step: '03',
    title: 'Activamos la campaña',
    copy: 'Ejecutamos acciones especiales dentro del ecosistema La Voz Salsa según lo acordado.',
  },
];

const impulsoFaqItems = [
  {
    question: '¿Este plan tiene precio público?',
    answer: 'No. Este plan se maneja por propuesta personalizada según el proyecto y sus necesidades.',
  },
  {
    question: '¿Cómo se solicita?',
    answer: 'A través del botón de WhatsApp o el canal de contacto definido por La Voz Salsa.',
  },
  {
    question: '¿Qué puede incluir?',
    answer:
      'Puede incluir mayor visibilidad, prioridad en oportunidades promocionales, acciones especiales de impulso y una propuesta comercial personalizada.',
  },
];

const trustedArtistLogos = [
  { name: 'Willie González', src: IMPULSO_LOGO_WILLIE_GONZALEZ_SRC },
  { name: 'Rey Ruiz', src: IMPULSO_LOGO_REY_RUIZ_SRC },
  { name: 'Mimi Ibarra', src: IMPULSO_LOGO_MIMI_IBARRA_SRC },
  { name: 'Miles Peña', src: IMPULSO_LOGO_MILES_PENA_SRC },
  { name: 'Grupo Gale', src: IMPULSO_LOGO_GRUPO_GALE_SRC },
  { name: 'Frankie Ruiz', src: IMPULSO_LOGO_FRANKIE_RUIZ_SRC },
  { name: 'David Zahan', src: IMPULSO_LOGO_DAVID_ZAHAN_SRC },
  { name: 'Christian Alicea', src: IMPULSO_LOGO_CHRISTIAN_ALICEA_SRC },
];

const footerColumns = [
  {
    title: 'Producto',
    links: [
      { label: 'Plan Artistas', href: ROOT_ROUTE },
      { label: 'Panel', href: PANEL_URL },
      { label: 'Impulso', href: IMPULSO_ROUTE },
    ],
  },
  {
    title: 'Ecosistema',
    links: [
      { label: 'La Voz Salsa', href: MAIN_SITE_URL },
      { label: 'App', href: APP_URL },
      { label: 'Live Streaming', href: LIVE_STREAMING_URL },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Política para artistas', href: POLICY_ROUTE },
      { label: 'Privacidad', href: PRIVACY_URL },
      { label: 'Términos', href: TERMS_URL },
      { label: 'Cookies', href: COOKIES_URL },
    ],
  },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/lavozsalsa', icon: 'instagram' },
  { label: 'TikTok', href: 'https://tiktok.com/@lavozsalsa', icon: 'tiktok' },
  { label: 'Facebook', href: 'https://facebook.com/lavozsalsa', icon: 'facebook' },
  { label: 'Twitter', href: 'https://twitter.com/lavozsalsa', icon: 'twitter' },
  { label: 'YouTube', href: 'https://youtube.com/@lavozsalsa', icon: 'youtube' },
];

const proposalIdentityPoints = [
  '12 años de experiencia en la industria salsera.',
  'Más de 250 mil seguidores en nuestro ecosistema digital.',
  'Visibilidad y proyección para artistas con propuesta propia.',
];

const proposalPlanGroups = [
  {
    title: 'Plataforma artística',
    icon: 'panel',
    items: [
      'Todo lo del plan de artistas dentro de la plataforma.',
      'Acceso al panel de administración para artistas.',
      'Gestión del perfil artístico con biografía, redes sociales e identidad visual.',
      'Subida de música desde su panel.',
      'Insignia de artista verificado.',
      'Publicación del catálogo bajo aprobación interna.',
    ],
  },
  {
    title: 'Ruta editorial',
    icon: 'spotlight',
    items: [
      'Inclusión en playlists curadas por La Voz Salsa.',
      'Posibilidad de conectar con una audiencia interesada en salsa nueva.',
      'Canción en nuestra parrilla musical.',
      'Canción en el front de la plataforma en destacados.',
    ],
  },
  {
    title: 'Impulso promocional',
    icon: 'megaphone',
    items: [
      'Lanzamiento oficial de la canción en redes y live streaming de nuestros programas más top.',
      'Inclusión en el Top de la salsa nueva (reel en redes sociales con nuestras recomendadas).',
      'Publicidad en nuestras redes sociales con reels e historias para impulsar videos e imagen.',
      'Entrevista presencial en nuestros estudios.',
      'Envío de lanzamiento por email marketing masivo con una base de datos de 10.000 salseros.',
    ],
  },
];

const proposalPricing = [
  {
    label: 'Plan mensual',
    price: 'USD$600',
    detail: 'Una entrada clara para activar tu presencia y medir el impulso del lanzamiento.',
  },
  {
    label: 'Plan semestral',
    price: 'USD$2400',
    detail: 'Ahorra USD$1200 y sostiene una presencia más consistente en el tiempo.',
    badge: 'Ahorra USD$1200',
  },
  {
    label: 'Plan anual',
    price: 'USD$4200',
    detail: 'Ahorra USD$3000 y construye una ruta continua de posicionamiento y lanzamiento.',
    badge: 'Ahorra USD$3000',
  },
];

function normalizePathname(pathname: string) {
  if (!pathname || pathname === '/') {
    return ROOT_ROUTE;
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 12.6 10 16.6 18 8.6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M9.5 7H17v7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProposalGroupIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'panel':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.9" />
          <path d="M8 9h8M8 13h5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case 'spotlight':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5c4.1 0 7 1.8 7 4.2S16.1 13.4 12 13.4 5 11.6 5 9.2 7.9 5 12 5Z" fill="none" stroke="currentColor" strokeWidth="1.9" />
          <path d="M9.7 13.1 8.5 18l3.5-2.4 3.5 2.4-1.2-4.9" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 15.5 8.8-8.8c.8-.8 2-.8 2.8 0l.7.7c.8.8.8 2 0 2.8L9.5 19H5v-3.5Z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.5 8.5 16 11" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
  }
}

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 4c.6 2.1 2 3.5 4 4v2.6c-1.3-.1-2.5-.5-3.6-1.2v5.2a4.9 4.9 0 1 1-4.9-4.9c.4 0 .9.1 1.3.2v2.7a2.3 2.3 0 1 0 1 1.9V4H13Z" fill="currentColor" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.4 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H16V3.7c-.5-.1-1.4-.2-2.3-.2-2.3 0-3.8 1.4-3.8 4v2.3H7.3V13h2.6v8h3.5Z" fill="currentColor" />
        </svg>
      );
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.8 3H22l-7 8 8.2 10H17l-5-6.6L6 21H2.8l7.5-8.6L2.4 3H8.7l4.5 6 5.6-6Z" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21.6 7.3a2.8 2.8 0 0 0-2-2C17.8 5 12 5 12 5s-5.8 0-7.6.3a2.8 2.8 0 0 0-2 2A29.7 29.7 0 0 0 2 12a29.7 29.7 0 0 0 .4 4.7 2.8 2.8 0 0 0 2 2c1.8.3 7.6.3 7.6.3s5.8 0 7.6-.3a2.8 2.8 0 0 0 2-2A29.7 29.7 0 0 0 22 12a29.7 29.7 0 0 0-.4-4.7ZM9.7 15.1V8.9l5.4 3.1-5.4 3.1Z" fill="currentColor" />
        </svg>
      );
  }
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.6 12.6c0-2 1.6-3 1.7-3.1-1-.9-2.6-1-3.2-1-.9-.1-2 .5-2.5.5-.6 0-1.5-.5-2.4-.5-1.2 0-2.4.7-3 1.8-1.3 2.2-.3 5.5 1 7.3.6.9 1.4 1.9 2.4 1.8 1 0 1.3-.6 2.5-.6 1.1 0 1.4.6 2.5.6 1 0 1.7-.9 2.3-1.8.7-1.1 1-2.1 1-2.1-.1 0-2.3-.9-2.3-3Zm-1-5.7c.5-.6.9-1.4.8-2.2-.8 0-1.6.5-2.1 1.1-.5.5-.9 1.4-.8 2.1.8.1 1.6-.4 2.1-1Z" fill="currentColor" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.6 4.4 14.9 12 4.6 19.6c-.4-.3-.6-.8-.6-1.3V5.8c0-.5.2-1 .6-1.4Z" fill="currentColor" opacity="0.92" />
      <path d="M16.8 13.4 6.7 21l6.4-6.3 3.7-1.3Z" fill="currentColor" opacity="0.8" />
      <path d="m16.8 10.6-3.7-1.3L6.7 3l10.1 7.6Z" fill="currentColor" opacity="0.8" />
      <path d="M19.8 11.1c.9.5.9 1.3 0 1.8l-3 1.7-3.7-2.6 3.7-2.6 3 1.7Z" fill="currentColor" />
    </svg>
  );
}

function SiteFooter() {
  return (
    <footer className="lva-footer">
      <div className="lva-shell">
        <div className="lva-footer-top">
          <img className="lva-footer-logo" src={BRAND_LOGO_SRC} alt="La Voz Salsa para Artistas" />

          <div className="lva-footer-grid">
            {footerColumns.map((column) => (
              <div key={column.title} className="lva-footer-column">
                <h4>{column.title}</h4>
                {column.links.map((link) => (
                  <a key={link.label} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="lva-footer-socials" aria-label="Redes sociales">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                className="lva-social-link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                title={item.label}
              >
                <SocialIcon icon={item.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="lva-footer-bottom">
          <div className="lva-legal-links">
            <a href={POLICY_ROUTE}>Política para artistas</a>
            <a href={PRIVACY_URL}>Privacidad</a>
            <a href={TERMS_URL}>Términos</a>
            <a href={COOKIES_URL}>Cookies</a>
          </div>

          <span>© 2026 La Voz Salsa para Artistas. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}

function FaqSection({
  eyebrow,
  title,
  intro,
  items,
  tone = 'dark',
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: { question: string; answer: string }[];
  tone?: 'dark' | 'cream';
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className={`lva-section ${tone === 'cream' ? 'lva-section-cream' : 'lva-section-dark'}`}>
      <div className="lva-shell">
        <span className="lva-eyebrow">{eyebrow}</span>
        <h2 className="lva-section-title">{title}</h2>
        <p className="lva-section-intro">{intro}</p>

        <div className="lva-faq-list">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <button
                key={item.question}
                type="button"
                className="lva-faq-item"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <div className="lva-faq-head">
                  <span>{item.question}</span>
                  <span className="lva-faq-symbol">{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen ? <div className="lva-faq-body">{item.answer}</div> : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ArtistPage() {
  return (
    <>
      <section className="lva-hero lva-home-hero-section">
        <div className="lva-shell lva-home-hero">
          <div className="lva-home-copy">
            <span className="lva-eyebrow">Plataforma curada de salsa nueva</span>
            <h1 className="lva-title">La Voz Salsa para Artistas</h1>
            <p className="lva-subtitle lva-home-subtitle">
              Haz parte de una plataforma exclusiva para artistas independientes de la salsa.
            </p>
            <p className="lva-copy">
              Activa tu perfil, sube tu música y conecta con una audiencia que sí quiere descubrir salsa nueva.
            </p>

            <div className="lva-actions-row">
              <a className="lva-button" href={PANEL_URL}>
                Únete como Artista
                <ArrowIcon />
              </a>
              <a className="lva-button-secondary" href="#como-funciona">
                Cómo funciona
              </a>
            </div>

            <div className="lva-home-meta">
              <span>Perfil verificado</span>
              <span>Revisión editorial</span>
              <span>Playlists y emisora</span>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="lva-section lva-section-cream">
        <div className="lva-shell">
          <span className="lva-eyebrow">Beneficios</span>
          <h2 className="lva-section-title">Lo esencial, explicado sin ruido.</h2>

          <div className="lva-grid-3">
            {artistHighlights.map((item) => (
              <article key={item.title} className="lva-simple-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <article className="lva-benefits-panel">
            <div className="lva-benefits-head">
              <span className="lva-card-tag">Qué incluye</span>
              <h3>Todo lo que activas dentro del plan.</h3>
            </div>

            <ul className="lva-benefits-list">
              {artistPlanFeatures.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="como-funciona" className="lva-section lva-section-dark">
        <div className="lva-shell">
          <span className="lva-eyebrow">Cómo funciona</span>
          <h2 className="lva-section-title">Así entra un artista al ecosistema.</h2>

          <div className="lva-grid-steps">
            {artistSteps.map((item) => (
              <article key={item.title} className="lva-step-card">
                <span className="lva-step-number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lva-note-band">
        <div className="lva-shell lva-note-band-inner">
          <span className="lva-note-label">Importante</span>
          <p>
            La música no se publica automáticamente. Primero se valida el perfil del artista, luego se acepta la política
            y la declaración sobre los masters, y solo después se habilita la subida para revisión interna.
          </p>
        </div>
      </section>

      <section id="plan" className="lva-section lva-section-cream">
        <div className="lva-shell">
          <span className="lva-eyebrow">Plan anual</span>
          <h2 className="lva-section-title">Un plan anual. Una puerta de entrada clara.</h2>
          <p className="lva-section-intro">
            El valor no es solo subir canciones. Es tener estructura, identidad y una posibilidad editorial real dentro de una plataforma curada.
          </p>

          <div className="lva-plan-layout">
            <article className="lva-plan-card">
              <span className="lva-card-tag">La Voz Salsa para Artistas</span>
              <p className="lva-price">US$99 / año</p>
              <p className="lva-plan-copy">
                Panel de artista, perfil verificado y subida de música con revisión editorial.
              </p>

              <ul className="lva-check-list">
                {artistPlanSummary.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="lva-plan-footnote">
                Acceso anual. La promoción y la rotación editorial siempre dependen de criterios internos de La Voz Salsa.
              </p>

              <div className="lva-actions-row">
                <a className="lva-button" href={PANEL_URL}>
                  Únete como Artista
                  <ArrowIcon />
                </a>
                <a className="lva-button-secondary" href={PANEL_URL}>
                  Conocer el panel
                </a>
              </div>
            </article>

            <article className="lva-plan-side">
              <h3>Lo que sí recibes</h3>
              <p>
                Un espacio serio dentro de una plataforma enfocada en salsa nueva, con estructura, identidad y ruta editorial.
              </p>

              <h3>Si quieres ir más allá</h3>
              <p>
                Si necesitas llevar tu carrera a otro nivel o lanzar algo nuevo con estrategia, también puedes activar una ruta premium pensada para dar más visibilidad a tu proyecto.
              </p>

              <a className="lva-text-link" href={IMPULSO_ROUTE}>
                Conocer Impulso
                <ArrowIcon />
              </a>
            </article>
          </div>

          <div className="lva-plan-policy-banner">
            <div>
              <span className="lva-card-tag">Titularidad de masters</span>
              <p>
                Para habilitar la subida de música, el artista deberá aceptar la política para artistas y declarar que es dueño de los masters o que cuenta con autorización suficiente.
              </p>
            </div>
            <a className="lva-button-secondary lva-button-secondary-dark" href={POLICY_ROUTE}>
              Leer política completa
            </a>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Preguntas frecuentes"
        title="Lo que un artista debe tener claro antes de entrar."
        intro="Aquí resolvemos las preguntas esenciales sobre el plan, la revisión editorial y la subida de música."
        items={artistFaqItems}
        tone="dark"
      />

      <section className="lva-section lva-section-dark">
        <div className="lva-shell">
          <div className="lva-final-cta-card">
            <span className="lva-eyebrow">Ruta premium</span>
            <h2 className="lva-section-title">¿Necesitas llevar tu carrera a otro nivel o lanzar algo nuevo con estrategia?</h2>
            <p className="lva-section-intro">
              Cuando tu proyecto necesita una activación más fuerte, Impulso abre una propuesta promocional a la medida dentro del ecosistema La Voz Salsa.
            </p>

            <div className="lva-actions-row lva-final-cta-actions">
              <a className="lva-button" href={IMPULSO_ROUTE}>
                Conocer Impulso
                <ArrowIcon />
              </a>
              <a className="lva-button-secondary" href={PANEL_URL}>
                Únete como Artista
              </a>
              <a className="lva-text-link" href={WHATSAPP_PROPOSAL_URL}>
                Hablar con el equipo
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ImpulsoPage() {
  return (
    <>
      <section className="lva-hero lva-impulso-hero-section">
        <div className="lva-shell lva-impulso-hero-inner">
          <div className="lva-impulso-hero-copy">
            <span className="lva-eyebrow">Plan premium para artistas</span>
            <h1 className="lva-title">Lleva tu proyecto a otro nivel</h1>
            <p className="lva-subtitle">Promoción estratégica para artistas que están listos para crecer.</p>
            <p className="lva-copy">
              Una propuesta a la medida dentro del ecosistema La Voz Salsa.
            </p>

            <div className="lva-actions-row">
              <a className="lva-button" href={WHATSAPP_PROPOSAL_URL}>
                Hablemos de tu proyecto
              </a>
              <a className="lva-button-secondary" href="#beneficios">
                Ver beneficios
              </a>
            </div>

            <div className="lva-home-meta">
              <span>Propuesta personalizada</span>
              <span>Estrategia a la medida</span>
              <span>Acompañamiento directo</span>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="lva-section lva-section-cream">
        <div className="lva-shell">
          <span className="lva-eyebrow">Qué activa</span>
          <h2 className="lva-section-title">Una propuesta premium pensada para mover mejor tu música.</h2>

          <div className="lva-grid-3">
            {impulsoHighlights.map((item) => (
              <article key={item.title} className="lva-simple-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <article className="lva-benefits-panel">
            <div className="lva-benefits-head">
              <span className="lva-card-tag">Beneficios visibles</span>
              <h3>Lo que puede incluir la propuesta.</h3>
            </div>

            <ul className="lva-benefits-list">
              {impulsoBenefits.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="lva-note-band">
        <div className="lva-shell lva-note-band-inner">
          <span className="lva-note-label">Sin checkout</span>
          <p>
            Impulso no se compra como un plan estándar. Primero entendemos tu lanzamiento, luego definimos una propuesta personalizada y después activamos la ruta promocional.
          </p>
        </div>
      </section>

      <section id="propuesta" className="lva-section lva-section-cream">
        <div className="lva-shell">
          <div className="lva-impulso-proposal-stage">
            <div className="lva-impulso-proposal-copy">
              <span className="lva-eyebrow">La propuesta</span>
              <h2 className="lva-section-title">Una ruta premium pensada según el momento real del artista.</h2>
              <p className="lva-section-intro">
                Tomamos como base la propuesta comercial que ya usamos en La Voz Salsa y la convertimos en una conversación estratégica: qué vale la pena mover, cómo activarlo y dónde darle más intención dentro del ecosistema.
              </p>
            </div>
          </div>

          <div className="lva-grid-3 lva-impulso-format-grid">
            {impulsoProposalFormats.map((item) => (
              <article key={item.title} className="lva-simple-card lva-impulso-format-card">
                <span className="lva-card-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lva-section lva-section-dark">
        <div className="lva-shell lva-trust-stack">
          <div className="lva-trust-copy">
            <span className="lva-eyebrow">Confianza</span>
            <h2 className="lva-section-title">Artistas que han confiado en La Voz Salsa.</h2>
            <p className="lva-section-intro">
              Algunos de los artistas salseros que han confiado en La Voz Salsa para impulsar su presencia.
            </p>
          </div>

          <div className="lva-logo-grid" aria-label="Artistas que han confiado en La Voz Salsa">
            {trustedArtistLogos.map((artist) => (
              <article key={artist.name} className="lva-logo-card">
                <img src={artist.src} alt={artist.name} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="lva-section lva-section-dark">
        <div className="lva-shell">
          <span className="lva-eyebrow">Proceso</span>
          <h2 className="lva-section-title">Tres pasos para convertir una idea en una propuesta real.</h2>

          <div className="lva-grid-3">
            {impulsoSteps.map((item) => (
              <article key={item.title} className="lva-step-card">
                <span className="lva-step-number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Preguntas frecuentes"
        title="Lo importante antes de pedir tu propuesta."
        intro="El plan Impulso funciona como una conversación comercial, no como una compra automática."
        items={impulsoFaqItems}
        tone="cream"
      />

      <section className="lva-section lva-section-dark">
        <div className="lva-shell">
          <div className="lva-final-cta-card">
            <span className="lva-eyebrow">Impulso para artistas</span>
            <h2 className="lva-section-title">Cuéntanos qué estás lanzando y qué quieres mover.</h2>
            <p className="lva-section-intro">
              Si tu proyecto necesita más visibilidad, más estrategia o una campaña especial dentro del ecosistema La Voz Salsa, conversemos por WhatsApp.
            </p>

            <div className="lva-actions-row lva-final-cta-actions">
              <a className="lva-button" href={WHATSAPP_PROPOSAL_URL}>
                Hablemos de tu proyecto
                <ArrowIcon />
              </a>
              <a className="lva-button-secondary" href={PROPOSAL_ROUTE}>
                Quiero conocer la propuesta
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PolicyPage() {
  return (
    <>
      <section className="lva-hero lva-policy-hero">
        <div className="lva-shell">
          <span className="lva-eyebrow">Legal para artistas</span>
          <h1 className="lva-title lva-policy-title">Política para Artistas y Subida de Música</h1>
          <p className="lva-subtitle lva-policy-subtitle">
            Condiciones aplicables al registro de artistas, creación de perfiles y carga de música dentro del ecosistema La Voz Salsa.
          </p>
          <p className="lva-copy">
            Esta política deja claro un punto central: el artista debe ser titular de los masters o contar con autorización suficiente para cargar y someter a revisión el material dentro de la plataforma.
          </p>
        </div>
      </section>

      <section className="lva-section lva-section-cream">
        <div className="lva-shell">
          <div className="lva-grid-3">
            <article className="lva-simple-card">
              <h3>Dueño de los masters</h3>
              <p>La carga de música solo está permitida para artistas, representantes o terceros que tengan derechos o autorizaciones suficientes.</p>
            </article>
            <article className="lva-simple-card">
              <h3>Revisión interna</h3>
              <p>Todo el contenido queda pendiente de evaluación editorial y no se publica automáticamente.</p>
            </article>
            <article className="lva-simple-card">
              <h3>Aceptación obligatoria</h3>
              <p>Esta política debe aceptarse antes de habilitar la subida de música dentro del panel de artistas.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="lva-section lva-section-dark">
        <div className="lva-shell">
          <div className="lva-policy-list">
            {artistPolicySections.map((section) => (
              <article key={section.number} id={section.id} className="lva-policy-card">
                <div className="lva-policy-number">{section.number}</div>
                <div className="lva-policy-body">
                  <h3>{section.title}</h3>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="lva-policy-bullets">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>
                          <CheckIcon />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProposalFooter() {
  return (
    <footer className="lva-proposal-footer">
      <div className="lva-shell">
        <div className="lva-proposal-footer-top">
          <div>
            <img className="lva-proposal-footer-logo" src={PROPOSAL_BRAND_LOGO_SRC} alt="La Voz Salsa" />
            <p className="lva-proposal-footer-copy">
              Música, radio y comunidad para salseros en Latinoamérica.
            </p>
          </div>

          <div className="lva-proposal-socials" aria-label="Redes sociales">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                className="lva-social-link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                title={item.label}
              >
                <SocialIcon icon={item.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="lva-proposal-store-row">
          <a className="lva-store-badge" href={APP_DOWNLOAD_URL} target="_blank" rel="noreferrer">
            <AppleIcon />
            <span>
              <strong>Descargar en</strong>
              <small>App Store</small>
            </span>
          </a>
          <a className="lva-store-badge" href={APP_DOWNLOAD_URL} target="_blank" rel="noreferrer">
            <GooglePlayIcon />
            <span>
              <strong>Descargar en</strong>
              <small>Google Play</small>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function ProposalPage() {
  return (
    <div className="lva-proposal-page">
      <section className="lva-proposal-cover">
        <div className="lva-shell lva-proposal-cover-inner">
          <div className="lva-proposal-cover-copy">
            <span className="lva-eyebrow">Propuesta comercial para artistas</span>
            <h1 className="lva-title">Promoción y difusión para artistas de salsa.</h1>
            <p className="lva-subtitle">
              Una ruta pensada para dar visibilidad a tu lanzamiento dentro del ecosistema La Voz Salsa.
            </p>
            <p className="lva-copy lva-proposal-cover-body">
              Presentamos una propuesta clara, directa y flexible para artistas que quieren fortalecer su presencia, mover mejor su música y conectar con la comunidad correcta.
            </p>
          </div>
        </div>
      </section>

      <div className="lva-shell lva-proposal-document">
        <section id="alcance" className="lva-proposal-sheet">
          <div className="lva-proposal-sheet-head">
            <span className="lva-eyebrow">Quiénes somos</span>
            <h2 className="lva-section-title">Una comunidad construida para la salsa.</h2>
            <p className="lva-section-intro">
              La Voz Salsa es un ecosistema digital especializado en salsa que integra radio, live streaming, redes sociales y una comunidad internacional de oyentes en Latinoamérica, Estados Unidos y Europa. Somos una plataforma para artistas independientes, diseñada para impulsar lanzamientos, fortalecer su imagen y generar conexión real con una audiencia apasionada por el género.
            </p>
          </div>

          <div className="lva-proposal-lead-points">
            {proposalIdentityPoints.map((item) => (
              <div key={item} className="lva-proposal-lead-point">
                <CheckIcon />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="plan-promocional" className="lva-proposal-sheet lva-proposal-sheet-accent">
          <div className="lva-proposal-sheet-head">
            <span className="lva-eyebrow">Plan promocional</span>
            <h2 className="lva-section-title">Una propuesta diseñada para dar más alcance a tu lanzamiento.</h2>
            <p className="lva-section-intro">
              Este plan concentra difusión, posicionamiento y visibilidad para artistas y proyectos que quieren aprovechar todo el alcance del universo La Voz Salsa.
            </p>
          </div>

          <div className="lva-proposal-plan-layout">
            <article className="lva-proposal-includes-card">
              <span className="lva-card-tag">Qué incluye</span>
              <div className="lva-proposal-groups">
                {proposalPlanGroups.map((group) => (
                  <section key={group.title} className="lva-proposal-group">
                    <div className="lva-proposal-group-head">
                      <span className="lva-proposal-group-icon">
                        <ProposalGroupIcon icon={group.icon} />
                      </span>
                      <h3>{group.title}</h3>
                    </div>
                    <ul className="lva-check-list">
                      {group.items.map((item) => (
                        <li key={item}>
                          <CheckIcon />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </article>

            <div className="lva-proposal-pricing-grid">
              {proposalPricing.map((item) => (
                <article key={item.label} className="lva-proposal-price-card">
                  <div className="lva-proposal-price-top">
                    <h3>{item.label}</h3>
                    {item.badge ? <span className="lva-card-tag">{item.badge}</span> : null}
                  </div>
                  <span className="lva-proposal-price-label">Inversión</span>
                  <p className="lva-price">{item.price}</p>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="terminos" className="lva-proposal-sheet lva-proposal-sheet-dark">
          <div className="lva-proposal-sheet-head">
            <span className="lva-eyebrow">Términos y condiciones</span>
            <h2 className="lva-section-title">Difundimos tu música con estrategia y sin falsas promesas.</h2>
          </div>
          <p className="lva-section-intro">
            La presente propuesta se limita a su promoción y difusión; como tal no constituye una responsabilidad ni una promesa de “pegar en el medio”, como tampoco somos una marca en búsqueda de contratos, ni shows para el artista, no hacemos contactos con empresarios ni somos organizadores de espectáculos. Nos limitamos a difundir la música y los eventos.
          </p>

          <div className="lva-actions-row lva-final-cta-actions">
            <a className="lva-button" href={WHATSAPP_PROPOSAL_URL}>
              Estoy listo para impulsar mi carrera
              <ArrowIcon />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function App() {
  const currentPath = normalizePathname(typeof window === 'undefined' ? ROOT_ROUTE : window.location.pathname);
  const isImpulsoPage = currentPath === IMPULSO_ROUTE;
  const isPolicyPage = currentPath === POLICY_ROUTE;
  const isProposalPage = currentPath === PROPOSAL_ROUTE;
  const navLinks = isProposalPage ? proposalNav : isPolicyPage ? policyNav : isImpulsoPage ? impulsoNav : artistNav;

  return (
    <>
      <StatusBar style="light" />

      <style>{`
        @font-face {
          font-family: "Gotham";
          src: url("/fonts/GothamBook.ttf") format("truetype");
          font-weight: 500;
          font-display: swap;
        }

        @font-face {
          font-family: "Gotham";
          src: url("/fonts/GothamMedium.ttf") format("truetype");
          font-weight: 600;
          font-display: swap;
        }

        @font-face {
          font-family: "Gotham";
          src: url("/fonts/GothamBold.ttf") format("truetype");
          font-weight: 700;
          font-display: swap;
        }

        @font-face {
          font-family: "Gotham";
          src: url("/fonts/GothamBlack.otf") format("opentype");
          font-weight: 900;
          font-display: swap;
        }

        :root {
          color-scheme: dark;
          --bg: #060606;
          --surface: #111111;
          --surface-soft: rgba(255, 255, 255, 0.04);
          --line: rgba(255, 255, 255, 0.1);
          --line-strong: rgba(255, 255, 255, 0.18);
          --text: #ffffff;
          --muted: rgba(255, 255, 255, 0.74);
          --muted-dark: #3d3d3d;
          --brand: #ff101f;
          --brand-soft: rgba(255, 16, 31, 0.12);
          --cream: #f4efe6;
          --font-main: "Gotham", "Avenir Next", "Helvetica Neue", Arial, sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          min-height: 100%;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background:
            radial-gradient(circle at top left, rgba(255, 16, 31, 0.15), transparent 22%),
            linear-gradient(180deg, #050505 0%, #090909 100%);
          color: var(--text);
          font-family: var(--font-main);
          font-weight: 500;
        }

        #root {
          display: block !important;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        img {
          display: block;
          max-width: 100%;
        }

        button {
          font: inherit;
        }

        .lva-page {
          min-height: 100vh;
        }

        .lva-shell {
          width: min(1120px, calc(100% - 48px));
          margin: 0 auto;
        }

        .lva-topbar {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(18px);
          background: rgba(5, 5, 5, 0.88);
          border-bottom: 1px solid var(--line);
        }

        .lva-topbar-proposal {
          position: static;
          backdrop-filter: none;
          background: #12090a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .lva-topbar-proposal .lva-topbar-inner {
          min-height: 88px;
          padding: 18px 0;
        }

        .lva-topbar-proposal .lva-brand img {
          width: 210px;
        }

        .lva-topbar-proposal .lva-nav {
          display: none;
        }

        .lva-topbar-proposal .lva-header-action {
          min-height: 46px;
          padding: 0 20px;
          font-size: 0.94rem;
        }

        .lva-topbar-inner {
          min-height: 102px;
          padding: 10px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .lva-brand {
          display: inline-flex;
          align-items: center;
          min-width: 0;
        }

        .lva-brand img {
          width: 228px;
          height: auto;
        }

        .lva-nav {
          display: flex;
          align-items: center;
          gap: 22px;
          flex-wrap: wrap;
        }

        .lva-nav a,
        .lva-footer-column a,
        .lva-legal-links a {
          color: rgba(255, 255, 255, 0.86);
          font-size: 0.94rem;
          font-weight: 700;
          transition: color 180ms ease;
        }

        .lva-nav a:hover,
        .lva-footer-column a:hover,
        .lva-legal-links a:hover,
        .lva-text-link:hover {
          color: var(--brand);
        }

        .lva-header-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 18px;
          border-radius: 999px;
          background: #ffffff;
          color: #050505;
          font-weight: 700;
        }

        .lva-section {
          padding: 96px 0;
        }

        .lva-section-dark {
          background: transparent;
        }

        .lva-section-cream {
          background: var(--cream);
          color: #111111;
        }

        .lva-hero {
          padding: 84px 0 72px;
        }

        .lva-home-hero,
        .lva-hero-grid,
        .lva-plan-layout,
        .lva-footer-top {
          display: grid;
          gap: 28px;
        }

        .lva-home-hero {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          min-height: calc(100vh - 88px);
          padding: 96px 0 88px;
        }

        .lva-home-hero-section {
          position: relative;
          overflow: hidden;
          padding: 0;
          background: #070506;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .lva-home-hero-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("${ARTIST_HERO_IMAGE_SRC}");
          background-size: cover;
          background-position: center center;
          transform: scaleX(-1);
          transform-origin: center;
          pointer-events: none;
        }

        .lva-home-hero-section::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(10, 5, 6, 0.88) 0%, rgba(10, 5, 6, 0.8) 28%, rgba(10, 5, 6, 0.34) 60%, rgba(10, 5, 6, 0.56) 100%),
            radial-gradient(circle at 18% 24%, rgba(255, 16, 31, 0.16), transparent 28%),
            linear-gradient(180deg, rgba(5, 5, 5, 0.06) 0%, rgba(5, 5, 5, 0.18) 100%);
          pointer-events: none;
        }

        .lva-home-copy {
          max-width: 620px;
        }

        .lva-hero-grid {
          grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
          align-items: start;
        }

        .lva-impulso-hero-section {
          position: relative;
          overflow: hidden;
          padding: 0;
          background: #070506;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .lva-impulso-hero-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("${IMPULSO_HOME_BG_SRC}");
          background-size: cover;
          background-position: 24% center;
          transform: scaleX(-1);
          transform-origin: center;
          opacity: 1;
          pointer-events: none;
        }

        .lva-impulso-hero-section::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(7, 5, 6, 0.88) 0%, rgba(7, 5, 6, 0.78) 24%, rgba(7, 5, 6, 0.3) 48%, rgba(7, 5, 6, 0.08) 74%, rgba(7, 5, 6, 0.16) 100%),
            radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.12), transparent 26%),
            linear-gradient(180deg, rgba(5, 5, 5, 0.04) 0%, rgba(5, 5, 5, 0.18) 100%);
          pointer-events: none;
        }

        .lva-impulso-hero-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          min-height: calc(100vh - 88px);
          padding: 96px 0 88px;
        }

        .lva-impulso-hero-copy {
          max-width: 720px;
        }

        .lva-impulso-hero-copy .lva-title {
          max-width: 8.5ch;
        }

        .lva-impulso-hero-copy .lva-subtitle {
          max-width: 22ch;
        }

        .lva-proposal-page {
          background: linear-gradient(180deg, #f1e9df 0%, #ece3d7 100%);
          color: #111111;
        }

        .lva-proposal-cover {
          position: relative;
          overflow: hidden;
          padding: 0;
          border-bottom: 1px solid rgba(17, 17, 17, 0.08);
          border-radius: 0 0 26px 26px;
        }

        .lva-proposal-cover::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("/media/propuesta-portada.jpg");
          background-size: cover;
          background-position: center center;
          transform: scaleX(-1);
          pointer-events: none;
        }

        .lva-proposal-cover::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(16, 7, 8, 0.84) 0%, rgba(16, 7, 8, 0.6) 34%, rgba(16, 7, 8, 0.26) 68%, rgba(16, 7, 8, 0.1) 100%),
            linear-gradient(180deg, rgba(15, 5, 6, 0.1) 0%, rgba(15, 5, 6, 0.26) 100%);
          pointer-events: none;
        }

        .lva-proposal-cover-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          min-height: calc(84vh - 88px);
          padding: 98px 0 84px;
        }

        .lva-proposal-cover-copy {
          max-width: 700px;
        }

        .lva-proposal-document {
          padding: 40px 0 96px;
          display: grid;
          gap: 24px;
        }

        .lva-proposal-sheet {
          padding: 42px;
          border-radius: 34px;
          background: #f8f3ec;
          border: 1px solid rgba(17, 17, 17, 0.08);
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.06);
        }

        .lva-proposal-sheet-accent {
          background: linear-gradient(180deg, #ffffff 0%, #faf5ef 100%);
        }

        .lva-proposal-sheet-dark {
          background: linear-gradient(180deg, #161010 0%, #0a0909 100%);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.08);
        }

        .lva-proposal-sheet-head {
          margin-bottom: 28px;
        }

        .lva-proposal-sheet .lva-section-title {
          max-width: 13ch;
          font-size: clamp(2rem, 3.8vw, 3.1rem);
          line-height: 0.98;
        }

        .lva-proposal-sheet .lva-section-intro {
          color: #494949;
          max-width: 70ch;
        }

        .lva-proposal-cover-copy .lva-title {
          max-width: 11.5ch;
          color: #ffffff;
          font-size: clamp(2.8rem, 5.4vw, 4.8rem);
          line-height: 0.95;
        }

        .lva-proposal-cover-copy .lva-subtitle {
          max-width: 24ch;
          margin-top: 18px;
          color: rgba(255, 255, 255, 0.9);
          font-size: clamp(1.08rem, 1.9vw, 1.42rem);
          line-height: 1.2;
        }

        .lva-proposal-cover-body {
          margin-top: 18px;
          max-width: 60ch;
          color: rgba(255, 255, 255, 0.72);
        }

        .lva-proposal-sheet-dark .lva-section-title,
        .lva-proposal-sheet-dark .lva-section-intro {
          color: #ffffff;
        }

        .lva-proposal-lead-points {
          display: grid;
          gap: 14px;
          margin-bottom: 0;
        }

        .lva-proposal-lead-point {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 18px 20px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(17, 17, 17, 0.08);
          box-shadow: 0 16px 30px rgba(0, 0, 0, 0.04);
          line-height: 1.58;
          color: #1f1f1f;
        }

        .lva-proposal-lead-point svg {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          color: var(--brand);
          flex: 0 0 auto;
        }

        .lva-proposal-plan-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
          gap: 24px;
          align-items: start;
        }

        .lva-proposal-includes-card {
          padding: 30px;
          border-radius: 30px;
          background: #171111;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .lva-proposal-groups {
          display: grid;
          gap: 24px;
        }

        .lva-proposal-group {
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .lva-proposal-group:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }

        .lva-proposal-group-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }

        .lva-proposal-group-head h3 {
          margin: 0;
          font-size: 1.12rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #ffffff;
        }

        .lva-proposal-group-icon {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 16, 31, 0.12);
          color: #ff6b74;
          flex: 0 0 auto;
        }

        .lva-proposal-group-icon svg {
          width: 18px;
          height: 18px;
          display: block;
        }

        .lva-proposal-includes-card .lva-check-list {
          margin-top: 0;
          gap: 0;
        }

        .lva-proposal-includes-card .lva-check-list li {
          padding: 10px 0;
          border-bottom: 0;
        }

        .lva-proposal-includes-card .lva-check-list li:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }

        .lva-proposal-includes-card .lva-check-list svg {
          width: 22px;
          height: 22px;
          margin-top: 0;
          padding: 4px;
          border-radius: 999px;
          background: rgba(255, 16, 31, 0.12);
          color: #ff6b74;
        }

        .lva-proposal-includes-card .lva-check-list span {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.98rem;
          font-weight: 600;
          line-height: 1.55;
        }

        .lva-proposal-pricing-grid {
          display: grid;
          gap: 16px;
        }

        .lva-proposal-price-card {
          padding: 28px;
          border-radius: 28px;
          border: 1px solid rgba(17, 17, 17, 0.08);
          background: #ffffff;
          box-shadow: 0 22px 42px rgba(0, 0, 0, 0.08);
        }

        .lva-proposal-price-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
        }

        .lva-proposal-price-card h3 {
          margin: 0;
          color: #111111;
          font-size: 1.22rem;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .lva-proposal-price-card p:last-child {
          margin: 14px 0 0;
          color: #4a4a4a;
          line-height: 1.66;
        }

        .lva-proposal-price-label {
          display: inline-block;
          margin-top: 16px;
          color: #8a8a8a;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .lva-proposal-price-card .lva-price {
          margin-top: 8px;
          font-size: clamp(1.72rem, 3vw, 2.5rem);
          line-height: 1;
          letter-spacing: -0.035em;
        }

        .lva-proposal-footer {
          padding: 64px 0 40px;
          background: #000000;
          border-top: 1px solid var(--line);
        }

        .lva-proposal-footer-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px;
          flex-wrap: wrap;
        }

        .lva-proposal-footer-logo {
          width: min(100%, 220px);
        }

        .lva-proposal-footer-copy {
          margin: 18px 0 0;
          max-width: 40ch;
          color: rgba(255, 255, 255, 0.68);
          line-height: 1.68;
        }

        .lva-proposal-store-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .lva-store-badge {
          min-width: 198px;
          padding: 14px 18px;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #121212;
          transition: border-color 180ms ease, transform 180ms ease;
        }

        .lva-store-badge:hover {
          border-color: rgba(255, 16, 31, 0.36);
          transform: translateY(-1px);
        }

        .lva-store-badge svg {
          width: 24px;
          height: 24px;
          flex: 0 0 auto;
        }

        .lva-store-badge span {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .lva-store-badge strong {
          font-size: 0.8rem;
          font-weight: 700;
          line-height: 1;
        }

        .lva-store-badge small {
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.1;
        }

        .lva-eyebrow {
          display: inline-block;
          margin-bottom: 18px;
          color: #ff8088;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .lva-section-cream .lva-eyebrow {
          color: #b70713;
        }

        .lva-title,
        .lva-section-title {
          margin: 0;
          font-family: var(--font-main);
          font-weight: 900;
          letter-spacing: -0.055em;
          line-height: 0.94;
        }

        .lva-title {
          max-width: 10ch;
          font-size: clamp(3.3rem, 7vw, 6.2rem);
        }

        .lva-section-title {
          max-width: 12ch;
          font-size: clamp(2.4rem, 5vw, 4.4rem);
        }

        .lva-subtitle {
          margin: 22px 0 0;
          max-width: 27ch;
          font-size: clamp(1.2rem, 2vw, 1.7rem);
          font-weight: 700;
          line-height: 1.14;
        }

        .lva-home-subtitle {
          max-width: 21ch;
          font-size: clamp(1.14rem, 1.8vw, 1.42rem);
        }

        .lva-copy,
        .lva-section-intro,
        .lva-simple-card p,
        .lva-step-card p,
        .lva-plan-side p,
        .lva-faq-body {
          font-size: 1.02rem;
          line-height: 1.74;
        }

        .lva-copy,
        .lva-section-intro {
          max-width: 60ch;
          color: var(--muted);
        }

        .lva-section-cream .lva-section-intro,
        .lva-section-cream .lva-simple-card p,
        .lva-section-cream .lva-plan-side p,
        .lva-section-cream .lva-faq-body {
          color: var(--muted-dark);
        }

        .lva-actions-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        .lva-home-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 22px;
          color: rgba(255, 255, 255, 0.64);
          font-size: 0.86rem;
          font-weight: 600;
        }

        .lva-home-meta span {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .lva-home-meta span::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--brand);
          display: block;
          flex: 0 0 auto;
        }

        .lva-button,
        .lva-button-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 52px;
          padding: 0 24px;
          border-radius: 999px;
          border: 1px solid transparent;
          font-weight: 700;
          transition: transform 180ms ease, border-color 180ms ease, color 180ms ease;
        }

        .lva-button:hover,
        .lva-button-secondary:hover,
        .lva-text-link:hover,
        .lva-header-action:hover {
          transform: translateY(-1px);
        }

        .lva-button {
          background: #ffffff;
          color: #050505;
        }

        .lva-proposal-sheet-dark .lva-button {
          box-shadow: 0 0 0 rgba(255, 16, 31, 0);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            color 180ms ease,
            background 180ms ease,
            box-shadow 220ms ease;
        }

        .lva-proposal-sheet-dark .lva-button:hover {
          background: var(--brand);
          color: #ffffff;
          box-shadow: 0 18px 38px rgba(255, 16, 31, 0.28);
        }

        .lva-button-secondary {
          background: transparent;
          border-color: rgba(255, 255, 255, 0.34);
          color: #ffffff;
        }

        .lva-button-secondary:hover {
          border-color: rgba(255, 16, 31, 0.44);
          color: var(--brand);
        }

        .lva-button-secondary-dark {
          border-color: rgba(17, 17, 17, 0.18);
          color: #111111;
        }

        .lva-button-secondary-dark:hover {
          border-color: rgba(255, 16, 31, 0.38);
          color: var(--brand);
        }

        .lva-button svg,
        .lva-text-link svg {
          width: 18px;
          height: 18px;
          display: block;
        }

        .lva-hero-card,
        .lva-simple-card,
        .lva-step-card,
        .lva-plan-card,
        .lva-plan-side,
        .lva-faq-item {
          border-radius: 30px;
          border: 1px solid var(--line);
        }

        .lva-hero-card,
        .lva-step-card,
        .lva-faq-item {
          background: rgba(255, 255, 255, 0.04);
        }

        .lva-hero-card,
        .lva-plan-card,
        .lva-plan-side {
          padding: 28px;
        }

        .lva-card-tag {
          display: inline-flex;
          align-items: center;
          min-height: 30px;
          padding: 0 12px;
          border-radius: 999px;
          background: var(--brand-soft);
          color: #ff8a92;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lva-hero-card h2,
        .lva-simple-card h3,
        .lva-step-card h3,
        .lva-plan-card h3,
        .lva-plan-side h3 {
          margin: 18px 0 0;
          font-size: 1.44rem;
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
        }

        .lva-card-note {
          margin: 18px 0 0;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.64;
        }

        .lva-check-list {
          list-style: none;
          margin: 22px 0 0;
          padding: 0;
          display: grid;
          gap: 12px;
        }

        .lva-check-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          line-height: 1.58;
        }

        .lva-check-list svg {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          color: var(--brand);
          flex: 0 0 auto;
        }

        .lva-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin-top: 38px;
        }

        .lva-grid-steps {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          margin-top: 38px;
        }

        .lva-simple-card,
        .lva-step-card {
          padding: 26px;
        }

        .lva-simple-card {
          background: #ffffff;
          border-color: rgba(17, 17, 17, 0.08);
          box-shadow: 0 22px 42px rgba(0, 0, 0, 0.08);
        }

        .lva-benefits-panel {
          margin-top: 24px;
          padding: 30px;
          border-radius: 30px;
          background: #ffffff;
          border: 1px solid rgba(17, 17, 17, 0.08);
          box-shadow: 0 22px 42px rgba(0, 0, 0, 0.08);
        }

        .lva-benefits-head h3 {
          margin: 18px 0 0;
          max-width: 18ch;
          color: #111111;
          font-size: 1.44rem;
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
        }

        .lva-benefits-list {
          list-style: none;
          padding: 0;
          margin: 26px 0 0;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px 22px;
        }

        .lva-benefits-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: #2b2b2b;
          line-height: 1.58;
        }

        .lva-benefits-list svg {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          color: var(--brand);
          flex: 0 0 auto;
        }

        .lva-step-number {
          display: inline-block;
          color: #ff8088;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .lva-note-band {
          padding: 0 0 24px;
        }

        .lva-note-band-inner {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 22px 26px;
          border-radius: 26px;
          background: rgba(255, 16, 31, 0.08);
          border: 1px solid rgba(255, 16, 31, 0.18);
        }

        .lva-note-label {
          flex: 0 0 auto;
          color: #ff8a92;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .lva-note-band-inner p {
          margin: 0;
          color: #ffffff;
          line-height: 1.64;
        }

        .lva-plan-layout {
          grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
          align-items: start;
          margin-top: 38px;
        }

        .lva-plan-policy-banner {
          margin-top: 28px;
          padding: 24px 26px;
          border-radius: 26px;
          background: rgba(255, 16, 31, 0.06);
          border: 1px solid rgba(255, 16, 31, 0.12);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
        }

        .lva-plan-policy-banner p {
          margin: 14px 0 0;
          max-width: 62ch;
          color: #3a3a3a;
          line-height: 1.7;
        }

        .lva-plan-card {
          background: #ffffff;
          color: #111111;
          border-color: rgba(17, 17, 17, 0.08);
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.08);
        }

        .lva-plan-card .lva-card-tag {
          color: #b70713;
        }

        .lva-price {
          margin: 20px 0 0;
          font-size: clamp(2.6rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 0.96;
          letter-spacing: -0.05em;
        }

        .lva-plan-copy {
          margin: 16px 0 0;
          color: #3b3b3b;
          line-height: 1.72;
        }

        .lva-plan-footnote {
          margin: 20px 0 0;
          color: #656565;
          font-size: 0.92rem;
          line-height: 1.68;
        }

        .lva-plan-side {
          background: rgba(17, 17, 17, 0.05);
          border-color: rgba(17, 17, 17, 0.08);
        }

        .lva-plan-side h3 + p {
          margin-top: 10px;
        }

        .lva-plan-side h3:last-of-type {
          margin-top: 28px;
        }

        .lva-text-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 26px;
          color: #111111;
          font-weight: 700;
          transition: color 180ms ease, transform 180ms ease;
        }

        .lva-faq-list {
          display: grid;
          gap: 14px;
          margin-top: 34px;
        }

        .lva-final-cta-card {
          padding: 42px;
          border-radius: 34px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            radial-gradient(circle at top right, rgba(255, 16, 31, 0.16), transparent 26%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%);
        }

        .lva-final-cta-card .lva-section-title {
          max-width: 16ch;
        }

        .lva-final-cta-card .lva-section-intro {
          margin-top: 18px;
          max-width: 62ch;
        }

        .lva-final-cta-actions {
          margin-top: 28px;
        }

        .lva-trust-layout {
          display: grid;
          grid-template-columns: minmax(320px, 0.92fr) minmax(0, 1.08fr);
          gap: 28px;
          align-items: center;
        }

        .lva-trust-stack {
          display: grid;
          gap: 30px;
        }

        .lva-impulso-proposal-stage {
          position: relative;
          overflow: hidden;
          min-height: 430px;
          padding: 52px 56px;
          display: flex;
          align-items: flex-end;
          border-radius: 34px;
          background: #0e0e0f;
          box-shadow: 0 26px 52px rgba(0, 0, 0, 0.12);
        }

        .lva-impulso-proposal-stage::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 22%, rgba(255, 133, 141, 0.34), transparent 28%),
            radial-gradient(circle at 78% 34%, rgba(255, 71, 86, 0.22), transparent 24%),
            linear-gradient(135deg, #760611 0%, #b30816 34%, #ff1d2d 68%, #6f0610 100%);
          pointer-events: none;
        }

        .lva-impulso-proposal-stage::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(8, 8, 8, 0.9) 0%, rgba(8, 8, 8, 0.82) 34%, rgba(8, 8, 8, 0.46) 64%, rgba(8, 8, 8, 0.34) 100%),
            linear-gradient(180deg, rgba(10, 10, 10, 0.12) 0%, rgba(10, 10, 10, 0.32) 100%);
          pointer-events: none;
        }

        .lva-impulso-proposal-copy {
          position: relative;
          z-index: 1;
          max-width: 660px;
        }

        .lva-impulso-proposal-copy .lva-section-title {
          max-width: 11ch;
          color: #ffffff;
        }

        .lva-impulso-proposal-copy .lva-section-intro {
          color: rgba(255, 255, 255, 0.76);
        }

        .lva-impulso-format-grid {
          margin-top: 24px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .lva-impulso-format-card .lva-card-tag {
          color: #b70713;
        }

        .lva-trust-visual {
          overflow: hidden;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
        }

        .lva-trust-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .lva-trust-copy .lva-section-title {
          max-width: 10ch;
        }

        .lva-logo-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .lva-logo-card {
          min-height: 136px;
          padding: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background:
            radial-gradient(circle at top left, rgba(255, 16, 31, 0.12), transparent 34%),
            rgba(255, 255, 255, 0.04);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }

        .lva-logo-card img {
          width: 100%;
          max-width: 220px;
          max-height: 88px;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 10px 24px rgba(255, 255, 255, 0.06));
        }

        .lva-policy-hero {
          background:
            radial-gradient(circle at top left, rgba(255, 16, 31, 0.12), transparent 24%),
            linear-gradient(180deg, #050505 0%, #0b0b0b 100%);
        }

        .lva-policy-title {
          max-width: 12ch;
        }

        .lva-policy-subtitle {
          max-width: 28ch;
        }

        .lva-policy-list {
          display: grid;
          gap: 18px;
        }

        .lva-policy-card {
          display: grid;
          grid-template-columns: 64px minmax(0, 1fr);
          gap: 18px;
          padding: 28px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .lva-policy-number {
          width: 64px;
          height: 64px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 16, 31, 0.12);
          color: #ff9aa0;
          font-size: 1.1rem;
          font-weight: 900;
          flex: 0 0 auto;
        }

        .lva-policy-body h3 {
          margin: 2px 0 0;
          font-size: 1.38rem;
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
        }

        .lva-policy-body p {
          margin: 14px 0 0;
          color: rgba(255, 255, 255, 0.76);
          line-height: 1.74;
        }

        .lva-policy-bullets {
          list-style: none;
          padding: 0;
          margin: 16px 0 0;
          display: grid;
          gap: 12px;
        }

        .lva-policy-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          line-height: 1.6;
        }

        .lva-policy-bullets svg {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          color: var(--brand);
          flex: 0 0 auto;
        }

        .lva-faq-item {
          width: 100%;
          padding: 0;
          background: rgba(255, 255, 255, 0.04);
          color: inherit;
          text-align: left;
          cursor: pointer;
          overflow: hidden;
        }

        .lva-section-cream .lva-faq-item {
          background: #ffffff;
          border-color: rgba(17, 17, 17, 0.08);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
        }

        .lva-faq-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 24px 26px;
        }

        .lva-faq-head span:first-child {
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.4;
        }

        .lva-faq-symbol {
          font-size: 1.6rem;
          line-height: 1;
        }

        .lva-faq-body {
          padding: 0 26px 24px;
          color: var(--muted);
        }

        .lva-footer {
          padding: 96px 0 36px;
          background: #000000;
          border-top: 1px solid var(--line);
        }

        .lva-footer-top {
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: start;
        }

        .lva-footer-logo {
          width: 216px;
          height: auto;
        }

        .lva-footer-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(120px, 1fr));
          gap: 34px;
        }

        .lva-footer-column h4 {
          margin: 0 0 16px;
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lva-footer-column a {
          display: block;
          margin-bottom: 12px;
          color: #8a8a8a;
        }

        .lva-footer-socials {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: flex-end;
        }

        .lva-social-link {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #171717;
          color: #ffffff;
          transition: background 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .lva-social-link:hover {
          background: #232323;
          color: var(--brand);
          transform: translateY(-1px);
        }

        .lva-social-link svg {
          width: 18px;
          height: 18px;
        }

        .lva-footer-bottom {
          margin-top: 62px;
          padding-top: 26px;
          border-top: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
          color: #7f7f7f;
          font-size: 0.9rem;
        }

        .lva-legal-links {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        @media (max-width: 1080px) {
          .lva-home-hero,
          .lva-hero-grid,
          .lva-plan-layout,
          .lva-footer-top,
          .lva-trust-layout,
          .lva-impulso-proposal-stage,
          .lva-grid-steps,
          .lva-grid-3,
          .lva-benefits-list,
          .lva-footer-grid,
          .lva-proposal-plan-layout {
            grid-template-columns: 1fr;
          }

          .lva-footer-socials {
            justify-content: flex-start;
          }

          .lva-home-hero {
            min-height: 78vh;
          }

          .lva-impulso-hero-inner {
            min-height: 78vh;
          }

          .lva-policy-card {
            grid-template-columns: 1fr;
          }

          .lva-plan-policy-banner {
            flex-direction: column;
            align-items: flex-start;
          }

          .lva-logo-grid,
          .lva-impulso-format-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 860px) {
          .lva-topbar-inner {
            min-height: auto;
            padding: 16px 0 20px;
            flex-direction: column;
            align-items: flex-start;
          }

          .lva-nav {
            display: none;
          }

          .lva-topbar-proposal .lva-topbar-inner {
            flex-direction: row;
            align-items: center;
          }

          .lva-topbar-proposal .lva-header-action {
            width: auto;
          }

          .lva-header-action {
            width: 100%;
          }
        }

        @media (max-width: 760px) {
          .lva-shell {
            width: min(100% - 28px, 1120px);
          }

          .lva-brand img,
          .lva-footer-logo {
            width: 182px;
          }

          .lva-hero {
            padding: 64px 0 54px;
          }

          .lva-home-hero,
          .lva-impulso-hero-inner,
          .lva-proposal-cover-inner {
            min-height: calc(100vh - 78px);
            padding: 78px 0 70px;
          }

          .lva-home-hero-section {
          }

          .lva-home-hero-section::before {
            background-position: 40% center;
          }

          .lva-impulso-hero-section::before {
            background-position: 36% center;
          }

          .lva-proposal-cover::before {
            background-position: 58% center;
          }

          .lva-section {
            padding: 76px 0;
          }

          .lva-impulso-proposal-stage {
            min-height: 360px;
            padding: 34px 28px;
            align-items: flex-end;
          }

          .lva-logo-grid,
          .lva-impulso-format-grid {
            grid-template-columns: 1fr;
          }

          .lva-proposal-footer-top,
          .lva-proposal-store-row {
            align-items: flex-start;
          }

          .lva-proposal-sheet {
            padding: 32px 24px;
            border-radius: 28px;
          }

          .lva-topbar-proposal .lva-brand img {
            width: 184px;
          }

          .lva-hero-card,
          .lva-simple-card,
          .lva-step-card,
          .lva-plan-card,
          .lva-plan-side,
          .lva-faq-item {
            border-radius: 24px;
          }

          .lva-note-band-inner {
            align-items: flex-start;
            flex-direction: column;
          }

          .lva-actions-row {
            flex-direction: column;
            align-items: stretch;
          }

          .lva-button,
          .lva-button-secondary {
            width: 100%;
          }
        }
      `}</style>

      <div className="lva-page">
        <header className={`lva-topbar ${isProposalPage ? 'lva-topbar-proposal' : ''}`}>
          <div className="lva-shell lva-topbar-inner">
            <a className="lva-brand" href={ROOT_ROUTE} aria-label="La Voz Salsa para Artistas">
              <img src={isProposalPage ? PROPOSAL_BRAND_LOGO_SRC : BRAND_LOGO_SRC} alt={isProposalPage ? 'La Voz Salsa' : 'La Voz Salsa para Artistas'} />
            </a>

            <nav className="lva-nav" aria-label="Navegación principal">
              {navLinks.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            {!isProposalPage ? (
              <a className="lva-header-action" href={isPolicyPage ? ROOT_ROUTE : isImpulsoPage ? WHATSAPP_PROPOSAL_URL : PANEL_URL}>
                {isPolicyPage ? 'Volver al plan' : isImpulsoPage ? 'Hablemos de tu proyecto' : 'Únete ahora'}
              </a>
            ) : null}
          </div>
        </header>

        <main>{isProposalPage ? <ProposalPage /> : isPolicyPage ? <PolicyPage /> : isImpulsoPage ? <ImpulsoPage /> : <ArtistPage />}</main>

        {isProposalPage ? <ProposalFooter /> : <SiteFooter />}
      </div>
    </>
  );
}
