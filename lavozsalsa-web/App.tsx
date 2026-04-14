import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';

const RADIO_STREAM_URL = 'https://emisora.lavozsalsa.com/listen/lavozsalsa/stream';
const HOME_URL = '/';
const ARTISTS_PAGE_PATH = '/artistas/';
const APP_URL = 'https://app.lavozsalsa.com/';
const PLATFORM_URL = 'https://app.lavozsalsa.com/';
const ARTISTS_APP_URL = 'https://app.lavozsalsa.com/artistas';
const PLAYLISTS_URL = 'https://app.lavozsalsa.com/playlists';
const ARTISTS_URL = 'https://artistas.lavozsalsa.com/';
const LIVE_STREAMING_URL = 'https://app.lavozsalsa.com/tv';
const PRESS_URL = 'https://prensa.lavozsalsa.com/';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.lavozsalsa.app';
const APP_STORE_URL = 'https://apps.apple.com/us/app/la-voz-salsa/id6478400927';
const ONE_LINK_URL = 'https://onelink.to/w5n2k9';
const PRIVACY_URL = 'https://app.lavozsalsa.com/privacidad';
const TERMS_URL = 'https://app.lavozsalsa.com/terminos';
const COOKIES_URL = 'https://app.lavozsalsa.com/politica-de-cookies';

const HEADER_LOGO_SRC = '/brand/logo-lavozsalsa-header-red.png';
const FOOTER_LOGO_SRC = '/brand/logo-lavozsalsa-dotcom-white.png';
const HERO_BG_SRC = '/media/lavozsalsa-home-hero.jpeg';
const COMMUNITY_BLOCK_SRC = '/media/community-block.jpeg';

const navLinks = [
  { label: 'TV', href: LIVE_STREAMING_URL },
  { label: 'Pulso Salsero', href: PRESS_URL },
  { label: 'Artistas', href: ARTISTS_URL },
];

const valueItems = [
  {
    title: 'Radio en vivo',
    icon: 'radio',
    copy: 'Escucha La Voz Salsa y disfruta una programación diseñada por personas que aman y conocen la salsa. Aquí suena lo comercial, pero también la salsa no comercial y lo nuevo de la industria para conocedores del género.',
  },
  {
    title: 'Live Streaming',
    icon: 'stream',
    copy: 'Disfruta de nuestros programas en vivo “El Round De La Salsa” con Vale Montoya los martes 2:00 pm y Noche De Luna desde las 8:00 pm con DJ Pocho, uno de los DJs más experimentados del medio, a través de nuestro canal Live Streaming.',
  },
  {
    title: 'Chat Interactivo',
    icon: 'community',
    copy: 'Los oyentes comparten, piden canciones y envían dedicatorias y mensajes en tiempo real para vivir la salsa con más cercanía.',
  },
];

const panelItems = [
  'Identifica el nombre de la canción y el artista que están sonando.',
  'Revisa un historial con temas emitidos anteriormente en la señal.',
  'Encuentra banners de artistas, conciertos, noticias y novedades salseras.',
];

const faqItems = [
  {
    question: 'Qué es La Voz Salsa?',
    answer:
      'La Voz Salsa es una plataforma de música, radio, streaming y red social para salseros. Reúne emisoras en vivo, canciones, playlists, artistas, comunidad y una app móvil gratuita.',
  },
  {
    question: 'La app se puede descargar gratis?',
    answer:
      'Sí. Usa el botón Descargar app y te llevamos a la tienda correcta según tu dispositivo. También puedes entrar por App Store o Google Play desde el footer.',
  },
  {
    question: 'Puedo saber qué canción está sonando?',
    answer:
      'Sí. La app muestra títulos de canciones, artistas y un historial para consultar temas que sonaron antes. Así puedes descubrir, guardar y buscar salsa con más facilidad.',
  },
];

const footerColumns = [
  {
    title: 'Explorar',
    links: [
      { label: 'TV', href: LIVE_STREAMING_URL },
      { label: 'Pulso Salsero', href: PRESS_URL },
      { label: 'Artistas', href: ARTISTS_URL },
    ],
  },
  {
    title: 'App',
    links: [
      { label: 'Abrir app', href: ONE_LINK_URL },
      { label: 'Descargar app', href: ONE_LINK_URL },
    ],
  },
  {
    title: 'Escuchar',
    links: [
      { label: 'Radio en vivo', href: RADIO_STREAM_URL },
      { label: 'Plataforma web', href: PLATFORM_URL },
    ],
  },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/lavozsalsa', icon: 'instagram' },
  { label: 'TikTok', href: 'https://tiktok.com/@lavozsalsa', icon: 'tiktok' },
  { label: 'Facebook', href: 'https://facebook.com/lavozsalsa', icon: 'facebook' },
  { label: 'YouTube', href: 'https://youtube.com/@lavozsalsa', icon: 'youtube' },
];

const storeBadges = [
  { label: 'App Store', href: APP_STORE_URL, icon: 'apple' },
  { label: 'Google Play', href: PLAY_STORE_URL, icon: 'play' },
];

const artistFeatureItems = [
  {
    title: 'Perfil con identidad',
    copy: 'Presenta tu proyecto con nombre, imagen, narrativa y presencia propia dentro de un entorno hecho para salsa.',
  },
  {
    title: 'Playlists y descubrimiento',
    copy: 'Conecta tus lanzamientos con oyentes que no llegan por moda: llegan porque aman el género y quieren descubrir artistas nuevos.',
  },
  {
    title: 'Comunidad real',
    copy: 'No es solo exposición. Es conversación con salseros, DJs, coleccionistas, medios, promotores y otros artistas del movimiento.',
  },
  {
    title: 'Live Streaming y contenido',
    copy: 'Abre espacio para especiales, entrevistas, sesiones, festivales y piezas audiovisuales que expanden tu música más allá del audio.',
  },
];

const artistPillarItems = [
  {
    eyebrow: '01',
    title: 'Amplifica tu proyecto',
    copy: 'Haz visible sencillos, EPs, álbumes y catálogo dentro de una plataforma editorial que sí entiende la salsa.',
  },
  {
    eyebrow: '02',
    title: 'Cuenta tu historia',
    copy: 'Tu carrera no vive solo en una portada. Vive en tu relato, tu estética, tus visuales y tu manera de conectar con la gente.',
  },
  {
    eyebrow: '03',
    title: 'Crece con cultura',
    copy: 'La Voz Salsa no piensa al artista como un archivo musical, sino como parte activa de una escena y una comunidad.',
  },
  {
    eyebrow: '04',
    title: 'Muévete dentro del ecosistema',
    copy: 'App, playlists, artistas, comunidad y live streaming trabajan juntos para darle más profundidad a tu presencia.',
  },
];

const artistFlowItems = [
  {
    step: 'Paso 1',
    title: 'Hazte visible',
    copy: 'Tu perfil artístico se convierte en punto de entrada para que el oyente entienda quién eres y qué estás construyendo.',
  },
  {
    step: 'Paso 2',
    title: 'Entra en circulación',
    copy: 'Playlists, vitrinas de contenido y espacios de descubrimiento ponen tu propuesta delante de una audiencia salsera real.',
  },
  {
    step: 'Paso 3',
    title: 'Convierte escucha en relación',
    copy: 'La comunidad, el contenido y el streaming permiten que tu música genere conversación y recordación.',
  },
];

const artistMarqueeItems = [
  'Amplifica tu salsa',
  'Conecta con fans',
  'Construye tu perfil',
  'Muévete en comunidad',
  'Vive en live streaming',
];

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
          <path
            d="M14.8 4c.4 1.4 1.6 2.6 3 3.1v2.9a7.2 7.2 0 0 1-3-.7v5.6a5.1 5.1 0 1 1-5.1-5.1c.3 0 .6 0 .9.1v3a2.2 2.2 0 1 0 1.2 2v-11h3Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M13.6 20v-6.6H16l.4-2.9h-2.8V8.7c0-.8.2-1.4 1.4-1.4h1.5V4.7c-.3 0-1.1-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8v2.9h2.6V20h3Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M21 8.5a2.8 2.8 0 0 0-2-2C17.2 6 12 6 12 6s-5.2 0-7 .5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.5 12c0 1.2.1 2.4.5 3.5a2.8 2.8 0 0 0 2 2c1.8.5 7 .5 7 .5s5.2 0 7-.5a2.8 2.8 0 0 0 2-2c.3-1.1.5-2.3.5-3.5s-.2-2.4-.5-3.5ZM10.4 15.3V8.7l5 3.3-5 3.3Z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return null;
  }
}

function StoreBadgeIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'apple':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M15.2 12.6c0-1.8 1-2.8 1.8-3.3-.9-1.3-2.3-1.5-2.8-1.5-1.2-.1-2.3.7-2.9.7-.6 0-1.5-.7-2.4-.7-1.3 0-2.4.7-3.1 1.8-1.3 2.1-.3 5.2.9 6.9.6.9 1.4 2 2.4 2 .9 0 1.3-.6 2.4-.6 1.1 0 1.5.6 2.5.6 1 0 1.7-.9 2.3-1.8.7-1 1-2 1-2-.1 0-2.1-.8-2.1-4.1Zm-1.8-6.1c.5-.6.9-1.4.8-2.2-.8 0-1.7.5-2.2 1.1-.5.5-.9 1.4-.8 2.1.9.1 1.7-.4 2.2-1Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'play':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.7 3.8 14.9 14 4.8 20.2c-.4-.3-.6-.8-.6-1.3V5.1c0-.5.2-.9.5-1.3Z" fill="currentColor" />
          <path d="m15.8 14.9 2.7-1.6c1-.6 1-1.9 0-2.5l-2.8-1.6-2.6 2.6 2.7 3.1Z" fill="currentColor" />
          <path d="m5.4 20.6 10.4-6.3 2.8 1.6c.3.2.5.5.6.8L7.8 22c-.9.4-1.8-.2-2.4-1.4Z" fill="currentColor" />
          <path d="m19.2 7.1-.6.8-2.8 1.7-2.7-3 4.7-2.8c.6.2 1.1.7 1.4 1.3Z" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

function ValueIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'radio':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 10.5A6 6 0 0 1 12 4.5a6 6 0 0 1 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 13.5A8 8 0 0 1 12 5.5a8 8 0 0 1 8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".7" />
          <circle cx="12" cy="16.5" r="2.5" fill="currentColor" />
        </svg>
      );
    case 'stream':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="5" width="16" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m10 9 5 2.5-5 2.5V9Z" fill="currentColor" />
          <path d="M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'community':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="9" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="16.5" cy="9" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" opacity=".8" />
          <path d="M4.5 18c.7-2.1 2.5-3.5 4.7-3.5 2.3 0 4.2 1.4 4.8 3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M14.5 17.3c.4-1.5 1.6-2.6 3-2.9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".8" />
        </svg>
      );
    default:
      return null;
  }
}

function normalizePathname(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const currentPath = normalizePathname(typeof window === 'undefined' ? '/' : window.location.pathname);
  const isArtistsPage = currentPath === ARTISTS_PAGE_PATH;

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!playing) {
      audio.pause();
      return;
    }

    audio.volume = 0.85;
    void audio.play().catch(() => {
      setPlaying(false);
    });
  }, [playing]);

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
          --surface: #121212;
          --surface-soft: #171717;
          --line: rgba(255, 255, 255, 0.1);
          --text: #ffffff;
          --muted: #c3c3c3;
          --muted-strong: #9f9f9f;
          --brand: #ff101f;
          --brand-deep: #d70716;
          --cream: #f5f1ea;
          --font-display: "Gotham", "Avenir Next", "Helvetica Neue", Arial, sans-serif;
          --font-body: "Gotham", "Avenir Next", "Helvetica Neue", Arial, sans-serif;
          --shadow: 0 28px 64px rgba(0, 0, 0, 0.28);
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
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          font-weight: 500;
        }

        #root {
          display: block !important;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          font: inherit;
        }

        img {
          display: block;
          max-width: 100%;
        }

        .lvs-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top right, rgba(255, 16, 31, 0.1), transparent 20%),
            linear-gradient(180deg, #050505 0%, #0a0a0a 100%);
        }

        .lvs-shell {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
        }

        .lvs-topbar {
          position: relative;
          z-index: 10;
          background: rgba(0, 0, 0, 0.92);
          border-bottom: 1px solid var(--line);
        }

        .lvs-topbar-inner {
          min-height: 84px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .lvs-brand {
          display: inline-flex;
          align-items: center;
          min-width: 0;
        }

        .lvs-brand-wordmark {
          width: 202px;
          height: auto;
        }

        .lvs-nav-links,
        .lvs-nav-actions {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .lvs-nav-links a {
          color: rgba(255, 255, 255, 0.88);
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 700;
          transition: color 180ms ease;
        }

        .lvs-nav-links a:hover,
        .lvs-nav-links a.is-active,
        .lvs-footer-column a:hover,
        .lvs-legal-links a:hover {
          color: var(--brand);
        }

        .lvs-nav-button,
        .lvs-primary-button,
        .lvs-secondary-button,
        .lvs-panel-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 0 22px;
          border-radius: 999px;
          border: 1px solid transparent;
          transition: transform 180ms ease, background 180ms ease, border-color 180ms ease, color 180ms ease;
        }

        .lvs-nav-button:hover,
        .lvs-primary-button:hover,
        .lvs-secondary-button:hover,
        .lvs-panel-link:hover {
          transform: translateY(-1px);
        }

        .lvs-nav-button-dark,
        .lvs-secondary-button,
        .lvs-panel-link {
          background: transparent;
          border-color: rgba(255, 255, 255, 0.38);
          color: #ffffff;
          font-family: var(--font-display);
          font-weight: 700;
        }

        .lvs-nav-button-red,
        .lvs-primary-button {
          background: #ffffff;
          color: #050505;
          font-family: var(--font-display);
          font-weight: 700;
        }

        .lvs-hero {
          position: relative;
          isolation: isolate;
          background:
            linear-gradient(90deg, rgba(0, 0, 0, 0.88) 0%, rgba(16, 7, 14, 0.58) 42%, rgba(65, 5, 26, 0.18) 72%, rgba(6, 4, 5, 0.72) 100%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.5) 100%),
            url("${HERO_BG_SRC}");
          background-position: 96% center;
          background-size: cover;
          background-repeat: no-repeat;
        }

        .lvs-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 72% 18%, rgba(255, 255, 255, 0.13), transparent 20%),
            radial-gradient(circle at 76% 76%, rgba(255, 16, 31, 0.18), transparent 26%);
          pointer-events: none;
        }

        .lvs-hero-inner {
          position: relative;
          z-index: 1;
          padding: 86px 0 104px;
        }

        .lvs-hero-copy {
          max-width: 640px;
        }

        .lvs-hero-title {
          margin: 0;
          max-width: 8ch;
          font-family: var(--font-display);
          font-size: clamp(3.4rem, 7vw, 6.2rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.055em;
        }

        .lvs-hero-copy p {
          margin: 24px 0 0;
          max-width: 540px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .lvs-hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        .lvs-secondary-button:hover,
        .lvs-panel-link:hover {
          border-color: rgba(255, 16, 31, 0.54);
          color: var(--brand);
        }

        .lvs-section-light,
        .lvs-section-dark {
          padding: 86px 0;
        }

        .lvs-section-light {
          background: var(--cream);
          color: #111111;
        }

        .lvs-section-dark {
          background: linear-gradient(180deg, #111111 0%, #050505 100%);
        }

        .lvs-section-kicker {
          display: inline-block;
          margin-bottom: 14px;
          color: #ff6a73;
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .lvs-section-light .lvs-section-kicker {
          color: var(--brand-deep);
        }

        .lvs-section-title {
          margin: 0;
          max-width: 12ch;
          font-family: var(--font-display);
          font-size: clamp(2.1rem, 5vw, 3.8rem);
          font-weight: 900;
          line-height: 0.98;
          letter-spacing: -0.04em;
        }

        .lvs-section-intro {
          margin: 18px 0 0;
          max-width: 760px;
          color: rgba(255, 255, 255, 0.74);
          font-size: 1.04rem;
          line-height: 1.72;
        }

        .lvs-section-light .lvs-section-intro {
          color: #3c3c3c;
        }

        .lvs-value-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
          margin-top: 40px;
        }

        .lvs-value-item {
          padding-top: 4px;
        }

        .lvs-value-item-icon {
          width: 54px;
          height: 54px;
          margin-bottom: 18px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, var(--brand) 0%, var(--brand-deep) 100%);
          color: #ffffff;
          box-shadow: 0 12px 24px rgba(215, 7, 22, 0.18);
        }

        .lvs-value-item-icon svg {
          width: 24px;
          height: 24px;
          display: block;
        }

        .lvs-value-item h3 {
          margin: 0;
          font-family: var(--font-display);
          font-size: 1.28rem;
          font-weight: 700;
          color: #111111;
        }

        .lvs-value-item p {
          margin: 14px 0 0;
          color: #3d3d3d;
          line-height: 1.72;
        }

        .lvs-cta-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
          gap: 30px;
          align-items: start;
        }

        .lvs-cta-copy h2 {
          margin: 0;
          max-width: 12ch;
          font-family: var(--font-display);
          font-size: clamp(2.15rem, 5vw, 3.8rem);
          font-weight: 900;
          line-height: 0.98;
          letter-spacing: -0.04em;
        }

        .lvs-cta-copy p {
          margin: 18px 0 0;
          max-width: 620px;
          color: rgba(255, 255, 255, 0.76);
          line-height: 1.72;
        }

        .lvs-inline-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .lvs-inline-actions {
          margin-top: 30px;
        }

        .lvs-cta-panel {
          padding: 30px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: var(--shadow);
        }

        .lvs-panel-kicker {
          display: inline-flex;
          align-items: center;
          min-height: 30px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(255, 16, 31, 0.14);
          color: #ff8b93;
          font-family: var(--font-display);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lvs-cta-panel h3 {
          margin: 18px 0 0;
          font-family: var(--font-display);
          font-size: 1.7rem;
          font-weight: 700;
          line-height: 1.08;
        }

        .lvs-cta-panel p {
          margin: 14px 0 0;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.68;
        }

        .lvs-stream-list {
          list-style: none;
          padding: 0;
          margin: 22px 0 0;
          display: grid;
          gap: 14px;
        }

        .lvs-stream-list li {
          position: relative;
          padding-left: 22px;
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.65;
        }

        .lvs-stream-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 11px;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--brand);
        }

        .lvs-panel-actions {
          display: grid;
          gap: 12px;
          margin-top: 24px;
        }

        .lvs-faq-wrap {
          margin-top: 36px;
          display: grid;
          gap: 12px;
        }

        .lvs-faq-item {
          width: 100%;
          padding: 0;
          border: 0;
          border-radius: 24px;
          background: #161616;
          color: #ffffff;
          text-align: left;
          cursor: pointer;
          overflow: hidden;
        }

        .lvs-faq-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 24px 26px;
        }

        .lvs-faq-head span:first-child {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
        }

        .lvs-faq-symbol {
          font-size: 1.7rem;
          line-height: 1;
          color: #ffffff;
        }

        .lvs-faq-body {
          padding: 0 26px 24px;
          color: rgba(255, 255, 255, 0.74);
          line-height: 1.74;
        }

        .lvs-community-section {
          padding: 0 0 88px;
          background: linear-gradient(180deg, #111111 0%, #050505 100%);
        }

        .lvs-community-card {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
          gap: 0;
          overflow: hidden;
          border-radius: 34px;
          background: #101010;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: var(--shadow);
        }

        .lvs-community-media {
          min-height: 420px;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.28) 100%),
            url("${COMMUNITY_BLOCK_SRC}");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }

        .lvs-community-copy {
          padding: 54px 52px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background:
            radial-gradient(circle at top right, rgba(255, 16, 31, 0.16), transparent 28%),
            linear-gradient(180deg, #131313 0%, #090909 100%);
        }

        .lvs-community-copy h2 {
          margin: 0;
          max-width: 11ch;
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 0.96;
          letter-spacing: -0.045em;
        }

        .lvs-community-copy p {
          margin: 18px 0 0;
          max-width: 28ch;
          color: rgba(255, 255, 255, 0.74);
          font-size: 1.02rem;
          line-height: 1.7;
        }

        .lvs-community-copy .lvs-primary-button {
          margin-top: 28px;
          align-self: flex-start;
          min-height: 56px;
          padding: 0 26px;
        }

        .lvs-artists-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(255, 16, 31, 0.12), transparent 24%),
            radial-gradient(circle at 90% 12%, rgba(255, 255, 255, 0.07), transparent 18%),
            linear-gradient(180deg, #050505 0%, #0a0a0a 100%);
        }

        .lvs-artists-hero {
          position: relative;
          overflow: hidden;
          padding: 88px 0 42px;
        }

        .lvs-artists-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 12%, rgba(255, 16, 31, 0.16), transparent 22%),
            radial-gradient(circle at 88% 18%, rgba(255, 255, 255, 0.08), transparent 16%);
          pointer-events: none;
        }

        .lvs-artists-hero-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
          gap: 30px;
          align-items: end;
        }

        .lvs-artists-copy {
          max-width: 720px;
        }

        .lvs-artists-title {
          margin: 0;
          max-width: 10ch;
          font-family: var(--font-display);
          font-size: clamp(3.3rem, 7vw, 6.1rem);
          font-weight: 900;
          line-height: 0.93;
          letter-spacing: -0.055em;
        }

        .lvs-artists-copy p {
          margin: 24px 0 0;
          max-width: 620px;
          color: rgba(255, 255, 255, 0.84);
          font-size: 1.05rem;
          line-height: 1.74;
        }

        .lvs-artists-panel {
          padding: 30px;
          border-radius: 34px;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: var(--shadow);
        }

        .lvs-artists-panel-label {
          display: inline-flex;
          align-items: center;
          min-height: 30px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(255, 16, 31, 0.14);
          color: #ff8b93;
          font-family: var(--font-display);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lvs-artists-panel h3 {
          margin: 18px 0 0;
          max-width: 12ch;
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .lvs-artists-panel p {
          margin: 16px 0 0;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.7;
        }

        .lvs-artists-panel-list {
          list-style: none;
          padding: 0;
          margin: 22px 0 0;
          display: grid;
          gap: 14px;
        }

        .lvs-artists-panel-list li {
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.86);
          line-height: 1.55;
        }

        .lvs-artists-marquee {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
        }

        .lvs-artists-marquee-track {
          display: flex;
          gap: 18px;
          min-width: max-content;
          padding: 18px 0;
        }

        .lvs-artists-marquee-track span {
          color: rgba(255, 255, 255, 0.9);
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .lvs-artists-features {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          margin-top: 38px;
        }

        .lvs-artists-feature {
          padding: 28px;
          border-radius: 28px;
          background: #ffffff;
          border: 1px solid rgba(17, 17, 17, 0.08);
          box-shadow: 0 24px 44px rgba(0, 0, 0, 0.08);
        }

        .lvs-artists-feature span {
          display: inline-block;
          min-height: 30px;
          padding: 5px 12px 0;
          border-radius: 999px;
          background: rgba(255, 16, 31, 0.08);
          color: var(--brand-deep);
          font-family: var(--font-display);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lvs-artists-feature h3 {
          margin: 18px 0 0;
          color: #111111;
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 900;
          line-height: 1.03;
          letter-spacing: -0.03em;
        }

        .lvs-artists-feature p {
          margin: 14px 0 0;
          color: #3c3c3c;
          line-height: 1.72;
        }

        .lvs-artists-pillar-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 30px;
          align-items: start;
        }

        .lvs-artists-pillar-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .lvs-artists-pillar-card {
          padding: 26px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .lvs-artists-pillar-card span {
          display: block;
          color: #ff6a73;
          font-family: var(--font-display);
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .lvs-artists-pillar-card h3 {
          margin: 14px 0 0;
          font-family: var(--font-display);
          font-size: 1.26rem;
          font-weight: 700;
          line-height: 1.12;
        }

        .lvs-artists-pillar-card p {
          margin: 12px 0 0;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.68;
        }

        .lvs-artists-flow-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin-top: 36px;
        }

        .lvs-artists-flow-card {
          padding: 28px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .lvs-artists-flow-card span {
          display: inline-block;
          color: #ff6a73;
          font-family: var(--font-display);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lvs-artists-flow-card h3 {
          margin: 16px 0 0;
          font-family: var(--font-display);
          font-size: 1.32rem;
          font-weight: 900;
          line-height: 1.06;
          letter-spacing: -0.03em;
        }

        .lvs-artists-flow-card p {
          margin: 12px 0 0;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.7;
        }

        .lvs-artists-cta-card {
          padding: 52px;
          border-radius: 34px;
          background:
            radial-gradient(circle at top right, rgba(255, 16, 31, 0.18), transparent 30%),
            linear-gradient(180deg, #151515 0%, #080808 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: var(--shadow);
        }

        .lvs-artists-cta-card h2 {
          margin: 0;
          max-width: 12ch;
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 0.96;
          letter-spacing: -0.045em;
        }

        .lvs-artists-cta-card p {
          margin: 18px 0 0;
          max-width: 56ch;
          color: rgba(255, 255, 255, 0.74);
          line-height: 1.72;
        }

        .lvs-footer {
          padding: 118px 0 34px;
          background: #000000;
          border-top: 1px solid var(--line);
        }

        .lvs-footer-grid {
          display: grid;
          grid-template-columns: auto repeat(3, minmax(120px, 1fr)) auto;
          gap: 52px;
          align-items: start;
        }

        .lvs-footer-brand img {
          width: 148px;
          height: auto;
        }

        .lvs-footer-extras {
          display: grid;
          gap: 22px;
          justify-items: center;
        }

        .lvs-footer-column h4 {
          margin: 0 0 16px;
          color: #ffffff;
          font-family: var(--font-display);
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lvs-footer-column a {
          display: block;
          margin-bottom: 12px;
          color: var(--muted-strong);
          transition: color 180ms ease;
        }

        .lvs-footer-socials {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .lvs-footer-download {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .lvs-store-badge {
          min-width: 124px;
          min-height: 42px;
          padding: 0 12px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #ffffff;
          transition: border-color 180ms ease, transform 180ms ease, color 180ms ease;
        }

        .lvs-store-badge svg {
          width: 16px;
          height: 16px;
          display: block;
          flex: 0 0 auto;
        }

        .lvs-store-badge-copy {
          display: grid;
          gap: 2px;
        }

        .lvs-store-badge-copy small {
          font-size: 0.58rem;
          color: rgba(255, 255, 255, 0.62);
          line-height: 1;
        }

        .lvs-store-badge-copy strong {
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 700;
          line-height: 1.1;
        }

        .lvs-store-badge:hover {
          transform: translateY(-1px);
          border-color: rgba(255, 16, 31, 0.4);
          color: var(--brand);
        }

        .lvs-social-link {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #1c1c1c;
          color: #ffffff;
          transition: background 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .lvs-social-link svg {
          width: 18px;
          height: 18px;
          display: block;
        }

        .lvs-social-link:hover {
          background: #242424;
          color: var(--brand);
          transform: translateY(-1px);
        }

        .lvs-footer-bottom {
          margin-top: 78px;
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

        .lvs-legal-links {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .lvs-legal-links a {
          color: #7f7f7f;
          transition: color 180ms ease;
        }

        @media (max-width: 1120px) {
          .lvs-cta-grid,
          .lvs-artists-hero-inner,
          .lvs-artists-pillar-layout,
          .lvs-community-card,
          .lvs-footer-grid {
            grid-template-columns: 1fr;
          }

          .lvs-artists-pillar-grid,
          .lvs-artists-features {
            grid-template-columns: 1fr;
          }

          .lvs-footer-socials {
            justify-content: flex-start;
          }

          .lvs-footer-extras,
          .lvs-footer-download {
            justify-items: start;
            justify-content: flex-start;
          }
        }

        @media (max-width: 920px) {
          .lvs-value-grid {
            grid-template-columns: 1fr;
          }

          .lvs-artists-flow-grid {
            grid-template-columns: 1fr;
          }

          .lvs-topbar-inner {
            padding: 18px 0;
            align-items: flex-start;
            flex-direction: column;
          }

          .lvs-nav-actions {
            width: 100%;
          }

          .lvs-nav-button {
            flex: 1 1 auto;
          }
        }

        @media (max-width: 760px) {
          .lvs-shell {
            width: min(100% - 28px, 1180px);
          }

          .lvs-nav-links {
            display: none;
          }

          .lvs-hero-inner {
            padding: 62px 0 78px;
          }

          .lvs-artists-hero {
            padding: 62px 0 34px;
          }

          .lvs-artists-panel,
          .lvs-artists-feature,
          .lvs-artists-pillar-card,
          .lvs-artists-flow-card,
          .lvs-artists-cta-card {
            border-radius: 24px;
          }

          .lvs-artists-cta-card {
            padding: 34px 26px;
          }

          .lvs-hero {
            background-position: 92% center;
          }

          .lvs-hero-title {
            max-width: none;
          }

          .lvs-section-light,
          .lvs-section-dark {
            padding: 68px 0;
          }

          .lvs-cta-panel,
          .lvs-faq-item {
            border-radius: 22px;
          }

          .lvs-community-section {
            padding-bottom: 68px;
          }

          .lvs-community-media {
            min-height: 280px;
          }

          .lvs-community-copy {
            padding: 34px 26px;
          }
        }
      `}</style>

      <div className="lvs-page">
        <audio
          ref={audioRef}
          preload="none"
          src={RADIO_STREAM_URL}
          onError={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          style={{ display: 'none' }}
        />

        <header className="lvs-topbar">
          <div className="lvs-shell lvs-topbar-inner">
            <a className="lvs-brand" href={HOME_URL} aria-label="La Voz Salsa">
              <img className="lvs-brand-wordmark" src={HEADER_LOGO_SRC} alt="La Voz Salsa" />
            </a>

            <nav className="lvs-nav-links" aria-label="Navegacion principal">
              {navLinks.map((item) => {
                const isActive = item.href.startsWith('/') && normalizePathname(item.href) === currentPath;

                return (
                <a key={item.label} href={item.href} className={isActive ? 'is-active' : undefined}>
                  {item.label}
                </a>
                );
              })}
            </nav>

            <div className="lvs-nav-actions">
              <a className="lvs-nav-button lvs-nav-button-dark" href={isArtistsPage ? ARTISTS_APP_URL : LIVE_STREAMING_URL}>
                {isArtistsPage ? 'Hub artístico' : 'Live Streaming'}
              </a>
              <a className="lvs-nav-button lvs-nav-button-red" href={ONE_LINK_URL}>
                Abrir app
              </a>
            </div>
          </div>
        </header>

        <main>
          {isArtistsPage ? (
            <div className="lvs-artists-page">
              <section className="lvs-artists-hero">
                <div className="lvs-shell lvs-artists-hero-inner">
                  <div className="lvs-artists-copy">
                    <span className="lvs-section-kicker">La Voz Salsa para artistas</span>
                    <h1 className="lvs-artists-title">Donde la salsa independiente encuentra escenario.</h1>
                    <p>
                      La Voz Salsa está construyendo una casa digital para artistas independientes del género: perfiles, comunidad, playlists, contenido y live streaming dentro de un ecosistema que sí entiende la salsa.
                    </p>

                    <div className="lvs-hero-actions">
                      <a className="lvs-primary-button" href={ARTISTS_APP_URL}>
                        Ver hub de artistas
                      </a>
                      <a className="lvs-secondary-button" href={PLAYLISTS_URL}>
                        Ver playlists
                      </a>
                      <a className="lvs-secondary-button" href={LIVE_STREAMING_URL}>
                        Live Streaming
                      </a>
                    </div>
                  </div>

                  <aside className="lvs-artists-panel">
                    <span className="lvs-artists-panel-label">Pensado para el género</span>
                    <h3>Más que distribución: presencia salsera con contexto.</h3>
                    <p>
                      Aquí el artista no entra a una vitrina genérica. Entra a una plataforma donde la música, la narrativa y la comunidad se mueven alrededor de la salsa.
                    </p>

                    <ul className="lvs-artists-panel-list">
                      <li>Perfiles artísticos con identidad, historia y presencia visual.</li>
                      <li>Puentes entre artista, comunidad, playlists y vitrinas editoriales.</li>
                      <li>Espacios para contenido, conversación y experiencias de live streaming.</li>
                    </ul>
                  </aside>
                </div>
              </section>

              <section className="lvs-artists-marquee" aria-label="Mensajes clave para artistas">
                <div className="lvs-artists-marquee-track">
                  {[...artistMarqueeItems, ...artistMarqueeItems, ...artistMarqueeItems].map((item, index) => (
                    <span key={`${item}-${index}`}>{item}</span>
                  ))}
                </div>
              </section>

              <section className="lvs-section-light">
                <div className="lvs-shell">
                  <span className="lvs-section-kicker">Herramientas para crecer con identidad</span>
                  <h2 className="lvs-section-title">No queremos más artistas escondidos dentro de plataformas genéricas.</h2>
                  <p className="lvs-section-intro">
                    Esta página es el primer paso para contarle al artista independiente de la salsa que aquí tiene un ecosistema propio: oyentes, contexto cultural, visibilidad y conversación.
                  </p>

                  <div className="lvs-artists-features">
                    {artistFeatureItems.map((item, index) => (
                      <article key={item.title} className="lvs-artists-feature">
                        <span>{`Bloque 0${index + 1}`}</span>
                        <h3>{item.title}</h3>
                        <p>{item.copy}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section className="lvs-section-dark">
                <div className="lvs-shell lvs-artists-pillar-layout">
                  <div className="lvs-cta-copy">
                    <span className="lvs-section-kicker">Una plataforma para construir carrera</span>
                    <h2>No solo para sonar. También para posicionarte.</h2>
                    <p>
                      La idea es simple: si eres artista independiente de la salsa, La Voz Salsa debe ayudarte a existir mejor dentro del mundo digital. No solo con reproducción, también con relato, contexto, visibilidad y comunidad.
                    </p>

                    <div className="lvs-inline-actions">
                      <a className="lvs-secondary-button" href={ARTISTS_APP_URL}>
                        Ver artistas
                      </a>
                      <a className="lvs-secondary-button" href={APP_URL}>
                        Abrir app
                      </a>
                    </div>
                  </div>

                  <div className="lvs-artists-pillar-grid">
                    {artistPillarItems.map((item) => (
                      <article key={item.title} className="lvs-artists-pillar-card">
                        <span>{item.eyebrow}</span>
                        <h3>{item.title}</h3>
                        <p>{item.copy}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section className="lvs-section-dark">
                <div className="lvs-shell">
                  <span className="lvs-section-kicker">Cómo se mueve la experiencia</span>
                  <h2 className="lvs-section-title">De artista emergente a presencia reconocible.</h2>
                  <p className="lvs-section-intro">
                    Pensamos esta experiencia como una ruta clara: aparecer, entrar en circulación y convertir escucha en relación con la comunidad salsera.
                  </p>

                  <div className="lvs-artists-flow-grid">
                    {artistFlowItems.map((item) => (
                      <article key={item.title} className="lvs-artists-flow-card">
                        <span>{item.step}</span>
                        <h3>{item.title}</h3>
                        <p>{item.copy}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section className="lvs-community-section">
                <div className="lvs-shell">
                  <div className="lvs-artists-cta-card">
                    <span className="lvs-section-kicker">Listo para entrar</span>
                    <h2>La salsa independiente merece una plataforma que la represente.</h2>
                    <p>
                      Vamos a convertir esta página en la puerta de entrada para artistas, managers, sellos y proyectos que quieren crecer dentro de una marca que vive la salsa desde adentro.
                    </p>

                    <div className="lvs-hero-actions">
                      <a className="lvs-primary-button" href={ARTISTS_APP_URL}>
                        Ver artistas
                      </a>
                      <a className="lvs-secondary-button" href={LIVE_STREAMING_URL}>
                        Ver live streaming
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <>
              <section className="lvs-hero">
                <div className="lvs-shell lvs-hero-inner">
                  <div className="lvs-hero-copy">
                    <h1 className="lvs-hero-title">Toda la salsa. Todo en un solo lugar.</h1>

                    <p>
                      Escucha radio en vivo, descubre canciones, sigue artistas, entra a la comunidad y descarga la app gratuita de La Voz Salsa.
                    </p>

                    <div className="lvs-hero-actions">
                      <button className="lvs-primary-button" type="button" onClick={() => setPlaying((value) => !value)}>
                        {playing ? 'Pausar reproduccion' : 'Escuchar gratis'}
                      </button>
                      <a className="lvs-secondary-button" href={ONE_LINK_URL}>
                        Descargar app
                      </a>
                      <a className="lvs-secondary-button" href={LIVE_STREAMING_URL}>
                        Ver streaming
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <section className="lvs-section-light">
                <div className="lvs-shell">
                  <span className="lvs-section-kicker">Música, radio y live streaming</span>
                  <h2 className="lvs-section-title">La cultura salsera reunida en una sola plataforma.</h2>
                  <p className="lvs-section-intro">
                    Escucha nuestra emisora en vivo, disfruta nuestros programas en live streaming y participa en un chat interactivo creado para quienes viven la salsa todos los días.
                  </p>

                  <div className="lvs-value-grid">
                    {valueItems.map((item) => (
                      <article key={item.title} className="lvs-value-item">
                        <div className="lvs-value-item-icon">
                          <ValueIcon icon={item.icon} />
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.copy}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section className="lvs-section-dark">
                <div className="lvs-shell lvs-cta-grid">
                  <div className="lvs-cta-copy">
                    <span className="lvs-section-kicker">Descarga la app gratis</span>
                    <h2>Lleva la salsa contigo y descubre qué está sonando.</h2>
                    <p>
                      En la app puedes escuchar la señal, ver nombres de temas y artistas, consultar canciones emitidas anteriormente, recibir novedades y entrar a la comunidad salsera.
                    </p>

                    <div className="lvs-inline-actions">
                      <a className="lvs-secondary-button" href={ONE_LINK_URL}>
                        Descargar app
                      </a>
                      <a className="lvs-secondary-button" href={LIVE_STREAMING_URL}>
                        Live Streaming
                      </a>
                    </div>
                  </div>

                  <aside className="lvs-cta-panel">
                    <span className="lvs-panel-kicker">Dentro de la app</span>
                    <h3>Radio, historial musical, noticias y comunidad.</h3>
                    <p>
                      Instálala gratis y usa un acceso rápido para seguir la salsa desde tu celular, tu navegador o el dispositivo donde estés escuchando.
                    </p>

                    <ul className="lvs-stream-list">
                      {panelItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <div className="lvs-panel-actions">
                      <button className="lvs-primary-button" type="button" onClick={() => setPlaying((value) => !value)}>
                        {playing ? 'Pausar reproduccion' : 'Escuchar en vivo'}
                      </button>
                      <a className="lvs-panel-link" href={ONE_LINK_URL}>
                        Abrir la app
                      </a>
                      <a className="lvs-panel-link" href={LIVE_STREAMING_URL}>
                        Ver streaming
                      </a>
                    </div>
                  </aside>
                </div>
              </section>

              <section className="lvs-section-dark">
                <div className="lvs-shell">
                  <span className="lvs-section-kicker">Preguntas frecuentes</span>
                  <h2 className="lvs-section-title">Antes de entrar, esto es lo esencial.</h2>
                  <p className="lvs-section-intro">
                    Resolvemos rápido qué encuentras en La Voz Salsa, cómo descargar la app y como descubrir lo mejor de la salsa romantica y clasica.
                  </p>

                  <div className="lvs-faq-wrap">
                    {faqItems.map((item, index) => {
                      const isOpen = openFaqIndex === index;

                      return (
                        <button
                          key={item.question}
                          type="button"
                          className="lvs-faq-item"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                        >
                          <div className="lvs-faq-head">
                            <span>{item.question}</span>
                            <span className="lvs-faq-symbol">{isOpen ? '−' : '+'}</span>
                          </div>
                          {isOpen ? <div className="lvs-faq-body">{item.answer}</div> : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              <section className="lvs-community-section">
                <div className="lvs-shell">
                  <div className="lvs-community-card">
                    <div className="lvs-community-media" aria-hidden="true" />

                    <div className="lvs-community-copy">
                      <span className="lvs-section-kicker">La comunidad primero</span>
                      <h2>¡Una pasión hecha comunidad!</h2>
                      <p>Hecha por salseros para los salseros. Conecta con una comunidad que habla el mismo idioma: La Salsa.</p>
                      <a className="lvs-primary-button" href={ONE_LINK_URL}>
                        Descargar app
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>

        <footer className="lvs-footer">
          <div className="lvs-shell">
            <div className="lvs-footer-grid">
              <div className="lvs-footer-brand">
                <img src={FOOTER_LOGO_SRC} alt="lavozsalsa.com" />
              </div>

              {footerColumns.map((column) => (
                <div key={column.title} className="lvs-footer-column">
                  <h4>{column.title}</h4>
                  {column.links.map((link) => (
                    <a key={link.label} href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}

              <div className="lvs-footer-extras">
                <div className="lvs-footer-socials" aria-label="Redes sociales">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      className="lvs-social-link"
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

                <div className="lvs-footer-download" aria-label="Descargar la app">
                  {storeBadges.map((item) => (
                    <a key={item.label} className="lvs-store-badge" href={item.href}>
                      <StoreBadgeIcon icon={item.icon} />
                      <span className="lvs-store-badge-copy">
                        <small>Descargar en</small>
                        <strong>{item.label}</strong>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lvs-footer-bottom">
              <div className="lvs-legal-links">
                <a href={PRIVACY_URL}>Privacidad</a>
                <a href={TERMS_URL}>Terminos y condiciones</a>
                <a href={COOKIES_URL}>Cookies</a>
              </div>

              <span>© 2026 La Voz Salsa. Todos los derechos reservados.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
