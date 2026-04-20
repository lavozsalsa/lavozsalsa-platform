import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const APP_URL = 'https://app.lavozsalsa.com/';
const SITE_URL = 'https://www.lavozsalsa.com/';
const CONTACT_URL = 'https://www.lavozsalsa.com/contacto/';
const RADIO_URL = 'https://www.lavozsalsa.com/senal-en-vivo-la-voz-salsa/';
const STREAMING_URL = 'https://lavozsalsa.co/';
const LINKTREE_URL = 'https://linktr.ee/lavozsalsa';

const TOPBAR_LOGO_SRC = '/brand/logo-lavozsalsa-dotcom-white.png';
const ISOTYPE_LOGO_SRC = '/brand/logo-isotipo-lavozsalsa.png';
const HUB_LOGO_SRC = '/brand/logo-hub-salsa.png';
const HERO_WORDMARK_SRC = '/brand/logo-wordmark-lavozsalsa-white.png';
const FINAL_COVER_LOGO_SRC = '/brand/logo-lavozsalsa-cover-black-horizontal.png';
const HERO_IMAGE_SRC = '/media/hero-portada-lavozsalsa.jpg';
const ECOSYSTEM_BG_SRC = '/media/fondo-ecosistema-digital.jpg';
const METRICS_BG_SRC = '/media/metrics-audience-bg.jpeg';
const BRANDS_BG_SRC = '/media/integrations-bg.jpg';
const STUDIO_IMAGE_SRC = '/media/studio-lavozsalsa.jpeg';
const COMMUNITY_IMAGE_SRC = '/media/community-block.jpeg';
const ARTWORK_IMAGE_SRC = '/media/home-hero-salsa.jpeg';
const PLATFORM_LOGOS_BASE = '/media/platform-logos';
const WHATSAPP_URL = 'https://wa.me/573164338591';
const COMMERCIAL_EMAIL = 'comercial@lavozsalsa.com';

const navLinks = [
  { label: 'Ecosistema', href: '#ecosistema' },
  { label: 'Audiencia', href: '#metricas' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Planes', href: '#planes' },
];

const ecosystemNodes = [
  {
    key: 'social',
    icon: 'share-alt',
    iconColor: '#fff3eb',
    title: 'Redes',
    copy: 'Conversación, comunidad y visibilidad orgánica.',
    statValue: '240 k',
    statLabel: 'seguidores',
    position: 'social',
    tone: 'ember',
  },
  {
    key: 'radio',
    icon: 'broadcast-tower',
    iconColor: '#ff7a7f',
    title: 'Radio online',
    copy: 'Señal 24/7 y hábito diario en la audiencia salsera.',
    statValue: '15 k',
    statLabel: 'oyentes',
    position: 'radio',
    tone: 'dark',
  },
  {
    key: 'live',
    icon: 'video',
    iconColor: '#ffffff',
    title: 'Live streaming',
    copy: 'Contenido en vivo, chat e integraciones de marca.',
    statValue: '5 k',
    statLabel: null,
    position: 'live',
    tone: 'red',
  },
  {
    key: 'web',
    icon: 'globe',
    iconColor: '#ff7a7f',
    title: 'Sitio web',
    copy: 'Hub oficial con tráfico, contenido y conversión.',
    statValue: '91 k',
    statLabel: 'views',
    position: 'web',
    tone: 'dark',
  },
  {
    key: 'app',
    icon: 'mobile-alt',
    iconColor: '#fff1e8',
    title: 'App',
    copy: 'Escucha móvil en Google Play y App Store.',
    statValue: '12 k',
    statLabel: 'descargas',
    position: 'app',
    tone: 'ember',
  },
  {
    key: 'events',
    icon: 'calendar-alt',
    iconColor: '#ffffff',
    title: 'Eventos',
    copy: 'Activaciones, presencia física y respaldo de comunidad.',
    statValue: null,
    statLabel: null,
    position: 'events',
    tone: 'red',
  },
];

const audienceCountryData = [
  { label: 'Colombia', value: '', amount: 2400 },
  { label: 'Venezuela', value: '', amount: 2100 },
  { label: 'Ecuador', value: '', amount: 1200 },
  { label: 'Perú', value: '', amount: 712 },
  { label: 'República Dominicana', value: '', amount: 689 },
  { label: 'México', value: '', amount: 603 },
  { label: 'Estados Unidos', value: '', amount: 525 },
];

const audienceCityData = [
  { label: 'Medellín', value: '', amount: 736 },
  { label: 'Bogotá', value: '', amount: 581 },
  { label: 'Cali', value: '', amount: 565 },
  { label: 'Manizales', value: '', amount: 316 },
  { label: 'Caracas', value: '', amount: 310 },
  { label: 'Santo Domingo', value: '', amount: 297 },
  { label: 'Lima', value: '', amount: 252 },
  { label: 'Guayaquil', value: '', amount: 173 },
];

const audienceAgeData = [
  { label: '25 a 34', value: '', amount: 37.4 },
  { label: '35 a 44', value: '', amount: 27.1 },
  { label: '18 a 24', value: '', amount: 20.6 },
  { label: '45 a 54', value: '', amount: 10.9 },
  { label: '55 +', value: '', amount: 4.0 },
];

const audienceInterestData = [
  {
    label: 'Technology/Technophiles',
    tone: 'blue',
    shape: 'dot',
  },
  {
    label: 'News & Politics/Avid News Readers',
    tone: 'green',
    shape: 'square',
  },
  {
    label: 'Media & Entertainment/Music Lovers/World Music Fans',
    tone: 'orange',
    shape: 'diamond',
  },
  {
    label: 'Sports & Fitness/Sports Fans/Soccer',
    tone: 'navy',
    shape: 'triangle',
  },
];

const brandOptions = [
  {
    icon: 'mic',
    title: 'Menciones al aire',
    copy: 'La marca entra en voz y contexto dentro del programa.',
  },
  {
    icon: 'ad',
    title: 'Cuñas y piezas de audio',
    copy: 'Mensajes breves para frecuencia y recordación.',
  },
  {
    icon: 'video',
    title: 'Videos de marca',
    copy: 'Presencia visual en transmisiones y piezas especiales.',
  },
  {
    icon: 'brand',
    title: 'Patrocinios de programa',
    copy: 'Asociación con formatos que ya tienen audiencia.',
  },
  {
    icon: 'event',
    title: 'Eventos y activaciones',
    copy: 'Visibilidad física en experiencias y activaciones.',
  },
  {
    icon: 'chat',
    title: 'Integraciones más orgánicas',
    copy: 'La marca aparece donde la comunidad conversa.',
  },
];

const brandAccessPills = ['Audio y menciones', 'Video y streaming', 'Eventos y activaciones', 'Patrocinios', 'Chat en vivo'];

const commercialPlanGroups = [
  {
    key: 'starter',
    eyebrow: 'Planes de entrada',
    title: 'Opciones para comenzar a sonar.',
    copy: 'Alternativas de entrada para marcas que quieren presencia constante en radio, digital o ambos frentes.',
    plans: [
      {
        name: 'Presencia Start',
        price: '$1.200.000',
        priceLabel: 'valor mensual sugerido',
        summary: 'Entrada comercial para comenzar con visibilidad en radio y redes.',
        channels: ['Radio', 'Redes'],
        items: [
          '80 impactos al mes con cuñas de 30 segundos',
          '4 impactos diarios de lunes a viernes',
          '1 historia y 1 publicación de apoyo al mes',
        ],
        noteLabel: 'Nota',
        note: 'Material en audio y video aportado por el cliente.',
      },
      {
        name: 'Solo Radio',
        price: '$900.000',
        priceLabel: 'valor mensual sugerido',
        summary: 'Pauta enfocada exclusivamente en programación musical.',
        channels: ['Radio'],
        items: [
          '100 impactos al mes con cuñas de 30 segundos',
          '5 impactos diarios de lunes a viernes',
          'Presencia radial sin acciones digitales adicionales',
        ],
        noteLabel: 'Nota',
        note: 'La producción de la cuña no está incluida, salvo acuerdo adicional.',
      },
      {
        name: 'Digital de Marca',
        price: '$1.500.000',
        priceLabel: 'valor mensual sugerido',
        summary: 'Visibilidad digital con live streaming, redes y contenido de apoyo.',
        channels: ['Live', 'Redes', 'Email'],
        items: [
          '2 menciones de marca en live streaming',
          '2 historias con enlace y 1 reel en colaboración',
          'Presencia en una pieza visual especial y en un boletín',
        ],
        noteLabel: 'Nota',
        note: 'Material en audio y video aportado por el cliente.',
      },
    ],
  },
  {
    key: 'growth',
    eyebrow: 'Planes de crecimiento',
    title: 'Más frecuencia, más mezcla, más presencia.',
    copy: 'Propuestas para marcas que buscan mayor intensidad en radio, live streaming, redes y patrocinio.',
    plans: [
      {
        name: 'Presencia Plus',
        price: '$1.800.000',
        priceLabel: 'valor mensual sugerido',
        summary: 'Opción intermedia con más frecuencia e impacto comercial.',
        channels: ['Radio', 'Live', 'Redes', 'Email'],
        items: [
          '120 impactos al mes con cuñas de 30 segundos',
          '1 mención de marca en live streaming de los martes',
          '2 historias, 1 reel o publicación colaborativa y boletín',
        ],
        noteLabel: 'Nota',
        note: 'Material en audio y video aportado por el cliente.',
      },
      {
        name: 'Radio + Live',
        price: '$2.200.000',
        priceLabel: 'valor mensual sugerido',
        summary: 'Exposición radial unida a presencia dentro de programas en vivo.',
        channels: ['Radio', 'Live', 'Redes'],
        items: [
          '120 impactos radiales al mes',
          '2 menciones de marca en live streaming de los martes',
          '1 intervención especial en vivo, 1 historia y 1 reel de apoyo',
        ],
        noteLabel: 'Nota',
        note: 'Material en audio y video aportado por el cliente.',
      },
      {
        name: 'Presencia 360',
        price: '$3.000.000',
        priceLabel: 'valor mensual',
        summary: 'Solución integral para posicionar la marca en todo el ecosistema.',
        channels: ['Radio', 'Live', 'Redes', 'Email', 'Patrocinio', 'Visual'],
        items: [
          '200 impactos al mes más 2 cuñas bonificadas diarias',
          '3 menciones en live, 1 publirreportaje e invitación de marca',
          '2 historias, 1 reel, boletín masivo y patrocinio de programa',
          'Presencia visual en transmisiones y piezas especiales',
        ],
        noteLabel: 'Nota',
        note: 'Material en audio y video aportado por el cliente.',
        featured: true,
      },
    ],
  },
  {
    key: 'remote',
    eyebrow: 'Activaciones remotas',
    title: 'La emisora en el punto de venta.',
    copy: 'Formatos presenciales para mover tráfico, expectativa y conversación alrededor de la marca.',
    plans: [
      {
        name: 'Remota Express',
        price: '$1.600.000',
        priceLabel: 'valor sugerido',
        summary: 'Versión corta y accesible para activar marca en punto comercial.',
        channels: ['En vivo', 'Radio', 'Instagram'],
        items: [
          '1 hora en el punto del aliado',
          '3 salidas al aire en vivo',
          '5 menciones previas y 1 historia en Instagram',
        ],
        noteLabel: 'Objetivo',
        note: 'Generar expectativa, tráfico al punto y conocimiento de marca.',
      },
      {
        name: 'Remota 2H',
        price: '$2.500.000',
        priceLabel: 'valor',
        summary: 'Mayor tiempo de presencia y campaña previa más robusta.',
        channels: ['En vivo', 'Radio', 'Instagram'],
        items: [
          '2 horas en el punto del aliado',
          '6 salidas al aire en vivo',
          'Campaña previa de 8 días con 10 menciones, 1 historia y 1 reel',
        ],
        noteLabel: 'Objetivo',
        note: 'Invitar a conocer, visitar y comprar los productos del aliado.',
      },
      {
        name: 'Remota Premium',
        price: '$3.500.000',
        priceLabel: 'valor sugerido',
        summary: 'Experiencia de mayor exposición antes, durante y después del evento.',
        channels: ['En vivo', 'Radio', 'Instagram', 'Colaboración'],
        items: [
          '3 horas en el punto del aliado',
          '8 salidas al aire en vivo',
          'Campaña previa de 8 días con 12 menciones, 2 historias y 1 reel',
          'Historia y publicación de cierre postevento',
        ],
        noteLabel: 'Objetivo',
        note: 'Maximizar visibilidad, tráfico y recordación de marca.',
        featured: true,
      },
    ],
  },
];

const platformLogos = [
  {
    label: 'Instagram',
    style: 'instagram',
    src: `${PLATFORM_LOGOS_BASE}/instagram-wordmark.png`,
    href: 'https://www.instagram.com/lavozsalsa',
    metric: '70 k',
    metricLabel: 'seguidores',
  },
  {
    label: 'TikTok',
    style: 'tiktok',
    src: `${PLATFORM_LOGOS_BASE}/tiktok-wordmark.png`,
    href: 'https://www.tiktok.com/@lavozsalsa',
    metric: '130 k',
    metricLabel: 'seguidores',
  },
  {
    label: 'Facebook',
    style: 'facebook',
    src: `${PLATFORM_LOGOS_BASE}/facebook-wordmark.png`,
    href: 'https://www.facebook.com/Lavozsalsa',
    metric: '27 k',
    metricLabel: 'me gusta',
  },
  {
    label: 'YouTube',
    style: 'youtube',
    src: `${PLATFORM_LOGOS_BASE}/youtube-wordmark.png`,
    href: 'https://www.youtube.com/@lavozsalsa',
    metric: '17 k',
    metricLabel: 'suscriptores',
  },
  {
    label: 'X',
    style: 'x',
    src: `${PLATFORM_LOGOS_BASE}/x-wordmark.png`,
    href: 'https://x.com/lavozsalsa',
    metric: '1.5 k',
    metricLabel: 'seguidores',
  },
  {
    label: 'Spotify',
    style: 'spotify',
    src: `${PLATFORM_LOGOS_BASE}/spotify-wordmark.png`,
    href: 'https://open.spotify.com/playlist/5tuXPSYWQB4clrYVQovZ9d?si=sDKQlerSRAO8U9vvnBAwCA&pi=f9YAJR3PSf-It&nd=1&dlsi=6dd3d47d00184b26',
    metric: '1 k',
    metricLabel: 'guardados',
  },
];

const heroFooterItems = ['Radio online', 'Live streaming', 'App', 'Web', 'Redes', 'Eventos'];
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 18 18 6M10 6h8v8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function PlatformLogo({ item }: { item: (typeof platformLogos)[number] }) {
  return <img className={`lvs-platform-logo-image lvs-platform-logo-image--${item.style}`} src={item.src} alt={item.label} />;
}

function FinalSocialLogo({ item }: { item: (typeof platformLogos)[number] }) {
  return (
    <a className={`lvs-final-social-link lvs-final-social-link--${item.style}`} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} title={item.label}>
      <img className={`lvs-final-social-logo lvs-final-social-logo--${item.style}`} src={item.src} alt={item.label} />
    </a>
  );
}

function PlatformLogoItem({ item }: { item: (typeof platformLogos)[number] }) {
  const logo = <PlatformLogo item={item} />;
  const ariaLabel = item.metric && item.metricLabel ? `${item.label}: ${item.metric} ${item.metricLabel}` : item.label;

  return (
    <div className={`lvs-platform-logo-item lvs-platform-logo-item--${item.style}`}>
      <span className={`lvs-platform-logo-metric ${item.metric ? '' : 'lvs-platform-logo-metric--empty'}`} aria-hidden={!item.metric}>
        {item.metric ?? ' '}
      </span>

      {item.href ? (
        <a
          className="lvs-platform-logo-link"
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={ariaLabel}
          title={ariaLabel}
        >
          {logo}
        </a>
      ) : (
        <span className="lvs-platform-logo-link lvs-platform-logo-link--static" aria-label={ariaLabel} title={ariaLabel}>
          {logo}
        </span>
      )}
    </div>
  );
}

function AudienceBarCard({
  icon,
  eyebrow,
  title,
  source,
  note,
  items,
  showValues = true,
  wide = false,
}: {
  icon: string;
  eyebrow: string;
  title: string;
  source?: string;
  note?: string;
  items: Array<{ label: string; value: string; amount: number }>;
  showValues?: boolean;
  wide?: boolean;
}) {
  const maxAmount = Math.max(...items.map((item) => item.amount));

  return (
    <article className={`lvs-audience-card ${wide ? 'lvs-audience-card--wide' : ''}`}>
      <div className="lvs-audience-card-head">
        <div className="lvs-audience-card-icon" aria-hidden="true">
          <FontAwesome5 name={icon} size={19} color="#ff2b32" />
        </div>

        <div className="lvs-audience-card-heading">
          <span className="lvs-audience-card-eyebrow">{eyebrow}</span>
          <h3>{title}</h3>
        </div>
      </div>

      <div className="lvs-audience-bar-list">
        {items.map((item) => (
          <div key={`${title}-${item.label}`} className="lvs-audience-bar-row">
            <div className={`lvs-audience-bar-meta ${showValues ? '' : 'lvs-audience-bar-meta--single'}`}>
              <span>{item.label}</span>
              {showValues ? <strong>{item.value}</strong> : null}
            </div>

            <div className="lvs-audience-bar-track" aria-hidden="true">
              <span style={{ width: `${(item.amount / maxAmount) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      {source ? <div className="lvs-audience-card-source">{source}</div> : null}
      {note ? <p className="lvs-audience-card-note">{note}</p> : null}
    </article>
  );
}

function AudienceInterestCard({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: Array<{ label: string; tone: string; shape: string }>;
}) {
  return (
    <article className="lvs-audience-card">
      <div className="lvs-audience-card-head">
        <div className="lvs-audience-card-icon" aria-hidden="true">
          <FontAwesome5 name="star" size={19} color="#ff2b32" />
        </div>

        <div className="lvs-audience-card-heading">
          <span className="lvs-audience-card-eyebrow">{eyebrow}</span>
          <h3>{title}</h3>
        </div>
      </div>

      <div className="lvs-interest-list">
        {items.map((item) => (
          <div key={item.label} className="lvs-interest-item">
            <span
              className={`lvs-interest-marker lvs-interest-marker--${item.shape} lvs-interest-marker--${item.tone}`}
              aria-hidden="true"
            />
            <span className="lvs-interest-label">{item.label}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function CommercialPlanCard({
  plan,
}: {
  plan: {
    name: string;
    price: string;
    priceLabel: string;
    summary: string;
    channels: string[];
    items: string[];
    noteLabel: string;
    note: string;
    featured?: boolean;
  };
}) {
  return (
    <article className={`lvs-plan-card ${plan.featured ? 'lvs-plan-card--featured' : ''}`}>
      <div className="lvs-plan-card-top">
        <div>
          <h4>{plan.name}</h4>
          <p className="lvs-plan-summary">{plan.summary}</p>
        </div>

        <div className="lvs-plan-price-wrap">
          <span className="lvs-plan-price-label">{plan.priceLabel}</span>
          <strong className="lvs-plan-price">{plan.price}</strong>
        </div>
      </div>

      <div className="lvs-plan-tags">
        {plan.channels.map((item) => (
          <span key={`${plan.name}-${item}`} className="lvs-plan-tag">
            {item}
          </span>
        ))}
      </div>

      <ul className="lvs-plan-list">
        {plan.items.map((item) => (
          <li key={`${plan.name}-${item}`}>{item}</li>
        ))}
      </ul>

      <div className="lvs-plan-note">
        <strong>{plan.noteLabel}:</strong> {plan.note}
      </div>
    </article>
  );
}

function Icon({ name }: { name: string }) {
  switch (name) {
    case 'radio':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 10h10a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Zm2 3.8A1.8 1.8 0 1 0 9 17.4a1.8 1.8 0 0 0 0-3.6ZM13 14h4v1.8h-4V14ZM8 4l8 3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    case 'stream':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V5m0 0-3 3m3-3 3 3M5 12a7 7 0 0 1 14 0M2 12a10 10 0 0 1 20 0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    case 'app':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9 2h6m-9 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm6 12h.01"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    case 'social':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm10-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM17 14a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM9.5 10.5l5-3M9.5 13.5l5 3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    case 'web':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11ZM4 9h16M12 9v11M7.5 4c1.4 1.8 2.2 3.7 2.5 5M16.5 4c-1.4 1.8-2.2 3.7-2.5 5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    case 'mic':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 16a4 4 0 0 0 4-4V7a4 4 0 1 0-8 0v5a4 4 0 0 0 4 4Zm0 0v4m-4 0h8M5 11a7 7 0 0 0 14 0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    case 'ad':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 12V9a2 2 0 0 1 2-2h2l7-3v16l-7-3H6a2 2 0 0 1-2-2v-3Zm13-4h1a3 3 0 0 1 0 6h-1"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    case 'video':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1l4-2v12l-4-2v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    case 'brand':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 4h10l3 4-8 12L4 8l3-4Zm0 0 5 16m5-16-5 16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    case 'event':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 3v4M17 3v4M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm3 8 2 2 4-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    case 'chat':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 8h10M7 12h7m-9 8 1.7-3H18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7a3 3 0 0 0 2 2.8V20Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    default:
      return null;
  }
}

function App() {
  return (
    <>
      <StatusBar style="light" />
      <style>{`
        :root {
          color-scheme: dark;
          --bg: #050506;
          --bg-soft: #0d0d10;
          --bg-panel: #141417;
          --bg-panel-strong: #19191d;
          --ink: #141414;
          --text: #f7f3ef;
          --muted: #c2bbb5;
          --muted-strong: #9d948d;
          --cream: #f4eee8;
          --cream-strong: #fff8f3;
          --red: #ff2b32;
          --red-deep: #9d0f17;
          --red-soft: rgba(255, 43, 50, 0.14);
          --line: rgba(255, 255, 255, 0.12);
          --line-soft: rgba(255, 255, 255, 0.08);
          --radius-xl: 40px;
          --radius-lg: 28px;
          --radius-md: 22px;
          --shadow-soft: 0 32px 90px rgba(0, 0, 0, 0.32);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: var(--bg);
          color: var(--text);
          font-family: 'LVS Gotham Book', Arial, sans-serif;
        }

        a { color: inherit; text-decoration: none; }
        button { font: inherit; }

        @font-face {
          font-family: 'LVS Gotham Book';
          src: url('/fonts/GothamBook.ttf') format('truetype');
          font-display: swap;
        }

        @font-face {
          font-family: 'LVS Gotham Medium';
          src: url('/fonts/GothamMedium.ttf') format('truetype');
          font-display: swap;
        }

        @font-face {
          font-family: 'LVS Gotham Bold';
          src: url('/fonts/GothamBold.ttf') format('truetype');
          font-display: swap;
        }

        @font-face {
          font-family: 'LVS Gotham Black';
          src: url('/fonts/GothamBlack.otf') format('opentype');
          font-display: swap;
        }

        #root { min-height: 100vh; }

        .lvs-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(255, 43, 50, 0.18), transparent 26%),
            radial-gradient(circle at 85% 12%, rgba(255, 43, 50, 0.16), transparent 24%),
            linear-gradient(180deg, #050506 0%, #070709 26%, #09090b 100%);
        }

        .lvs-shell {
          width: min(1460px, calc(100vw - 56px));
          margin: 0 auto;
        }

        .lvs-topbar {
          display: none;
        }

        .lvs-topbar-inner {
          min-height: 86px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .lvs-brand img {
          width: 184px;
          display: block;
        }

        .lvs-nav {
          display: flex;
          align-items: center;
          gap: 24px;
          color: rgba(255, 255, 255, 0.76);
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          font-size: 0.98rem;
        }

        .lvs-nav a:hover {
          color: #ffffff;
        }

        .lvs-topbar-cta,
        .lvs-primary-button,
        .lvs-secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 54px;
          padding: 0 24px;
          border-radius: 999px;
          border: 1px solid transparent;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
        }

        .lvs-topbar-cta,
        .lvs-primary-button {
          background: var(--cream-strong);
          color: var(--ink);
        }

        .lvs-secondary-button {
          background: transparent;
          color: var(--text);
          border-color: rgba(255, 255, 255, 0.18);
        }

        .lvs-topbar-cta:hover,
        .lvs-primary-button:hover,
        .lvs-secondary-button:hover,
        .lvs-link-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 42px rgba(255, 43, 50, 0.22);
        }

        .lvs-secondary-button:hover {
          border-color: rgba(255, 43, 50, 0.48);
          color: #ffffff;
        }

        .lvs-button-icon {
          width: 20px;
          height: 20px;
        }

        .lvs-section {
          padding: 110px 0;
        }

        .lvs-section-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 440px);
          gap: 30px;
          align-items: end;
          margin-bottom: 40px;
        }

        .lvs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #ffb4b7;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 0.78rem;
        }

        .lvs-eyebrow::before {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--red);
          box-shadow: 0 0 0 6px rgba(255, 43, 50, 0.15);
        }

        .lvs-section-title {
          margin: 16px 0 0;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(2.5rem, 5vw, 4.8rem);
          line-height: 0.95;
          letter-spacing: -0.05em;
          max-width: 11ch;
        }

        .lvs-metrics-title .lvs-metrics-title-line {
          display: block;
        }

        .lvs-metrics-title {
          max-width: 11.5ch;
        }

        .lvs-metrics-highlight {
          color: var(--red);
        }

        .lvs-section-intro {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.78;
          font-size: 1.02rem;
        }

        .lvs-section-intro strong {
          color: var(--red);
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-weight: 700;
        }

        .lvs-hero {
          position: relative;
          overflow: hidden;
          padding: 0;
          background:
            linear-gradient(90deg, rgba(255, 27, 36, 0.2) 0%, rgba(255, 27, 36, 0.08) 44%, rgba(76, 4, 8, 0.24) 100%),
            url('${HERO_IMAGE_SRC}') center center / cover no-repeat;
        }

        .lvs-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(255, 30, 38, 0.06) 0%, rgba(255, 30, 38, 0.02) 46%, rgba(67, 0, 5, 0.58) 100%);
          pointer-events: none;
        }

        .lvs-hero-layout {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: flex-start;
          align-items: stretch;
          min-height: 100vh;
        }

        .lvs-hero-copy {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          width: min(48vw, 700px);
          margin-left: 0;
          padding: 80px 0 58px 1.8vw;
          text-align: left;
        }

        .lvs-hero-copy-top {
          width: min(100%, 640px);
          margin-left: 0;
          margin-top: auto;
          margin-bottom: auto;
        }

        .lvs-hero-wordmark {
          width: min(100%, 232px);
          display: block;
          margin: 0 auto 28px 0;
        }

        .lvs-hero-title {
          margin: 0;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(5rem, 8vw, 8.6rem);
          line-height: 0.86;
          letter-spacing: -0.06em;
          color: #ffffff;
        }

        .lvs-hero-title span {
          display: block;
        }

        .lvs-hero-title span:last-child {
          margin-top: 6px;
        }

        .lvs-hero-subtitle {
          margin: 28px 0 0 0;
          max-width: none;
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          font-size: clamp(1.18rem, 1.34vw, 1.5rem);
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.92);
          text-align: left;
          white-space: nowrap;
        }

        .lvs-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 28px;
        }

        .lvs-hero-pills,
        .lvs-platform-pills,
        .lvs-community-pills,
        .lvs-card-points {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .lvs-hero-pills {
          margin-top: 24px;
        }

        .lvs-pill {
          display: inline-flex;
          align-items: center;
          min-height: 42px;
          padding: 0 16px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.78);
          font-size: 0.9rem;
        }

        .lvs-hero-media {
          display: none;
        }

        .lvs-hero-footer {
          position: absolute;
          left: 1.8vw;
          right: 0;
          bottom: 58px;
          width: min(100%, 680px);
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 18px;
          padding-top: 38px;
          color: rgba(255, 255, 255, 0.88);
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          font-size: 1.08rem;
          letter-spacing: 0.02em;
        }

        .lvs-hero-footer-item {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 18px;
        }

        .lvs-hero-footer-item:not(:first-child)::before {
          content: '•';
          position: absolute;
          left: -12px;
          color: rgba(255, 255, 255, 0.42);
        }

        .lvs-section--ecosystem {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #080809 0%, #050506 100%);
        }

        .lvs-section--ecosystem::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(3, 3, 4, 0.9) 0%, rgba(7, 7, 8, 0.72) 34%, rgba(8, 8, 9, 0.52) 56%, rgba(5, 5, 6, 0.88) 100%),
            linear-gradient(180deg, rgba(7, 7, 8, 0.16) 0%, rgba(7, 7, 8, 0.82) 100%),
            url('${ECOSYSTEM_BG_SRC}') center center / cover no-repeat;
          opacity: 1;
          pointer-events: none;
        }

        .lvs-section--metrics {
          position: relative;
          overflow: hidden;
        }

        .lvs-section--metrics::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(8, 8, 10, 0.95) 0%, rgba(8, 8, 10, 0.91) 36%, rgba(8, 8, 10, 0.86) 100%),
            linear-gradient(180deg, rgba(255, 43, 50, 0.05), rgba(255, 43, 50, 0.02)),
            url('${METRICS_BG_SRC}') right center / cover no-repeat;
          opacity: 0.34;
          pointer-events: none;
        }

        .lvs-section--metrics > .lvs-shell {
          position: relative;
          z-index: 1;
        }

        .lvs-section--audience {
          position: relative;
          overflow: hidden;
          color: var(--ink);
          background:
            radial-gradient(circle at top right, rgba(255, 43, 50, 0.09), transparent 24%),
            radial-gradient(circle at bottom left, rgba(255, 43, 50, 0.07), transparent 22%),
            linear-gradient(180deg, #f8f3ee 0%, #efe7e0 100%);
        }

        .lvs-section--audience::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.56), rgba(255, 255, 255, 0.1)),
            linear-gradient(90deg, rgba(255, 43, 50, 0.03), transparent 30%, transparent 70%, rgba(255, 43, 50, 0.03));
          pointer-events: none;
        }

        .lvs-section--audience > .lvs-shell {
          position: relative;
          z-index: 1;
        }

        .lvs-section--audience .lvs-eyebrow {
          color: rgba(120, 18, 24, 0.84);
        }

        .lvs-section--audience .lvs-eyebrow::before {
          box-shadow: 0 0 0 6px rgba(255, 43, 50, 0.1);
        }

        .lvs-audience-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, 470px);
          gap: 34px;
          align-items: end;
          margin-bottom: 34px;
        }

        .lvs-audience-title {
          max-width: 12.4ch;
          color: var(--ink);
        }

        .lvs-audience-title-line {
          display: block;
        }

        .lvs-audience-intro {
          margin: 0;
          max-width: 34rem;
          color: rgba(20, 20, 20, 0.74);
          line-height: 1.8;
          font-size: 1.04rem;
        }

        .lvs-audience-intro strong {
          color: var(--red);
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-weight: 700;
        }

        .lvs-audience-highlight-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 24px;
        }

        .lvs-audience-highlight {
          min-height: 100%;
          padding: 24px 22px;
          border-radius: 28px;
          border: 1px solid rgba(20, 20, 20, 0.08);
          background: rgba(255, 255, 255, 0.84);
          box-shadow: 0 22px 58px rgba(18, 10, 10, 0.08);
        }

        .lvs-audience-highlight-top {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .lvs-audience-highlight-icon {
          width: 50px;
          height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: rgba(255, 43, 50, 0.09);
          color: var(--red);
        }

        .lvs-audience-highlight-copy strong {
          display: block;
          color: var(--ink);
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 1.14rem;
          line-height: 1.08;
        }

        .lvs-audience-highlight-copy span {
          display: block;
          margin-top: 8px;
          color: rgba(20, 20, 20, 0.62);
          line-height: 1.55;
          font-size: 0.94rem;
        }

        .lvs-audience-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .lvs-audience-card {
          padding: 26px 24px 24px;
          border-radius: 32px;
          border: 1px solid rgba(20, 20, 20, 0.08);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.9)),
            rgba(255, 255, 255, 0.92);
          box-shadow: 0 24px 62px rgba(18, 10, 10, 0.08);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .lvs-audience-card--wide {
          grid-column: 1 / -1;
        }

        .lvs-audience-card-head {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 22px;
        }

        .lvs-audience-card-icon {
          width: 56px;
          height: 56px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          background: rgba(255, 43, 50, 0.08);
          color: var(--red);
          flex: 0 0 auto;
        }

        .lvs-audience-card-eyebrow {
          display: block;
          color: rgba(157, 15, 23, 0.76);
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 0.76rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .lvs-audience-card-heading h3 {
          margin: 8px 0 0;
          color: var(--ink);
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 1.42rem;
          line-height: 1.04;
          letter-spacing: -0.03em;
        }

        .lvs-audience-bar-list {
          display: grid;
          gap: 14px;
        }

        .lvs-audience-bar-row {
          display: grid;
          gap: 8px;
        }

        .lvs-audience-bar-meta {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 14px;
        }

        .lvs-audience-bar-meta--single {
          justify-content: flex-start;
        }

        .lvs-audience-bar-meta span {
          color: rgba(20, 20, 20, 0.84);
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          font-size: 0.98rem;
          line-height: 1.25;
        }

        .lvs-audience-bar-meta strong {
          color: var(--ink);
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 0.98rem;
          line-height: 1;
          white-space: nowrap;
        }

        .lvs-audience-bar-track {
          height: 12px;
          border-radius: 999px;
          background: rgba(17, 17, 17, 0.08);
          overflow: hidden;
        }

        .lvs-audience-bar-track span {
          display: block;
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #ff3b41 0%, #b11119 100%);
          box-shadow: 0 0 18px rgba(255, 43, 50, 0.22);
        }

        .lvs-audience-card-source {
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid rgba(20, 20, 20, 0.08);
          color: rgba(157, 15, 23, 0.78);
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 0.76rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .lvs-audience-card-note {
          margin: 10px 0 0;
          color: rgba(20, 20, 20, 0.58);
          line-height: 1.55;
          font-size: 0.92rem;
        }

        .lvs-audience-footnote {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 20px;
        }

        .lvs-audience-footnote span {
          color: rgba(20, 20, 20, 0.56);
          line-height: 1.6;
          font-size: 0.9rem;
        }

        .lvs-interest-list {
          display: grid;
          gap: 18px;
          align-content: start;
          min-height: 100%;
        }

        .lvs-interest-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .lvs-interest-marker {
          position: relative;
          flex: 0 0 auto;
          display: inline-block;
        }

        .lvs-interest-marker--dot {
          width: 18px;
          height: 18px;
          border-radius: 999px;
        }

        .lvs-interest-marker--square {
          width: 18px;
          height: 18px;
          border-radius: 3px;
        }

        .lvs-interest-marker--diamond {
          width: 16px;
          height: 16px;
          transform: rotate(45deg);
          border-radius: 2px;
        }

        .lvs-interest-marker--triangle {
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 18px solid #1f2d8f;
        }

        .lvs-interest-marker--blue {
          background: #2e78dd;
        }

        .lvs-interest-marker--green {
          background: #6fa63a;
        }

        .lvs-interest-marker--orange {
          background: #e68e08;
        }

        .lvs-interest-marker--navy {
          background: #1f2d8f;
        }

        .lvs-interest-label {
          color: rgba(20, 20, 20, 0.86);
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          font-size: 1rem;
          line-height: 1.4;
        }

        .lvs-ecosystem-head {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 1;
          gap: 22px;
          max-width: 1040px;
          margin: 0 auto;
          text-align: center;
        }

        .lvs-ecosystem-head .lvs-section-title {
          max-width: none;
          font-size: clamp(2.8rem, 4.9vw, 5.4rem);
        }

        .lvs-ecosystem-title-line {
          display: block;
          white-space: nowrap;
        }

        .lvs-ecosystem-head .lvs-section-intro {
          max-width: 58rem;
          margin: 0;
          font-size: clamp(1.2rem, 1.55vw, 1.54rem);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.88);
        }

        .lvs-ecosystem-canvas {
          position: relative;
          z-index: 1;
          min-height: 780px;
          margin-top: 44px;
        }

        .lvs-ecosystem-canvas::before {
          content: '';
          position: absolute;
          inset: 11% 8% 8% 24%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 43, 50, 0.18) 0%, rgba(255, 43, 50, 0.08) 28%, rgba(255, 43, 50, 0) 68%);
          filter: blur(18px);
          pointer-events: none;
        }

        .lvs-ecosystem-orbit {
          position: absolute;
          border-radius: 999px;
          border: 1px dashed rgba(255, 255, 255, 0.12);
          opacity: 0.55;
        }

        .lvs-ecosystem-orbit--one {
          width: min(76vw, 980px);
          height: min(44vw, 560px);
          left: 15%;
          top: 13%;
        }

        .lvs-ecosystem-orbit--two {
          width: min(58vw, 720px);
          height: min(33vw, 420px);
          left: 28%;
          top: 24%;
        }

        .lvs-ecosystem-circle,
        .lvs-ecosystem-hub {
          position: absolute;
          border-radius: 999px;
          box-shadow: 0 24px 68px rgba(0, 0, 0, 0.34);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .lvs-ecosystem-circle {
          padding: 9px;
        }

        .lvs-ecosystem-hub {
          padding: 12px;
        }

        .lvs-ecosystem-circle::before,
        .lvs-ecosystem-hub::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
        }

        .lvs-ecosystem-circle-inner,
        .lvs-ecosystem-hub-inner {
          position: absolute;
          border-radius: inherit;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 12px;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .lvs-ecosystem-circle-inner {
          inset: 9px;
        }

        .lvs-ecosystem-hub-inner {
          inset: 12px;
          gap: 0;
          padding: 14px;
        }

        .lvs-ecosystem-circle--red::before {
          background: linear-gradient(145deg, rgba(255, 76, 82, 0.66), rgba(113, 11, 19, 0.7));
        }

        .lvs-ecosystem-circle--red .lvs-ecosystem-circle-inner {
          background: linear-gradient(180deg, rgba(255, 43, 50, 0.98), rgba(127, 8, 16, 0.92));
        }

        .lvs-ecosystem-circle--dark::before,
        .lvs-ecosystem-hub::before {
          background: linear-gradient(145deg, rgba(255, 43, 50, 0.44), rgba(17, 17, 18, 0.92));
        }

        .lvs-ecosystem-circle--dark .lvs-ecosystem-circle-inner,
        .lvs-ecosystem-hub-inner {
          background: linear-gradient(180deg, rgba(13, 13, 14, 0.96), rgba(8, 8, 9, 0.98));
        }

        .lvs-ecosystem-circle--ember::before {
          background: linear-gradient(145deg, rgba(255, 94, 100, 0.64), rgba(38, 16, 18, 0.92));
        }

        .lvs-ecosystem-circle--ember .lvs-ecosystem-circle-inner {
          background: linear-gradient(180deg, rgba(58, 17, 20, 0.96), rgba(15, 10, 11, 0.98));
        }

        .lvs-ecosystem-circle strong,
        .lvs-ecosystem-hub strong {
          display: block;
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          font-size: 1.34rem;
          line-height: 0.98;
          letter-spacing: -0.04em;
          max-width: 8ch;
        }

        .lvs-ecosystem-circle span,
        .lvs-ecosystem-hub span {
          display: block;
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          font-size: 0.95rem;
          line-height: 1.38;
          max-width: 18ch;
          color: rgba(255, 255, 255, 0.78);
        }

        .lvs-ecosystem-hub {
          width: 312px;
          height: 312px;
          left: 52%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .lvs-ecosystem-hub::after {
          content: '';
          position: absolute;
          inset: -22px;
          border-radius: inherit;
          border: 1px solid rgba(255, 255, 255, 0.14);
          opacity: 0.36;
        }

        .lvs-ecosystem-hub strong {
          font-size: 2.18rem;
          max-width: none;
        }

        .lvs-ecosystem-hub span {
          max-width: 19ch;
        }

        .lvs-ecosystem-core-logo {
          width: 114%;
          max-width: 322px;
          max-height: 214px;
          height: auto;
          display: block;
          object-fit: contain;
        }

        .lvs-ecosystem-circle-icon {
          width: 66px;
          height: 66px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
        }

        .lvs-ecosystem-circle--red .lvs-ecosystem-circle-icon {
          background: rgba(255, 255, 255, 0.12);
        }

        .lvs-ecosystem-circle--dark .lvs-ecosystem-circle-icon {
          background: rgba(255, 43, 50, 0.14);
          border: 1px solid rgba(255, 43, 50, 0.18);
        }

        .lvs-ecosystem-circle--ember .lvs-ecosystem-circle-icon {
          background: rgba(255, 92, 98, 0.14);
          border: 1px solid rgba(255, 92, 98, 0.18);
        }

        .lvs-ecosystem-circle--social {
          width: 170px;
          height: 170px;
          left: 18%;
          top: 9%;
        }

        .lvs-ecosystem-circle--live {
          width: 188px;
          height: 188px;
          left: 39%;
          top: 1%;
        }

        .lvs-ecosystem-circle--radio {
          width: 192px;
          height: 192px;
          left: 7%;
          top: 41%;
        }

        .lvs-ecosystem-circle--app {
          width: 176px;
          height: 176px;
          left: 27%;
          bottom: 8%;
        }

        .lvs-ecosystem-circle--events {
          width: 156px;
          height: 156px;
          right: 17%;
          top: 11%;
        }

        .lvs-ecosystem-circle--web {
          width: 230px;
          height: 230px;
          right: 6%;
          top: 40%;
        }

        .lvs-ecosystem-platforms {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: flex-end;
          gap: 18px;
          width: fit-content;
          max-width: 100%;
          margin: 30px auto 0;
          overflow: visible;
        }

        .lvs-platform-logo-item {
          display: flex;
          flex: 0 0 auto;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          width: 142px;
          gap: 12px;
        }

        .lvs-platform-logo-metric {
          min-height: 21px;
          font-size: 0.98rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.94);
          line-height: 1;
          white-space: nowrap;
        }

        .lvs-platform-logo-metric--empty {
          opacity: 0;
        }

        .lvs-platform-logo-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 56px;
          text-decoration: none;
          transition:
            transform 180ms ease,
            opacity 180ms ease;
        }

        .lvs-platform-logo-link:hover {
          transform: translateY(-2px);
        }

        .lvs-platform-logo-link--static:hover {
          transform: none;
        }

        .lvs-platform-logo-image {
          width: 100%;
          max-width: 142px;
          height: 42px;
          display: block;
          object-fit: contain;
          filter: brightness(0) invert(1);
          transition: filter 180ms ease, opacity 180ms ease;
        }

        .lvs-platform-logo-image--instagram {
          max-width: 154px;
          height: 46px;
        }

        .lvs-platform-logo-image--facebook {
          max-width: 156px;
          height: 47px;
        }

        .lvs-platform-logo-image--x {
          max-width: 84px;
          height: 34px;
        }

        .lvs-ecosystem-details {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px 18px;
          margin-top: 58px;
        }

        .lvs-ecosystem-detail {
          display: flex;
          flex-direction: column;
          min-height: 158px;
          padding: 24px 24px 22px;
          border-radius: 26px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(180deg, rgba(17, 17, 19, 0.82), rgba(10, 10, 11, 0.86));
          backdrop-filter: blur(12px);
        }

        .lvs-ecosystem-detail strong {
          display: block;
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          font-size: 1.12rem;
          line-height: 1.1;
        }

        .lvs-ecosystem-detail p {
          margin: 10px 0 0;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.6;
          font-size: 0.96rem;
        }

        .lvs-ecosystem-detail-stat {
          margin-top: auto;
          padding-top: 18px;
          display: flex;
          align-items: baseline;
          gap: 10px;
          line-height: 1;
        }

        .lvs-ecosystem-detail-stat--empty {
          min-height: 44px;
        }

        .lvs-ecosystem-detail-value {
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: 2.05rem;
          line-height: 0.92;
          letter-spacing: -0.05em;
          color: #ff4a52;
        }

        .lvs-ecosystem-detail-label {
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 112, 118, 0.88);
        }

        .lvs-ecosystem-overlay h3,
        .lvs-opportunity-lead h3,
        .lvs-cta-copy h2 {
          margin: 0;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(2rem, 3vw, 3rem);
          line-height: 0.98;
          letter-spacing: -0.04em;
        }

        .lvs-ecosystem-overlay p,
        .lvs-opportunity-lead p,
        .lvs-cta-copy p {
          margin: 14px 0 0;
          color: rgba(255, 255, 255, 0.74);
          line-height: 1.72;
        }

        .lvs-platform-pills .lvs-pill,
        .lvs-community-pills .lvs-pill,
        .lvs-card-points .lvs-pill {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.86);
        }

        .lvs-metric-grid,
        .lvs-program-grid,
        .lvs-options-grid,
        .lvs-link-grid {
          display: grid;
          gap: 20px;
        }

        .lvs-metric-card,
        .lvs-option-card,
        .lvs-link-card,
        .lvs-opportunity-lead {
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.03));
        }

        .lvs-metric-card,
        .lvs-option-card,
        .lvs-link-card {
          padding: 30px;
        }

        .lvs-card-icon {
          width: 62px;
          height: 62px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          background: var(--red-soft);
          color: var(--red);
          box-shadow: inset 0 0 0 1px rgba(255, 43, 50, 0.1);
        }

        .lvs-card-icon svg {
          width: 28px;
          height: 28px;
        }

        .lvs-option-card h3,
        .lvs-link-card h3 {
          margin: 20px 0 10px;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 1.34rem;
          line-height: 1.08;
        }

        .lvs-option-card p,
        .lvs-link-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.72;
        }

        .lvs-metric-grid {
          grid-template-columns: repeat(6, minmax(0, 1fr));
        }

        .lvs-metric-card {
          grid-column: span 2;
          background: rgba(247, 243, 239, 0.98);
          color: var(--ink);
          border-color: rgba(20, 20, 20, 0.08);
          box-shadow: 0 16px 44px rgba(0, 0, 0, 0.14);
        }

        .lvs-metric-card:nth-child(4) {
          grid-column: 2 / span 2;
        }

        .lvs-metric-card:nth-child(5) {
          grid-column: 4 / span 2;
        }

        .lvs-metric-card strong {
          display: block;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(2.1rem, 3vw, 3rem);
          line-height: 0.95;
          letter-spacing: -0.05em;
        }

        .lvs-metric-card span {
          display: block;
          margin-top: 12px;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 1rem;
          line-height: 1.3;
        }

        .lvs-metric-card small {
          display: block;
          margin-top: 14px;
          color: rgba(255, 43, 50, 0.74);
          font-size: 0.84rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .lvs-snapshot {
          margin-top: 22px;
          padding: 30px;
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            linear-gradient(130deg, rgba(255, 43, 50, 0.18), rgba(255, 43, 50, 0.04)),
            #111114;
          box-shadow: var(--shadow-soft);
        }

        .lvs-snapshot-top {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          gap: 28px;
          align-items: start;
        }

        .lvs-snapshot-copy h3 {
          margin: 14px 0 0;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(2rem, 3vw, 3.4rem);
          line-height: 0.96;
          letter-spacing: -0.04em;
          max-width: 11ch;
        }

        .lvs-snapshot-copy p {
          margin: 16px 0 0;
          color: rgba(255, 255, 255, 0.74);
          line-height: 1.78;
          max-width: 35rem;
        }

        .lvs-snapshot-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .lvs-snapshot-stat {
          padding: 20px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .lvs-snapshot-stat strong {
          display: block;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: 1.9rem;
          line-height: 1;
        }

        .lvs-snapshot-stat span {
          display: block;
          margin-top: 10px;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.42;
        }

        .lvs-channel-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-top: 24px;
        }

        .lvs-channel-card {
          padding: 18px 20px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .lvs-channel-card strong {
          display: block;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: 1.8rem;
          line-height: 1;
        }

        .lvs-channel-card span {
          display: block;
          margin-top: 10px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.44;
        }

        .lvs-source-note {
          margin-top: 16px;
          color: rgba(255, 255, 255, 0.54);
          font-size: 0.88rem;
          line-height: 1.65;
        }

        .lvs-program-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .lvs-program-card {
          position: relative;
          overflow: hidden;
          min-height: 600px;
          padding: 34px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: var(--shadow-soft);
        }

        .lvs-program-card::before {
          content: '';
          position: absolute;
          inset: 0;
        }

        .lvs-program-card--studio {
          background:
            linear-gradient(180deg, rgba(5, 5, 7, 0.02), rgba(5, 5, 7, 0.76)),
            url('${STUDIO_IMAGE_SRC}') center center / cover no-repeat;
        }

        .lvs-program-card--studio::before {
          background:
            linear-gradient(180deg, rgba(5, 5, 7, 0.02) 0%, rgba(5, 5, 7, 0.18) 42%, rgba(5, 5, 7, 0.84) 100%);
        }

        .lvs-program-card--gradient {
          background:
            linear-gradient(180deg, rgba(255, 43, 50, 0.08), rgba(8, 8, 10, 0.84)),
            radial-gradient(circle at top right, rgba(255, 43, 50, 0.28), transparent 34%),
            url('${ARTWORK_IMAGE_SRC}') center center / cover no-repeat;
        }

        .lvs-program-card--gradient::before {
          background:
            linear-gradient(180deg, rgba(8, 8, 10, 0.06), rgba(8, 8, 10, 0.88)),
            linear-gradient(140deg, rgba(255, 43, 50, 0.12), transparent 55%);
          mix-blend-mode: normal;
        }

        .lvs-program-copy {
          position: relative;
          z-index: 1;
        }

        .lvs-program-copy h3 {
          margin: 16px 0 0;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(2.2rem, 4vw, 4.2rem);
          line-height: 0.94;
          letter-spacing: -0.05em;
          max-width: 10ch;
        }

        .lvs-program-host {
          margin-top: 12px;
          color: #ffb2b6;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 1rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .lvs-program-copy p {
          margin: 16px 0 0;
          max-width: 31rem;
          color: rgba(255, 255, 255, 0.76);
          line-height: 1.72;
        }

        .lvs-card-points {
          margin-top: 22px;
        }

        .lvs-section--marcas {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #070708 0%, #050506 100%);
        }

        .lvs-section--marcas::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('${BRANDS_BG_SRC}') center center / cover no-repeat;
          opacity: 0.2;
          pointer-events: none;
        }

        .lvs-section--marcas::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(5, 5, 6, 0.94) 0%, rgba(7, 7, 8, 0.9) 38%, rgba(8, 8, 9, 0.94) 100%),
            radial-gradient(circle at 18% 24%, rgba(255, 43, 50, 0.12), transparent 28%),
            radial-gradient(circle at 82% 78%, rgba(255, 43, 50, 0.1), transparent 24%);
          pointer-events: none;
        }

        .lvs-section--marcas > .lvs-shell {
          position: relative;
          z-index: 1;
        }

        .lvs-section--plans {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at top left, rgba(255, 43, 50, 0.12), transparent 26%),
            linear-gradient(180deg, #060607 0%, #080809 54%, #050506 100%);
        }

        .lvs-section--plans::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(255, 43, 50, 0.04), transparent 28%, transparent 72%, rgba(255, 43, 50, 0.04)),
            radial-gradient(circle at 82% 18%, rgba(255, 43, 50, 0.08), transparent 22%);
          pointer-events: none;
        }

        .lvs-section--plans > .lvs-shell {
          position: relative;
          z-index: 1;
        }

        .lvs-plans-stack {
          display: grid;
          gap: 26px;
        }

        .lvs-plan-band {
          display: grid;
          grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
          gap: 22px;
          align-items: start;
          padding: 28px;
          border-radius: 34px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            linear-gradient(180deg, rgba(18, 18, 20, 0.92), rgba(8, 8, 9, 0.96));
          box-shadow: 0 28px 62px rgba(0, 0, 0, 0.16);
        }

        .lvs-plan-band-copy {
          position: sticky;
          top: 28px;
        }

        .lvs-plan-band-kicker {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          background: rgba(255, 43, 50, 0.1);
          color: #ffb9bc;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .lvs-plan-band-copy h3 {
          margin: 18px 0 0;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(2.1rem, 3vw, 3.2rem);
          line-height: 0.96;
          letter-spacing: -0.05em;
          max-width: 9ch;
        }

        .lvs-plan-band-copy p {
          margin: 14px 0 0;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.7;
          font-size: 0.98rem;
          max-width: 28ch;
        }

        .lvs-plan-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .lvs-plan-card {
          position: relative;
          overflow: hidden;
          min-height: 100%;
          padding: 24px 24px 22px;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            linear-gradient(180deg, rgba(16, 16, 18, 0.96), rgba(10, 10, 11, 0.98));
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.14);
          display: flex;
          flex-direction: column;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .lvs-plan-card::before {
          content: '';
          position: absolute;
          left: 24px;
          right: 24px;
          top: 0;
          height: 3px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255, 43, 50, 0.88), rgba(255, 43, 50, 0));
        }

        .lvs-plan-card--featured {
          background:
            radial-gradient(circle at top right, rgba(255, 43, 50, 0.18), transparent 30%),
            linear-gradient(180deg, rgba(51, 15, 18, 0.94), rgba(11, 11, 12, 0.98));
          border-color: rgba(255, 97, 103, 0.26);
        }

        .lvs-plan-card > * {
          position: relative;
          z-index: 1;
        }

        .lvs-plan-card-top {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 18px;
        }

        .lvs-plan-card h4 {
          margin: 0;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 1.48rem;
          line-height: 1.02;
          letter-spacing: -0.03em;
        }

        .lvs-plan-summary {
          margin: 10px 0 0;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .lvs-plan-price-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .lvs-plan-price-label {
          color: rgba(255, 176, 179, 0.9);
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 0.74rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .lvs-plan-price {
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(2rem, 2.4vw, 2.65rem);
          line-height: 0.94;
          letter-spacing: -0.05em;
          color: #ffffff;
        }

        .lvs-plan-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }

        .lvs-plan-tag {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.84);
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          font-size: 0.86rem;
        }

        .lvs-plan-list {
          display: grid;
          gap: 10px;
          margin: 20px 0 0;
          padding: 0;
          list-style: none;
        }

        .lvs-plan-list li {
          position: relative;
          padding-left: 18px;
          color: rgba(255, 255, 255, 0.84);
          line-height: 1.55;
          font-size: 0.95rem;
        }

        .lvs-plan-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.58em;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--red);
          box-shadow: 0 0 0 5px rgba(255, 43, 50, 0.08);
        }

        .lvs-plan-note {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 214, 216, 0.92);
          line-height: 1.55;
          font-size: 0.92rem;
        }

        .lvs-plan-note strong {
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          color: #ffffff;
        }

        .lvs-section--marcas .lvs-section-header {
          margin-bottom: 52px;
          align-items: center;
        }

        .lvs-section--marcas .lvs-section-title {
          max-width: 10ch;
        }

        .lvs-section--marcas .lvs-section-intro {
          max-width: 30rem;
        }

        .lvs-marcas-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          gap: 22px;
          align-items: stretch;
        }

        .lvs-opportunity-lead {
          position: relative;
          overflow: hidden;
          min-height: 100%;
          padding: 40px 38px;
          background:
            radial-gradient(circle at top right, rgba(255, 43, 50, 0.22), transparent 34%),
            linear-gradient(180deg, rgba(58, 18, 20, 0.94), rgba(13, 13, 14, 0.96));
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 28px 64px rgba(0, 0, 0, 0.24);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .lvs-opportunity-lead::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(140deg, rgba(255, 255, 255, 0.05), transparent 44%),
            linear-gradient(180deg, rgba(255, 43, 50, 0.06), transparent 70%);
          pointer-events: none;
        }

        .lvs-opportunity-lead > * {
          position: relative;
          z-index: 1;
        }

        .lvs-opportunity-kicker {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          min-height: 36px;
          padding: 0 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: #ffd9db;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lvs-opportunity-lead h3 {
          max-width: 8.6ch;
          font-size: clamp(2.6rem, 4.2vw, 4.5rem);
        }

        .lvs-opportunity-lead p {
          max-width: 30rem;
          color: rgba(255, 255, 255, 0.78);
          font-size: 1.05rem;
        }

        .lvs-opportunity-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .lvs-opportunity-pills .lvs-pill {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.92);
        }

        .lvs-opportunity-note {
          margin-top: 28px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 180, 183, 0.92);
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          font-size: 1rem;
          line-height: 1.5;
        }

        .lvs-options-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .lvs-option-card {
          position: relative;
          overflow: hidden;
          min-height: 228px;
          padding: 30px 26px;
          background:
            linear-gradient(180deg, rgba(19, 19, 21, 0.92), rgba(10, 10, 11, 0.96));
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 24px 52px rgba(0, 0, 0, 0.18);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .lvs-option-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(255, 43, 50, 0.08), transparent 34%),
            radial-gradient(circle at top right, rgba(255, 43, 50, 0.12), transparent 32%);
          pointer-events: none;
        }

        .lvs-option-card::after {
          content: '';
          position: absolute;
          left: 26px;
          right: 26px;
          top: 0;
          height: 3px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255, 43, 50, 0.9), rgba(255, 43, 50, 0));
        }

        .lvs-option-card > * {
          position: relative;
          z-index: 1;
        }

        .lvs-section--marcas .lvs-card-icon {
          width: 66px;
          height: 66px;
          border-radius: 22px;
          background: rgba(255, 43, 50, 0.12);
          color: #ff4c52;
          box-shadow: inset 0 0 0 1px rgba(255, 43, 50, 0.16);
        }

        .lvs-section--marcas .lvs-card-icon svg {
          width: 30px;
          height: 30px;
          transition: transform 180ms ease;
        }

        .lvs-option-card h3 {
          margin-top: 22px;
          max-width: 11ch;
          font-size: 1.44rem;
          line-height: 1.02;
        }

        .lvs-option-card p {
          margin-top: 12px;
          color: rgba(255, 255, 255, 0.74);
          line-height: 1.6;
          font-size: 0.98rem;
          max-width: 24ch;
        }

        .lvs-cta-wrap {
          display: grid;
          grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr);
          gap: 28px;
          align-items: stretch;
        }

        .lvs-cta-visual {
          min-height: 600px;
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            linear-gradient(180deg, rgba(5, 5, 7, 0.18), rgba(5, 5, 7, 0.62)),
            url('${COMMUNITY_IMAGE_SRC}') center center / cover no-repeat;
          box-shadow: var(--shadow-soft);
        }

        .lvs-cta-copy {
          padding: 38px;
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            radial-gradient(circle at top right, rgba(255, 43, 50, 0.18), transparent 28%),
            #111114;
          box-shadow: var(--shadow-soft);
        }

        .lvs-community-pills {
          margin-top: 22px;
        }

        .lvs-link-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin-top: 28px;
        }

        .lvs-link-card {
          display: block;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .lvs-link-card:hover {
          border-color: rgba(255, 43, 50, 0.32);
        }

        @media (hover: hover) and (pointer: fine) {
          .lvs-ecosystem-circle:hover,
          .lvs-audience-card:hover,
          .lvs-plan-card:hover,
          .lvs-option-card:hover,
          .lvs-opportunity-lead:hover {
            transform: translateY(-6px);
            border-color: rgba(255, 83, 89, 0.26);
            box-shadow: 0 30px 70px rgba(255, 43, 50, 0.16);
          }

          .lvs-option-card:hover .lvs-card-icon svg {
            transform: scale(1.06);
          }

          .lvs-platform-logo-item:hover .lvs-platform-logo-metric {
            color: #ff9ca1;
          }

          .lvs-platform-logo-item:hover .lvs-platform-logo-image {
            filter: brightness(0) saturate(100%) invert(28%) sepia(92%) saturate(3570%) hue-rotate(340deg) brightness(108%) contrast(105%);
          }
        }

        .lvs-final-cover {
          position: relative;
          overflow: hidden;
          padding: 72px 0 72px;
          background:
            radial-gradient(circle at 50% 12%, rgba(255, 43, 50, 0.14), transparent 26%),
            radial-gradient(circle at 50% 82%, rgba(255, 43, 50, 0.08), transparent 24%),
            linear-gradient(180deg, #030304 0%, #060607 52%, #030304 100%);
        }

        .lvs-final-cover::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(255, 255, 255, 0.02), transparent 26%, transparent 74%, rgba(255, 255, 255, 0.02)),
            radial-gradient(circle at 50% 34%, rgba(255, 43, 50, 0.08), transparent 30%);
          pointer-events: none;
        }

        .lvs-final-cover > .lvs-shell {
          position: relative;
          z-index: 1;
          min-height: 640px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lvs-final-cover-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0;
          width: 100%;
          padding: 0;
        }

        .lvs-final-cover-logo {
          width: min(100%, 780px);
          display: block;
          object-fit: contain;
          filter: drop-shadow(0 18px 36px rgba(255, 43, 50, 0.1));
        }

        .lvs-final-social-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 18px 28px;
          margin-top: clamp(52px, 7vh, 74px);
        }

        .lvs-final-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 4px 8px;
          opacity: 0.98;
          transition: transform 180ms ease, opacity 180ms ease;
        }

        .lvs-final-social-link:hover {
          transform: translateY(-2px);
        }

        .lvs-final-social-logo {
          max-width: 146px;
          height: 36px;
          display: block;
          object-fit: contain;
          transition: filter 180ms ease, opacity 180ms ease, transform 180ms ease;
        }

        .lvs-final-social-logo--instagram {
          max-width: 170px;
          height: 44px;
          position: relative;
          top: 2px;
        }

        .lvs-final-social-logo--facebook {
          max-width: 162px;
          height: 42px;
        }

        .lvs-final-social-logo--x {
          max-width: 74px;
          height: 28px;
        }

        .lvs-final-social-link:hover .lvs-final-social-logo {
          filter: brightness(0) saturate(100%) invert(28%) sepia(92%) saturate(3570%) hue-rotate(340deg) brightness(108%) contrast(105%);
          transform: scale(1.02);
        }

        .lvs-final-contact {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 16px 26px;
          margin-top: 38px;
          color: rgba(255, 245, 245, 0.96);
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          font-size: 1.16rem;
          line-height: 1.5;
        }

        .lvs-final-contact-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: inherit;
          text-decoration: none;
          transition: opacity 180ms ease, transform 180ms ease;
        }

        .lvs-final-contact-item:hover {
          opacity: 0.96;
          transform: translateY(-1px);
        }

        .lvs-final-contact-item svg {
          width: 17px;
          height: 17px;
          color: #fff7f7;
          flex: 0 0 auto;
        }

        .lvs-footer {
          padding: 22px 0 28px;
          background: #050506;
        }

        .lvs-footer-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.92rem;
          text-align: center;
          line-height: 1.6;
        }

        @page {
          size: A4;
          margin: 0;
        }

        @media print {
          html,
          body {
            background: #050506 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .lvs-page {
            background:
              radial-gradient(circle at top left, rgba(255, 43, 50, 0.18), transparent 26%),
              radial-gradient(circle at 85% 12%, rgba(255, 43, 50, 0.16), transparent 24%),
              linear-gradient(180deg, #050506 0%, #070709 26%, #09090b 100%) !important;
          }

          .lvs-topbar {
            display: none;
          }

          .lvs-shell {
            width: min(1460px, calc(100vw - 56px));
          }

          .lvs-section,
          .lvs-hero,
          .lvs-opportunity-lead,
          .lvs-option-card,
          .lvs-audience-card,
          .lvs-ecosystem-detail {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .lvs-link-card:hover,
          .lvs-topbar-cta:hover,
          .lvs-primary-button:hover,
          .lvs-secondary-button:hover {
            transform: none;
            box-shadow: none;
          }
        }

        @media (max-width: 1140px) {
          .lvs-nav { display: none; }

          .lvs-hero-layout,
          .lvs-snapshot-top,
          .lvs-program-grid,
          .lvs-marcas-layout,
          .lvs-plan-band,
          .lvs-cta-wrap,
          .lvs-section-header {
            grid-template-columns: 1fr;
          }

          .lvs-metric-grid,
          .lvs-audience-highlight-row,
          .lvs-audience-grid,
          .lvs-plan-grid,
          .lvs-options-grid,
          .lvs-link-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lvs-metric-card,
          .lvs-metric-card:nth-child(4),
          .lvs-metric-card:nth-child(5) {
            grid-column: auto;
          }

          .lvs-channel-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lvs-hero-media,
          .lvs-cta-visual {
            min-height: 560px;
          }

          .lvs-ecosystem-head {
            gap: 22px;
          }

          .lvs-plan-band-copy {
            position: static;
          }

          .lvs-audience-header,
          .lvs-audience-footnote {
            grid-template-columns: 1fr;
          }

          .lvs-ecosystem-head .lvs-section-intro {
            margin: 0;
          }

          .lvs-ecosystem-canvas {
            min-height: 720px;
          }

          .lvs-ecosystem-details {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin-top: 48px;
          }

          .lvs-ecosystem-orbit--one {
            width: 92%;
            height: 66%;
            left: 3%;
            top: 16%;
          }

          .lvs-ecosystem-orbit--two {
            width: 70%;
            height: 46%;
            left: 18%;
            top: 28%;
          }

          .lvs-ecosystem-hub {
            width: 286px;
            height: 286px;
            left: 51%;
          }

          .lvs-ecosystem-circle--web {
            right: 1%;
          }

          .lvs-ecosystem-circle--events {
            right: 12%;
          }

          .lvs-hero-copy {
            min-height: auto;
            align-items: flex-start;
            width: min(100%, 760px);
            padding: 84px 0 44px;
            text-align: left;
          }

          .lvs-hero-copy-top {
            width: min(100%, 620px);
            margin-left: 0;
            margin-top: 0;
            margin-bottom: 0;
          }

          .lvs-hero-wordmark {
            margin-left: 0;
            margin-right: auto;
          }

          .lvs-hero-subtitle {
            margin-left: 0;
            text-align: left;
            white-space: normal;
          }

          .lvs-hero-footer {
            position: static;
            left: auto;
            right: auto;
            bottom: auto;
            justify-content: flex-start;
            margin-top: 34px;
          }

          .lvs-final-cover-logo {
            width: min(100%, 860px);
          }
        }

        @media (max-width: 760px) {
          .lvs-shell {
            width: min(calc(100vw - 28px), 100%);
          }

          .lvs-topbar-inner {
            min-height: 76px;
          }

          .lvs-brand img {
            width: 150px;
          }

          .lvs-topbar-cta {
            min-height: 48px;
            padding: 0 18px;
          }

          .lvs-section,
          .lvs-hero {
            padding-top: 72px;
            padding-bottom: 72px;
          }

          .lvs-hero-title,
          .lvs-section-title {
            max-width: none;
          }

          .lvs-hero-layout {
            min-height: auto;
          }

          .lvs-hero-copy {
            width: 100%;
            padding-top: 48px;
            padding-bottom: 40px;
          }

          .lvs-hero-copy-top {
            width: min(100%, 520px);
          }

          .lvs-hero-wordmark {
            width: min(100%, 190px);
            margin-bottom: 22px;
          }

          .lvs-hero-title {
            font-size: clamp(4rem, 16vw, 6.4rem);
          }

          .lvs-hero-subtitle {
            max-width: 24ch;
            font-size: 1.1rem;
            white-space: normal;
          }

          .lvs-hero-footer {
            gap: 14px;
            font-size: 0.96rem;
            width: 100%;
          }

          .lvs-hero-footer-item:not(:first-child)::before {
            left: -10px;
          }

          .lvs-hero-actions,
          .lvs-footer-row {
            flex-direction: column;
            align-items: stretch;
          }

          .lvs-primary-button,
          .lvs-secondary-button {
            width: 100%;
          }

          .lvs-ecosystem-grid,
          .lvs-metric-grid,
          .lvs-audience-highlight-row,
          .lvs-audience-grid,
          .lvs-plan-grid,
          .lvs-options-grid,
          .lvs-link-grid,
          .lvs-snapshot-stats,
          .lvs-channel-grid,
          .lvs-panel-grid {
            grid-template-columns: 1fr;
          }

          .lvs-program-card,
          .lvs-hero-media,
          .lvs-cta-visual {
            min-height: 500px;
          }

          .lvs-ecosystem-canvas {
            min-height: auto;
            margin-top: 34px;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-areas:
              'hub hub'
              'social live'
              'radio web'
              'app events';
            gap: 18px 14px;
            justify-items: center;
            align-items: center;
            padding: 10px 0 2px;
          }

          .lvs-ecosystem-title-line {
            white-space: normal;
          }

          .lvs-audience-title-line {
            white-space: normal;
          }

          .lvs-ecosystem-orbit {
            display: none;
          }

          .lvs-ecosystem-canvas::before {
            inset: 12% 8% 34% 8%;
            filter: blur(22px);
          }

          .lvs-ecosystem-circle,
          .lvs-ecosystem-hub {
            position: relative;
            left: auto;
            right: auto;
            top: auto;
            bottom: auto;
            transform: none;
            margin: 0 auto;
          }

          .lvs-ecosystem-hub {
            grid-area: hub;
            width: min(55vw, 218px);
            height: min(55vw, 218px);
          }

          .lvs-ecosystem-hub strong {
            font-size: 1.88rem;
          }

          .lvs-ecosystem-circle strong {
            font-size: 1.08rem;
          }

          .lvs-ecosystem-circle span,
          .lvs-ecosystem-hub span {
            font-size: 0.84rem;
          }

          .lvs-ecosystem-core-logo {
            width: 108%;
            max-width: 252px;
            max-height: 172px;
          }

          .lvs-ecosystem-circle-icon {
            width: 56px;
            height: 56px;
          }

          .lvs-ecosystem-head .lvs-section-intro {
            font-size: 1.08rem;
          }

          .lvs-ecosystem-details {
            grid-template-columns: 1fr;
            margin-top: 40px;
          }

          .lvs-ecosystem-circle--social {
            grid-area: social;
            width: min(38vw, 146px);
            height: min(38vw, 146px);
          }

          .lvs-ecosystem-circle--live {
            grid-area: live;
            width: min(40vw, 154px);
            height: min(40vw, 154px);
          }

          .lvs-ecosystem-circle--radio {
            grid-area: radio;
            width: min(40vw, 154px);
            height: min(40vw, 154px);
          }

          .lvs-ecosystem-circle--web {
            grid-area: web;
            width: min(42vw, 162px);
            height: min(42vw, 162px);
          }

          .lvs-ecosystem-circle--app {
            grid-area: app;
            width: min(39vw, 148px);
            height: min(39vw, 148px);
          }

          .lvs-ecosystem-circle--events {
            grid-area: events;
            width: min(37vw, 142px);
            height: min(37vw, 142px);
          }

          .lvs-ecosystem-platforms {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px 12px;
            width: 100%;
            margin-top: 26px;
          }

          .lvs-platform-logo-item {
            width: 100%;
            gap: 8px;
          }

          .lvs-platform-logo-metric {
            min-height: 18px;
            font-size: 0.84rem;
          }

          .lvs-platform-logo-image {
            max-width: 128px;
            height: 34px;
          }

          .lvs-platform-logo-image--instagram {
            max-width: 132px;
            height: 38px;
          }

          .lvs-platform-logo-image--facebook {
            max-width: 136px;
            height: 39px;
          }

          .lvs-platform-logo-image--x {
            max-width: 74px;
            height: 28px;
          }

          .lvs-final-cover {
            padding: 64px 0 64px;
          }

          .lvs-final-cover-inner {
            gap: 0;
          }

          .lvs-final-cover-logo {
            width: min(100%, 540px);
          }

          .lvs-final-social-row {
            width: 100%;
            gap: 14px 18px;
            margin-top: 42px;
          }

          .lvs-final-social-link {
            padding: 2px 4px;
          }

          .lvs-final-social-logo {
            max-width: 118px;
            height: 30px;
          }

          .lvs-final-social-logo--instagram {
            max-width: 136px;
            height: 36px;
            top: 1px;
          }

          .lvs-final-social-logo--facebook {
            max-width: 132px;
            height: 34px;
          }

          .lvs-final-social-logo--x {
            max-width: 60px;
            height: 24px;
          }

          .lvs-final-contact {
            flex-direction: column;
            gap: 10px;
            font-size: 1.06rem;
            margin-top: 24px;
          }

          .lvs-cta-copy,
          .lvs-opportunity-lead,
          .lvs-plan-band,
          .lvs-plan-card,
          .lvs-program-card,
          .lvs-audience-card,
          .lvs-audience-highlight,
          .lvs-metric-card,
          .lvs-option-card,
          .lvs-link-card,
          .lvs-snapshot {
            padding: 24px;
          }
        }
      `}</style>

      <div className="lvs-page">
        <header className="lvs-topbar">
          <div className="lvs-shell lvs-topbar-inner">
            <a className="lvs-brand" href={SITE_URL} aria-label="La Voz Salsa">
              <img src={TOPBAR_LOGO_SRC} alt="La Voz Salsa" />
            </a>

            <nav className="lvs-nav" aria-label="Navegación principal">
              {navLinks.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <a className="lvs-topbar-cta" href={CONTACT_URL} target="_blank" rel="noreferrer">
              Contacto
            </a>
          </div>
        </header>

        <main>
          <section className="lvs-hero">
            <div className="lvs-shell lvs-hero-layout">
              <div className="lvs-hero-copy">
                <div className="lvs-hero-copy-top">
                  <img className="lvs-hero-wordmark" src={HERO_WORDMARK_SRC} alt="La Voz Salsa" />
                  <h1 className="lvs-hero-title">
                    <span>Media Kit</span>
                    <span>2026</span>
                  </h1>
                  <p className="lvs-hero-subtitle">Propuesta comercial multiplataforma para marcas.</p>
                </div>

                <div className="lvs-hero-footer">
                  {heroFooterItems.map((item) => (
                    <span key={item} className="lvs-hero-footer-item">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="ecosistema" className="lvs-section lvs-section--ecosystem">
            <div className="lvs-shell">
              <div className="lvs-ecosystem-head">
                <div>
                  <span className="lvs-eyebrow">Ecosistema</span>
                  <h2 className="lvs-section-title">
                    <span className="lvs-ecosystem-title-line">Tu marca presente</span>
                    <span className="lvs-ecosystem-title-line">en todo el ecosistema salsero.</span>
                  </h2>
                </div>
                <p className="lvs-section-intro">
                  Integramos tu marca en radio, streaming, app, web, redes y eventos para lograr visibilidad, frecuencia y recordación.
                </p>
              </div>

              <div className="lvs-ecosystem-canvas">
                <div className="lvs-ecosystem-orbit lvs-ecosystem-orbit--one" />
                <div className="lvs-ecosystem-orbit lvs-ecosystem-orbit--two" />

                {ecosystemNodes.map((item) => (
                  <article
                    key={item.key}
                    className={`lvs-ecosystem-circle lvs-ecosystem-circle--${item.position} lvs-ecosystem-circle--${item.tone}`}
                  >
                    <div className="lvs-ecosystem-circle-inner">
                      <div className="lvs-ecosystem-circle-icon">
                        <FontAwesome5 name={item.icon} size={28} color={item.iconColor} />
                      </div>
                      <strong>{item.title}</strong>
                    </div>
                  </article>
                ))}

                <article className="lvs-ecosystem-hub">
                  <div className="lvs-ecosystem-hub-inner">
                    <img className="lvs-ecosystem-core-logo" src={HUB_LOGO_SRC} alt="La Voz Salsa" />
                  </div>
                </article>
              </div>

              <div className="lvs-ecosystem-platforms">
                {platformLogos.map((item) => (
                  <PlatformLogoItem key={item.label} item={item} />
                ))}
              </div>

              <div className="lvs-ecosystem-details">
                {ecosystemNodes.map((item) => (
                  <article key={`detail-${item.key}`} className="lvs-ecosystem-detail">
                    <strong>{item.title}</strong>
                    <p>{item.copy}</p>
                    {item.statValue ? (
                      <div className="lvs-ecosystem-detail-stat">
                        <span className="lvs-ecosystem-detail-value">{item.statValue}</span>
                        {item.statLabel ? <span className="lvs-ecosystem-detail-label">{item.statLabel}</span> : null}
                      </div>
                    ) : (
                      <div className="lvs-ecosystem-detail-stat lvs-ecosystem-detail-stat--empty" />
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="metricas" className="lvs-section lvs-section--audience">
            <div className="lvs-shell">
              <div className="lvs-audience-header">
                <div>
                  <span className="lvs-eyebrow">Audiencia y performance</span>
                  <h2 className="lvs-section-title lvs-audience-title">
                    <span className="lvs-audience-title-line">Nuestras ciudades con más audiencia</span>
                    <span className="lvs-audience-title-line">y los países donde la marca gana alcance.</span>
                  </h2>
                </div>
                <p className="lvs-audience-intro">
                  Google Analytics confirma tráfico internacional del sitio. La radio y los live streamings en vivo
                  refuerzan la escucha real desde Colombia y ciudades clave, y el perfil de edad de nuestra comunidad.
                </p>
              </div>

              <div className="lvs-audience-grid">
                <AudienceBarCard
                  icon="globe-americas"
                  eyebrow="Google Analytics"
                  title="7 países clave"
                  items={audienceCountryData}
                  showValues={false}
                />

                <AudienceBarCard
                  icon="map-marker-alt"
                  eyebrow="Ciudades"
                  title="Nuestras ciudades con más audiencia"
                  items={audienceCityData}
                  showValues={false}
                />

                <AudienceBarCard
                  icon="user-friends"
                  eyebrow="Edad"
                  title="Perfil de edad de la comunidad"
                  items={audienceAgeData}
                  showValues={false}
                />

                <AudienceInterestCard
                  eyebrow="Intereses"
                  title="Intereses de nuestros oyentes"
                  items={audienceInterestData}
                />
              </div>
            </div>
          </section>

          <section id="marcas" className="lvs-section lvs-section--marcas">
            <div className="lvs-shell">
              <div className="lvs-section-header">
                <div>
                  <span className="lvs-eyebrow">Integraciones</span>
                  <h2 className="lvs-section-title">Más que pauta: presencia que sí conecta.</h2>
                </div>
                <p className="lvs-section-intro">
                  Formatos claros para entrar en audio, video, streaming y comunidad sin romper la experiencia del oyente.
                </p>
              </div>

              <div className="lvs-marcas-layout">
                <article className="lvs-opportunity-lead">
                  <span className="lvs-opportunity-kicker">Integración 360</span>
                  <h3>Tu marca dentro del contenido, no al margen.</h3>
                  <p>
                    Activaciones objetivas para ganar visibilidad, afinidad y recordación en el universo salsero.
                  </p>

                  <div className="lvs-opportunity-pills">
                    {brandAccessPills.map((item) => (
                      <span key={item} className="lvs-pill">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="lvs-opportunity-note">Audio, video, activaciones y conversación en una misma propuesta comercial.</div>
                </article>

                <div className="lvs-options-grid">
                  {brandOptions.map((item) => (
                    <article key={item.title} className="lvs-option-card">
                      <div className="lvs-card-icon">
                        <Icon name={item.icon} />
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="planes" className="lvs-section lvs-section--plans">
            <div className="lvs-shell">
              <div className="lvs-section-header">
                <div>
                  <span className="lvs-eyebrow">Planes comerciales</span>
                  <h2 className="lvs-section-title">Una línea comercial para entrar con la intensidad que tu marca necesita.</h2>
                </div>
                <p className="lvs-section-intro">
                  Organizamos la oferta en bloques más claros para que puedas comparar presencia, frecuencia y nivel de integración sin recargar la propuesta.
                </p>
              </div>

              <div className="lvs-plans-stack">
                {commercialPlanGroups.map((group) => (
                  <section key={group.key} className="lvs-plan-band">
                    <div className="lvs-plan-band-copy">
                      <span className="lvs-plan-band-kicker">{group.eyebrow}</span>
                      <h3>{group.title}</h3>
                      <p>{group.copy}</p>
                    </div>

                    <div className="lvs-plan-grid">
                      {group.plans.map((plan) => (
                        <CommercialPlanCard key={plan.name} plan={plan} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <section className="lvs-final-cover">
            <div className="lvs-shell">
              <div className="lvs-final-cover-inner">
                <img className="lvs-final-cover-logo" src={FINAL_COVER_LOGO_SRC} alt="La Voz Salsa" />

                <div className="lvs-final-social-row" aria-label="Redes sociales La Voz Salsa">
                  {platformLogos.map((item) => (
                    <FinalSocialLogo key={`final-${item.label}`} item={item} />
                  ))}
                </div>

                <div className="lvs-final-contact">
                  <span className="lvs-final-contact-item">
                    <FontAwesome5 name="map-marker-alt" size={17} color="#fff7f7" />
                    Medellín, Colombia
                  </span>

                  <a className="lvs-final-contact-item" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp La Voz Salsa">
                    <FontAwesome5 name="whatsapp" size={17} color="#fff7f7" />
                    316 4338591
                  </a>

                  <a className="lvs-final-contact-item" href={`mailto:${COMMERCIAL_EMAIL}`} aria-label="Correo comercial La Voz Salsa">
                    <FontAwesome5 name="envelope" size={17} color="#fff7f7" />
                    {COMMERCIAL_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="lvs-footer">
          <div className="lvs-shell lvs-footer-row">
            <span>© 2026 La Voz Salsa | Multiplataforma 360 | Radio | Live | App | Social Media</span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
