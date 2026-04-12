import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

const HOME_URL = '/';
const APP_URL = 'https://app.lavozsalsa.com/';
const DOWNLOAD_URL = 'https://onelink.to/w5n2k9';
const PRIVACY_URL = 'https://app.lavozsalsa.com/privacidad';
const TERMS_URL = 'https://app.lavozsalsa.com/terminos';
const COOKIES_URL = 'https://app.lavozsalsa.com/politica-de-cookies';

const HEADER_LOGO_SRC = '/brand/logo-lavozsalsa-header-red.png';
const FOOTER_LOGO_SRC = '/brand/logo-lavozsalsa-dotcom-white.png';
const HERO_IMAGE_SRC = '/media/premium-hero.jpg';
const BENEFITS_IMAGE_SRC = '/media/premium-benefits.jpg';
const COMMUNITY_IMAGE_SRC = '/media/premium-community.jpg';

const navLinks = [
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Premium', href: '#premium' },
  { label: 'FAQ', href: '#faq' },
];

const premiumBenefits = [
  {
    icon: 'ads',
    title: 'Escucha sin anuncios',
    copy: 'Vive la salsa sin interrupciones y con una experiencia más limpia dentro de la app.',
  },
  {
    icon: 'offline',
    title: 'Modo offline',
    copy: 'Descarga tu música y sigue escuchando aun cuando no tengas conexión.',
  },
  {
    icon: 'exclusive',
    title: 'Playlists exclusivas',
    copy: 'Accede a selecciones reservadas para oyentes que quieren ir más allá del catálogo abierto.',
  },
  {
    icon: 'playlist',
    title: 'Crea tus playlists',
    copy: 'Organiza tu propia colección salsera. Los usuarios gratuitos no pueden crear playlists propias.',
  },
  {
    icon: 'favorites',
    title: 'Favoritos y biblioteca personal',
    copy: 'Guarda canciones, arma tu biblioteca y vuelve rápido a lo que más te mueve.',
  },
  {
    icon: 'support',
    title: 'Apoyas la salsa nueva',
    copy: 'Tu membresía ayuda a fortalecer una plataforma dedicada a artistas independientes y nuevas propuestas del género.',
  },
];

const comparisonRows = [
  { label: 'Escuchar música en la plataforma', free: true, premium: true },
  { label: 'Sin anuncios', free: false, premium: true },
  { label: 'Modo offline', free: false, premium: true },
  { label: 'Playlists exclusivas', free: false, premium: true },
  { label: 'Crear playlists propias', free: false, premium: true, highlight: true },
  { label: 'Guardar favoritos y biblioteca personal', free: false, premium: true },
];

const faqItems = [
  {
    question: '¿Qué incluye La Voz Salsa Premium?',
    answer:
      'Incluye escucha sin anuncios, modo offline, acceso a playlists exclusivas, guardar canciones favoritas, biblioteca personal y la posibilidad de crear tus propias playlists.',
  },
  {
    question: '¿Cuál es la diferencia entre usuario gratuito y Premium?',
    answer:
      'El usuario gratuito puede escuchar música dentro de la plataforma. El usuario Premium además disfruta una experiencia sin anuncios, acceso offline y la opción de crear playlists propias.',
  },
  {
    question: '¿Puedo escuchar música sin internet?',
    answer: 'Sí. Uno de los beneficios del plan Premium es el modo offline.',
  },
  {
    question: '¿Puedo crear mis propias playlists?',
    answer:
      'Sí, pero solo con La Voz Salsa Premium. Los usuarios gratuitos no pueden crear playlists propias.',
  },
  {
    question: '¿Por qué pagar por La Voz Salsa Premium?',
    answer:
      'Porque además de obtener beneficios exclusivos, apoyas una plataforma dedicada a impulsar la salsa nueva y a los artistas independientes.',
  },
  {
    question: '¿Puedo cancelar mi suscripción?',
    answer:
      'Sí. La gestión de la suscripción dependerá del medio por el cual hayas realizado la compra.',
  },
];

const footerColumns = [
  {
    title: 'Premium',
    links: [
      { label: 'Beneficios', href: '#beneficios' },
      { label: 'Comparación', href: '#comparacion' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'App',
    links: [
      { label: 'Abrir app', href: APP_URL },
      { label: 'Descargar app', href: DOWNLOAD_URL },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidad', href: PRIVACY_URL },
      { label: 'Términos', href: TERMS_URL },
      { label: 'Cookies', href: COOKIES_URL },
    ],
  },
];

function BenefitIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'ads':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 7h10a3 3 0 0 1 0 6h-1l2.5 4H13l-2-3H8v3H5V7Zm3 3v1h6a.5.5 0 0 0 0-1H8Z" fill="currentColor" />
        </svg>
      );
    case 'offline':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a8 8 0 1 1-8 8H1l4 4 4-4H6a6 6 0 1 0 6-6V3Z" fill="currentColor" />
        </svg>
      );
    case 'exclusive':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 2 2.9 5.9 6.5 1-4.7 4.6 1.1 6.5L12 17l-5.8 3 1.1-6.5L2.6 9l6.5-1L12 2Z" fill="currentColor" />
        </svg>
      );
    case 'playlist':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h10v2H4V7Zm0 4h10v2H4v-2Zm0 4h6v2H4v-2Zm12-7.5V16a2.5 2.5 0 1 0 2 2.45V9.2l4-1.1V5.9l-6 1.6Z" fill="currentColor" />
        </svg>
      );
    case 'favorites':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20.3 4.9 14c-1.5-1.3-2.4-3.2-2.4-5.2A4.8 4.8 0 0 1 7.3 4c1.8 0 3.4.8 4.5 2.1A5.8 5.8 0 0 1 16.7 4a4.8 4.8 0 0 1 4.8 4.8c0 2-.9 3.9-2.4 5.2L12 20.3Z" fill="currentColor" />
        </svg>
      );
    case 'support':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a8 8 0 0 0-8 8v3a2 2 0 0 0 2 2h2v-6H5.1a6.9 6.9 0 0 1 13.8 0H16v6h2a2 2 0 0 0 2-2v-3a8 8 0 0 0-8-8Zm-3 15h6v2H9v-2Z" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

function CheckOrCross({ active }: { active: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9.6 16.8-4.4-4.4 1.7-1.7 2.7 2.7 7.5-7.5 1.7 1.7-9.2 9.2Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m7.4 6 4.6 4.6L16.6 6 18 7.4 13.4 12l4.6 4.6-1.4 1.4-4.6-4.6-4.6 4.6L6 16.6l4.6-4.6L6 7.4 7.4 6Z" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 18 18 6M10 6h8v8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
    </svg>
  );
}

function App() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <>
      <StatusBar style="light" />
      <style>{`
        :root {
          color-scheme: dark;
          --bg: #070707;
          --bg-soft: #111112;
          --cream: #f3eee8;
          --cream-strong: #fffaf5;
          --ink: #111111;
          --muted: #b8aea4;
          --muted-dark: #5a534c;
          --red: #ff2026;
          --red-deep: #a31218;
          --line: rgba(255,255,255,0.12);
          --line-dark: rgba(17,17,17,0.1);
          --radius-xl: 36px;
          --radius-lg: 28px;
          --shadow-soft: 0 24px 80px rgba(0,0,0,0.22);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: var(--bg);
          color: var(--cream-strong);
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
        .lvp-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(255, 32, 38, 0.18), transparent 34%),
            linear-gradient(180deg, #070707 0%, #0a0a0b 100%);
        }

        .lvp-shell {
          width: min(1180px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .lvp-topbar {
          position: sticky;
          top: 0;
          z-index: 30;
          backdrop-filter: blur(18px);
          background: rgba(7,7,7,0.7);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .lvp-topbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          min-height: 88px;
        }

        .lvp-brand img {
          width: 188px;
          display: block;
        }

        .lvp-nav {
          display: flex;
          align-items: center;
          gap: 26px;
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          color: rgba(255,255,255,0.76);
        }

        .lvp-nav a:hover {
          color: var(--red);
        }

        .lvp-nav-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          padding: 0 24px;
          border-radius: 999px;
          background: var(--cream-strong);
          color: var(--ink);
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }

        .lvp-nav-button:hover,
        .lvp-primary-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 40px rgba(255, 32, 38, 0.24);
        }

        .lvp-hero {
          position: relative;
          overflow: hidden;
          min-height: calc(100vh - 88px);
          background:
            linear-gradient(90deg, rgba(7,7,7,0.92) 0%, rgba(7,7,7,0.82) 42%, rgba(7,7,7,0.3) 72%, rgba(7,7,7,0.16) 100%),
            url('${HERO_IMAGE_SRC}') center right / cover no-repeat;
        }

        .lvp-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 76% 18%, rgba(38, 182, 255, 0.3), transparent 24%),
            radial-gradient(circle at 84% 60%, rgba(255, 26, 80, 0.26), transparent 28%);
          pointer-events: none;
        }

        .lvp-hero-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 640px);
          padding: 88px 0 84px;
        }

        .lvp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
          color: #ffb2b5;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 0.82rem;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
        }

        .lvp-eyebrow::before {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--red);
          box-shadow: 0 0 0 6px rgba(255,32,38,0.14);
        }

        .lvp-title {
          margin: 0;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(3.3rem, 7vw, 6.3rem);
          line-height: 0.92;
          letter-spacing: -0.05em;
          max-width: 9ch;
        }

        .lvp-subtitle {
          margin: 28px 0 0;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: clamp(1.22rem, 2vw, 1.9rem);
          line-height: 1.16;
          max-width: 18ch;
        }

        .lvp-copy {
          margin: 20px 0 0;
          max-width: 33rem;
          font-size: 1.08rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.76);
        }

        .lvp-price-chip {
          display: inline-flex;
          align-items: baseline;
          gap: 14px;
          margin-top: 28px;
          padding: 14px 20px;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.14);
          font-family: 'LVS Gotham Medium', Arial, sans-serif;
          color: rgba(255,255,255,0.78);
        }

        .lvp-price-chip strong {
          color: var(--cream-strong);
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: 1.56rem;
        }

        .lvp-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 30px;
        }

        .lvp-primary-button,
        .lvp-secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 60px;
          padding: 0 28px;
          border-radius: 999px;
          border: 1px solid transparent;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
        }

        .lvp-primary-button {
          background: var(--cream-strong);
          color: var(--ink);
        }

        .lvp-secondary-button {
          background: transparent;
          color: var(--cream-strong);
          border-color: rgba(255,255,255,0.22);
        }

        .lvp-secondary-button:hover {
          border-color: rgba(255,32,38,0.55);
          color: #ffcbce;
        }

        .lvp-button-icon {
          width: 20px;
          height: 20px;
        }

        .lvp-microcopy {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 22px;
          color: rgba(255,255,255,0.68);
          font-size: 0.94rem;
        }

        .lvp-microcopy span {
          display: inline-flex;
          align-items: center;
          gap: 9px;
        }

        .lvp-microcopy span::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--red);
        }

        .lvp-section {
          padding: 104px 0;
        }

        .lvp-section-cream {
          background: var(--cream);
          color: var(--ink);
        }

        .lvp-section-dark {
          background:
            radial-gradient(circle at top right, rgba(255, 36, 44, 0.14), transparent 28%),
            #09090a;
        }

        .lvp-section-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
          gap: 28px;
          align-items: end;
          margin-bottom: 38px;
        }

        .lvp-section-title {
          margin: 0;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(2.4rem, 5vw, 4.6rem);
          line-height: 0.96;
          letter-spacing: -0.05em;
          max-width: 10ch;
        }

        .lvp-section-intro {
          margin: 0;
          font-size: 1.02rem;
          line-height: 1.75;
          color: rgba(17,17,17,0.72);
        }

        .lvp-section-dark .lvp-section-intro {
          color: rgba(255,255,255,0.72);
        }

        .lvp-benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .lvp-benefit-card {
          padding: 28px;
          border-radius: var(--radius-lg);
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(17,17,17,0.06);
          box-shadow: 0 12px 50px rgba(22,20,18,0.07);
        }

        .lvp-benefit-icon {
          width: 56px;
          height: 56px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          background: var(--red);
          color: #fff;
          box-shadow: 0 14px 36px rgba(255,32,38,0.2);
        }

        .lvp-benefit-icon svg {
          width: 26px;
          height: 26px;
        }

        .lvp-benefit-card h3 {
          margin: 20px 0 12px;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 1.36rem;
          line-height: 1.08;
        }

        .lvp-benefit-card p {
          margin: 0;
          color: rgba(17,17,17,0.72);
          line-height: 1.72;
        }

        .lvp-premium-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 34px;
          align-items: stretch;
        }

        .lvp-visual-card,
        .lvp-comparison-card,
        .lvp-highlight-card,
        .lvp-final-card,
        .lvp-community-card {
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.09);
        }

        .lvp-visual-card {
          min-height: 540px;
          background:
            linear-gradient(180deg, rgba(7,7,7,0.06), rgba(7,7,7,0.42)),
            url('${BENEFITS_IMAGE_SRC}') center center / cover no-repeat;
          box-shadow: var(--shadow-soft);
        }

        .lvp-comparison-card {
          padding: 32px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(14px);
        }

        .lvp-comparison-card h3 {
          margin: 0;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 1.68rem;
        }

        .lvp-comparison-intro {
          margin: 14px 0 22px;
          color: rgba(255,255,255,0.74);
          line-height: 1.72;
        }

        .lvp-comparison-table {
          width: 100%;
          border-collapse: collapse;
        }

        .lvp-comparison-table th,
        .lvp-comparison-table td {
          padding: 16px 0;
          text-align: left;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .lvp-comparison-table th {
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          color: rgba(255,255,255,0.82);
        }

        .lvp-comparison-table td:first-child {
          color: rgba(255,255,255,0.9);
          padding-right: 18px;
        }

        .lvp-comparison-table td:not(:first-child) {
          width: 86px;
          text-align: center;
          color: #fff;
        }

        .lvp-comparison-badge {
          display: inline-flex;
          align-items: center;
          margin-top: 18px;
          padding: 12px 16px;
          border-radius: 18px;
          background: rgba(255,32,38,0.12);
          color: #ffb9bd;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
        }

        .lvp-comparison-mark {
          width: 24px;
          height: 24px;
          margin: 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .lvp-comparison-mark svg {
          width: 22px;
          height: 22px;
        }

        .lvp-highlight-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 340px);
          gap: 26px;
          padding: 34px;
          background:
            linear-gradient(135deg, rgba(255,32,38,0.22), rgba(255,32,38,0.04)),
            #13090b;
          box-shadow: var(--shadow-soft);
        }

        .lvp-highlight-card h3 {
          margin: 0;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(2rem, 4.2vw, 3.4rem);
          line-height: 0.98;
          letter-spacing: -0.04em;
          max-width: 11ch;
        }

        .lvp-highlight-card p {
          margin: 14px 0 0;
          color: rgba(255,255,255,0.74);
          line-height: 1.74;
          max-width: 34rem;
        }

        .lvp-highlight-rule {
          padding: 22px 24px;
          border-radius: 26px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .lvp-highlight-rule span {
          display: inline-block;
          margin-bottom: 10px;
          color: #ffb5b7;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 0.76rem;
        }

        .lvp-highlight-rule p {
          margin: 0;
          color: rgba(255,255,255,0.84);
        }

        .lvp-community-card {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          background: #131114;
          box-shadow: var(--shadow-soft);
        }

        .lvp-community-image {
          min-height: 500px;
          background:
            linear-gradient(180deg, rgba(7,7,7,0.08), rgba(7,7,7,0.45)),
            url('${COMMUNITY_IMAGE_SRC}') center center / cover no-repeat;
        }

        .lvp-community-copy {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .lvp-community-copy h2 {
          margin: 0;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(2.2rem, 5vw, 4rem);
          line-height: 0.96;
          letter-spacing: -0.05em;
          max-width: 10ch;
        }

        .lvp-community-copy p {
          margin: 18px 0 0;
          color: rgba(255,255,255,0.72);
          line-height: 1.76;
        }

        .lvp-faq-list {
          display: grid;
          gap: 14px;
          margin-top: 34px;
        }

        .lvp-faq-item {
          border-radius: 28px;
          border: 1px solid var(--line-dark);
          background: rgba(255,255,255,0.72);
          overflow: hidden;
        }

        .lvp-faq-item button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 24px 28px;
          background: transparent;
          border: 0;
          color: var(--ink);
          cursor: pointer;
          text-align: left;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 1.1rem;
        }

        .lvp-faq-answer {
          padding: 0 28px 24px;
          color: rgba(17,17,17,0.72);
          line-height: 1.72;
        }

        .lvp-faq-toggle {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(255,32,38,0.12);
          color: var(--red);
          flex-shrink: 0;
        }

        .lvp-final-card {
          padding: 42px;
          background:
            radial-gradient(circle at top right, rgba(255,32,38,0.18), transparent 28%),
            #0f0f10;
          box-shadow: var(--shadow-soft);
        }

        .lvp-final-card h2 {
          margin: 0;
          font-family: 'LVS Gotham Black', Arial, sans-serif;
          font-size: clamp(2.2rem, 5vw, 4rem);
          line-height: 0.96;
          letter-spacing: -0.05em;
          max-width: 9ch;
        }

        .lvp-final-card p {
          margin: 18px 0 0;
          max-width: 34rem;
          color: rgba(255,255,255,0.72);
          line-height: 1.76;
        }

        .lvp-final-price {
          margin-top: 24px;
          color: #ffb0b4;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 1rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .lvp-footer {
          padding: 48px 0 34px;
          border-top: 1px solid rgba(255,255,255,0.08);
          background: #060606;
        }

        .lvp-footer-top {
          display: grid;
          grid-template-columns: minmax(0, 280px) 1fr auto;
          gap: 26px;
          align-items: start;
        }

        .lvp-footer-brand img {
          width: 176px;
          display: block;
        }

        .lvp-footer-brand p {
          margin: 18px 0 0;
          color: rgba(255,255,255,0.64);
          line-height: 1.72;
        }

        .lvp-footer-columns {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .lvp-footer-column h3 {
          margin: 0 0 14px;
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
          font-size: 0.98rem;
        }

        .lvp-footer-column a {
          display: block;
          margin-top: 10px;
          color: rgba(255,255,255,0.68);
        }

        .lvp-footer-column a:hover {
          color: var(--red);
        }

        .lvp-store-stack {
          display: grid;
          gap: 12px;
          min-width: 210px;
        }

        .lvp-store-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 20px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          font-family: 'LVS Gotham Bold', Arial, sans-serif;
        }

        .lvp-store-button:hover {
          border-color: rgba(255,32,38,0.36);
          color: #ffb0b4;
        }

        .lvp-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-top: 28px;
          margin-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.48);
          font-size: 0.9rem;
        }

        @media (max-width: 1040px) {
          .lvp-nav { display: none; }
          .lvp-benefits-grid,
          .lvp-premium-layout,
          .lvp-community-card,
          .lvp-footer-top,
          .lvp-footer-columns,
          .lvp-section-header,
          .lvp-highlight-card {
            grid-template-columns: 1fr;
          }

          .lvp-visual-card,
          .lvp-community-image {
            min-height: 360px;
          }
        }

        @media (max-width: 720px) {
          .lvp-shell {
            width: min(100vw - 28px, 100%);
          }

          .lvp-topbar-inner {
            min-height: 78px;
          }

          .lvp-brand img {
            width: 154px;
          }

          .lvp-nav-button {
            min-height: 48px;
            padding: 0 18px;
          }

          .lvp-hero {
            min-height: auto;
            background-position: 70% center;
          }

          .lvp-hero-inner,
          .lvp-section {
            padding-top: 72px;
            padding-bottom: 72px;
          }

          .lvp-title,
          .lvp-section-title,
          .lvp-community-copy h2,
          .lvp-final-card h2 {
            max-width: none;
          }

          .lvp-highlight-card,
          .lvp-final-card,
          .lvp-community-copy,
          .lvp-comparison-card,
          .lvp-benefit-card {
            padding: 26px;
          }

          .lvp-actions,
          .lvp-footer-bottom {
            flex-direction: column;
            align-items: stretch;
          }

          .lvp-primary-button,
          .lvp-secondary-button,
          .lvp-store-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="lvp-page">
        <header className="lvp-topbar">
          <div className="lvp-shell lvp-topbar-inner">
            <a className="lvp-brand" href={HOME_URL} aria-label="La Voz Salsa Premium">
              <img src={HEADER_LOGO_SRC} alt="La Voz Salsa" />
            </a>

            <nav className="lvp-nav" aria-label="Navegación Premium">
              {navLinks.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <a className="lvp-nav-button" href={APP_URL}>
              Abrir app
            </a>
          </div>
        </header>

        <main>
          <section className="lvp-hero">
            <div className="lvp-shell lvp-hero-inner">
              <div>
                <span className="lvp-eyebrow">La Voz Salsa Premium</span>
                <h1 className="lvp-title">Escucha mejor. Vive la salsa sin interrupciones.</h1>
                <p className="lvp-subtitle">
                  Apoya la salsa nueva y disfruta una experiencia exclusiva dentro de La Voz Salsa.
                </p>
                <p className="lvp-copy">
                  Sin anuncios, modo offline, playlists propias y una biblioteca personal diseñada para oyentes que quieren ir más allá del play.
                </p>

                <div className="lvp-price-chip">
                  <strong>USD$14.99</strong>
                  <span>al año · menos de USD$1.25 al mes</span>
                </div>

                <div className="lvp-actions">
                  <a className="lvp-primary-button" href={APP_URL}>
                    Hazte Premium
                    <span className="lvp-button-icon">
                      <ArrowIcon />
                    </span>
                  </a>
                  <a className="lvp-secondary-button" href={DOWNLOAD_URL}>
                    Descargar app
                  </a>
                </div>

                <div className="lvp-microcopy">
                  <span>Disponible dentro de la app</span>
                  <span>Solo Premium crea playlists propias</span>
                  <span>Tu membresía apoya la salsa nueva</span>
                </div>
              </div>
            </div>
          </section>

          <section id="beneficios" className="lvp-section lvp-section-cream">
            <div className="lvp-shell">
              <div className="lvp-section-header">
                <div>
                  <span className="lvp-eyebrow">Beneficios Premium</span>
                  <h2 className="lvp-section-title">Todo lo que mejora cuando pasas a Premium.</h2>
                </div>
                <p className="lvp-section-intro">
                  La membresía no solo mejora tu experiencia: también fortalece un ecosistema que apuesta por la salsa nueva, los artistas independientes y una escucha más cuidada.
                </p>
              </div>

              <div className="lvp-benefits-grid">
                {premiumBenefits.map((item) => (
                  <article key={item.title} className="lvp-benefit-card">
                    <div className="lvp-benefit-icon">
                      <BenefitIcon icon={item.icon} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="premium" className="lvp-section lvp-section-dark">
            <div className="lvp-shell">
              <div className="lvp-premium-layout">
                <aside className="lvp-visual-card" aria-label="Escucha Premium en La Voz Salsa" />

                <div className="lvp-comparison-card" id="comparacion">
                  <span className="lvp-eyebrow">Free vs Premium</span>
                  <h3>La diferencia está en cómo vives cada escucha.</h3>
                  <p className="lvp-comparison-intro">
                    Premium está pensado para oyentes que quieren profundidad, continuidad y una experiencia más personal dentro de la app.
                  </p>

                  <table className="lvp-comparison-table">
                    <thead>
                      <tr>
                        <th>Función</th>
                        <th>Free</th>
                        <th>Premium</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => (
                        <tr key={row.label}>
                          <td>{row.label}</td>
                          <td>
                            <span className="lvp-comparison-mark">
                              <CheckOrCross active={row.free} />
                            </span>
                          </td>
                          <td>
                            <span className="lvp-comparison-mark">
                              <CheckOrCross active={row.premium} />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="lvp-comparison-badge">
                    Los usuarios gratuitos no pueden crear playlists propias.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="lvp-section lvp-section-dark">
            <div className="lvp-shell">
              <div className="lvp-highlight-card">
                <div>
                  <span className="lvp-eyebrow">Escuchar con intención</span>
                  <h3>Tu membresía también impulsa la salsa nueva.</h3>
                  <p>
                    Con La Voz Salsa Premium no solo escuchas mejor. También ayudas a sostener una plataforma que abre espacio a artistas independientes, lanzamientos recientes y nuevas propuestas del género.
                  </p>
                </div>

                <div className="lvp-highlight-rule">
                  <span>Regla importante</span>
                  <p>Solo Premium puede crear playlists propias y guardar una experiencia más personal dentro de la app.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="lvp-section lvp-section-dark">
            <div className="lvp-shell">
              <div className="lvp-community-card">
                <div className="lvp-community-image" aria-label="Comunidad Premium La Voz Salsa" />
                <div className="lvp-community-copy">
                  <span className="lvp-eyebrow">Una membresía con cultura</span>
                  <h2>Hecha para oyentes que quieren más que una app.</h2>
                  <p>
                    Premium conecta mejor con la forma en que un salsero escucha: sin prisa, con favoritos, con playlists propias y con una biblioteca que crece contigo.
                  </p>
                  <p>
                    Y al mismo tiempo sostiene un espacio donde la salsa nueva encuentra oídos dispuestos a descubrirla.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="faq" className="lvp-section lvp-section-cream">
            <div className="lvp-shell">
              <div className="lvp-section-header">
                <div>
                  <span className="lvp-eyebrow">Preguntas frecuentes</span>
                  <h2 className="lvp-section-title">Lo que un oyente debe tener claro antes de hacerse Premium.</h2>
                </div>
                <p className="lvp-section-intro">
                  Resolvemos rápido qué incluye la membresía, cómo funciona y por qué vale la pena para quienes viven la salsa con más intención.
                </p>
              </div>

              <div className="lvp-faq-list">
                {faqItems.map((item, index) => {
                  const isOpen = index === openFaq;
                  return (
                    <article key={item.question} className="lvp-faq-item">
                      <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen}>
                        <span>{item.question}</span>
                        <span className="lvp-faq-toggle">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen ? <div className="lvp-faq-answer">{item.answer}</div> : null}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="lvp-section lvp-section-dark">
            <div className="lvp-shell">
              <div className="lvp-final-card">
                <span className="lvp-eyebrow">Hazte Premium</span>
                <h2>La forma más completa de escuchar y apoyar la salsa que viene.</h2>
                <p>
                  Si ya encontraste en La Voz Salsa una comunidad, una radio y una app que sí entienden el género, Premium es la siguiente jugada natural.
                </p>
                <div className="lvp-final-price">USD$14.99 al año</div>
                <div className="lvp-actions">
                  <a className="lvp-primary-button" href={APP_URL}>
                    Hazte Premium
                    <span className="lvp-button-icon">
                      <ArrowIcon />
                    </span>
                  </a>
                  <a className="lvp-secondary-button" href={DOWNLOAD_URL}>
                    Descargar app
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="lvp-footer">
          <div className="lvp-shell">
            <div className="lvp-footer-top">
              <div className="lvp-footer-brand">
                <img src={FOOTER_LOGO_SRC} alt="lavozsalsa.com" />
                <p>Premium para oyentes que quieren escuchar mejor, guardar más y apoyar una plataforma que cree en la salsa nueva.</p>
              </div>

              <div className="lvp-footer-columns">
                {footerColumns.map((column) => (
                  <div key={column.title} className="lvp-footer-column">
                    <h3>{column.title}</h3>
                    {column.links.map((link) => (
                      <a key={link.label} href={link.href}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>

              <div className="lvp-store-stack">
                <a className="lvp-store-button" href={APP_URL}>
                  Abrir app
                </a>
                <a className="lvp-store-button" href={DOWNLOAD_URL}>
                  Descargar app
                </a>
              </div>
            </div>

            <div className="lvp-footer-bottom">
              <span>© 2026 La Voz Salsa. Todos los derechos reservados.</span>
              <span>premium.lavozsalsa.com</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
