import { StatusBar } from 'expo-status-bar';

type ArticleSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  links?: {
    label: string;
    href: string;
  }[];
  videoUrl?: string;
  profiles?: {
    name: string;
    image: string;
    alt?: string;
    text: string;
  }[];
};

type Article = {
  slug: string;
  legacyUrl?: string;
  category: string;
  title: string;
  excerpt: string;
  description: string;
  coverImage?: string;
  coverAlt?: string;
  shareImage?: string;
  featuredRank: number;
  readingTime: string;
  archiveLabel: string;
  updatedLabel: string;
  sections: ArticleSection[];
};

type Collection = {
  key: string;
  title: string;
  description: string;
  slugs: string[];
};

const { pressArticles, pressCollections } = require('./content/articles') as {
  pressArticles: Article[];
  pressCollections: Collection[];
};

const MAIN_SITE_URL = 'https://lavozsalsa.com';
const APP_URL = 'https://app.lavozsalsa.com';
const LIVE_URL = 'https://app.lavozsalsa.com/tv';
const ARTISTS_URL = 'https://artistas.lavozsalsa.com';
const PREMIUM_URL = 'https://premium.lavozsalsa.com';
const APP_DOWNLOAD_URL = 'https://onelink.to/w5n2k9';

const HOME_ALIASES = new Set(['/', '/pulso-salsero/']);
const HEADER_LOGO_SRC = '/brand/logo-lavozsalsa-header-red.png';
const FOOTER_LOGO_SRC = '/brand/logo-lavozsalsa-dotcom-white.png';

const NAV_LINKS = [
  { label: 'Estanterías', href: '#estanterias' },
  { label: 'Lo más leído', href: '#archivo' },
  { label: 'Perfiles', href: '#perfiles' },
];

const CATEGORY_TONES: Record<string, { bg: string; ink: string }> = {
  Guía: { bg: '#ffe3dd', ink: '#7d1218' },
  Archivo: { bg: '#fff1cd', ink: '#694300' },
  Historia: { bg: '#f9d9ea', ink: '#7f164d' },
  Ciudad: { bg: '#dff3f6', ink: '#004e5b' },
  Homenajes: { bg: '#efe3ff', ink: '#53248d' },
  Perfiles: { bg: '#e5edff', ink: '#193f93' },
};

function normalizePathname(pathname: string) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function articleHref(slug: string) {
  return `/${slug}/`;
}

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

function PulseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 13h4l2.2-4.8L12.5 18l2.7-6H21"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.1"
      />
    </svg>
  );
}

function StoryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 4h9a3 3 0 0 1 3 3v11l-4.2-2.8a1.6 1.6 0 0 0-1.8 0L8 18V7a3 3 0 0 0-2-2.8Z"
        fill="currentColor"
      />
      <path d="M6 4a3 3 0 0 0-3 3v11l5-3.3V7a3 3 0 0 0-2-3Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function CategoryPill({ category }: { category: string }) {
  const tone = CATEGORY_TONES[category] || CATEGORY_TONES.Guía;
  return (
    <span className="lvs-press-pill" style={{ backgroundColor: tone.bg, color: tone.ink }}>
      {category}
    </span>
  );
}

function HomeCard({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  return (
    <a className={`lvs-card ${compact ? 'is-compact' : ''}`} href={articleHref(article.slug)}>
      {article.coverImage ? (
        <div className="lvs-card-media">
          <img src={article.coverImage} alt={article.coverAlt || article.title} loading="lazy" decoding="async" />
        </div>
      ) : null}
      <div className="lvs-card-topline">
        <CategoryPill category={article.category} />
        <span>{article.readingTime}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <div className="lvs-card-link">
        <span>Leer historia</span>
        <ArrowIcon />
      </div>
    </a>
  );
}

function CollectionBlock({
  collection,
  articles,
}: {
  collection: Collection;
  articles: Article[];
}) {
  return (
    <section id={collection.key} className="lvs-collection">
      <div className="lvs-collection-head">
        <div>
          <span className="lvs-eyebrow">{collection.title}</span>
          <h2>{collection.title}</h2>
          <span className="lvs-collection-count">{articles.length} historias</span>
        </div>
        <p>{collection.description}</p>
      </div>
      <div className="lvs-collection-grid">
        {articles.map((article) => (
          <HomeCard key={article.slug} article={article} compact />
        ))}
      </div>
    </section>
  );
}

function ShelvesOverview() {
  return (
    <section id="estanterias" className="lvs-shelves">
      <div className="lvs-section-head">
        <div>
          <span className="lvs-eyebrow">Orden editorial</span>
          <h2>Así estamos organizando la sala</h2>
        </div>
        <p>
          Pulso Salsero se está construyendo por estanterías para que la migración no se vea como un montón de enlaces, sino como una sala con criterio, contexto y rutas claras de lectura.
        </p>
      </div>

      <div className="lvs-shelves-grid">
        {pressCollections.map((collection) => {
          const articles = collection.slugs
            .map((slug) => pressArticles.find((item) => item.slug === slug))
            .filter(Boolean) as Article[];
          const categoryLabels = [...new Set(articles.map((article) => article.category))];

          return (
            <a key={collection.key} className="lvs-shelf-card" href={`#${collection.key}`}>
              <div className="lvs-shelf-topline">
                <strong>{collection.title}</strong>
                <span>{articles.length} historias</span>
              </div>
              <p>{collection.description}</p>
              <div className="lvs-shelf-tags">
                {categoryLabels.map((label) => (
                  <CategoryPill key={`${collection.key}-${label}`} category={label} />
                ))}
              </div>
              <span className="lvs-card-link">
                Ver estantería
                <ArrowIcon />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function RelatedStories({ currentSlug, currentCategory }: { currentSlug: string; currentCategory: string }) {
  const related = pressArticles
    .filter((article) => article.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === currentCategory && b.category !== currentCategory) return -1;
      if (a.category !== currentCategory && b.category === currentCategory) return 1;
      return a.featuredRank - b.featuredRank;
    })
    .slice(0, 3);

  return (
    <section className="lvs-related">
      <div className="lvs-related-head">
        <span className="lvs-eyebrow">Sigue leyendo</span>
        <h2>Más historias para abrir conversación</h2>
      </div>
      <div className="lvs-related-grid">
        {related.map((article) => (
          <HomeCard key={article.slug} article={article} compact />
        ))}
      </div>
    </section>
  );
}

function ArticleActions() {
  const actions = [
    {
      title: 'Escucha la emisora',
      copy: 'Entra a la plataforma y sigue la programación de La Voz Salsa en cualquier momento.',
      href: APP_URL,
    },
    {
      title: 'Ver live streaming',
      copy: 'Conéctate con la programación en vivo y los contenidos especiales de la señal.',
      href: LIVE_URL,
    },
    {
      title: 'Abrir la plataforma',
      copy: 'Explora artistas, noticias, experiencia web y el ecosistema completo de La Voz Salsa.',
      href: MAIN_SITE_URL,
    },
    {
      title: 'Descargar la app',
      copy: 'Lleva La Voz Salsa en tu móvil y entra más rápido a la experiencia completa.',
      href: APP_DOWNLOAD_URL,
    },
  ];

  return (
    <section className="lvs-article-actions">
      <div className="lvs-article-actions-head">
        <span className="lvs-eyebrow">Sigue conectado</span>
        <h2>Continúa la experiencia dentro de La Voz Salsa</h2>
        <p>
          Después de leer en Pulso Salsero, puedes seguir escuchando la emisora, entrar al live, abrir la plataforma o descargar la app.
        </p>
      </div>
      <div className="lvs-article-actions-grid">
        {actions.map((action) => (
          <a key={action.title} className="lvs-article-action-card" href={action.href}>
            <strong>{action.title}</strong>
            <p>{action.copy}</p>
            <span className="lvs-card-link">
              Ir ahora
              <ArrowIcon />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function PressHome() {
  const ordered = [...pressArticles].sort((a, b) => a.featuredRank - b.featuredRank);
  const featured = ordered[0];
  const topStories = ordered.slice(1, 4);
  const mostRead = ordered.slice(0, 6);

  return (
    <>
      <section className="lvs-hero">
        <div className="lvs-hero-copy">
          <span className="lvs-eyebrow">Sala de prensa de La Voz Salsa</span>
          <h1>Pulso Salsero</h1>
          <p className="lvs-hero-lead">
            Noticias, archivo, perfiles y guías para seguir la salsa con contexto, criterio y una mirada de marca sobre lo que realmente mueve conversación.
          </p>
          <p className="lvs-hero-sublead">
            Abrimos la sala con las piezas históricas que más búsquedas y recordación siguen generando dentro del universo salsero.
          </p>
          <div className="lvs-hero-actions">
            <a className="lvs-btn lvs-btn-primary" href={articleHref(featured.slug)}>
              Leer historia destacada
            </a>
            <a className="lvs-btn lvs-btn-secondary" href="#destacados">
              Ver la sala
            </a>
          </div>
        </div>

        <div className="lvs-hero-panel">
          <div className="lvs-hero-stat">
            <PulseIcon />
            <div>
              <strong>{pressArticles.length}</strong>
              <span>Historias inaugurales</span>
            </div>
          </div>
          <div className="lvs-hero-note">
            <span className="lvs-hero-note-title">Lo primero que recuperamos</span>
            <p>
              Guías evergreen, archivo salsero y perfiles que siguen sosteniendo búsquedas orgánicas y conversación cultural alrededor del género.
            </p>
          </div>
          <ul className="lvs-hero-tags">
            <li>Guías</li>
            <li>Archivo</li>
            <li>Perfiles</li>
            <li>Ciudad</li>
          </ul>
        </div>
      </section>

      <section id="destacados" className="lvs-featured">
        <div className={`lvs-featured-main ${featured.coverImage ? 'has-cover' : ''}`}>
          {featured.coverImage ? (
            <div className="lvs-featured-media">
              <img src={featured.coverImage} alt={featured.coverAlt || featured.title} loading="lazy" decoding="async" />
            </div>
          ) : null}
          <div className="lvs-featured-header">
            <CategoryPill category={featured.category} />
            <span>{featured.archiveLabel}</span>
          </div>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <a className="lvs-text-link" href={articleHref(featured.slug)}>
            Leer completa
            <ArrowIcon />
          </a>
        </div>
        <div className="lvs-featured-grid">
          {topStories.map((article) => (
            <HomeCard key={article.slug} article={article} compact />
          ))}
        </div>
      </section>

      <ShelvesOverview />

      <section id="archivo" className="lvs-most-read">
        <div className="lvs-section-head">
          <div>
            <span className="lvs-eyebrow">Lo más leído</span>
            <h2>El primer pulso de la sala</h2>
          </div>
          <p>Este arranque prioriza las piezas con mejor recordación histórica y mejor potencial para sostener tráfico orgánico en la nueva etapa de La Voz Salsa.</p>
        </div>
        <div className="lvs-most-read-grid">
          {mostRead.map((article, index) => (
            <a key={article.slug} className="lvs-most-read-item" href={articleHref(article.slug)}>
              <span className="lvs-most-read-rank">{String(index + 1).padStart(2, '0')}</span>
              <div className="lvs-most-read-copy">
                <CategoryPill category={article.category} />
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </div>
              <ArrowIcon />
            </a>
          ))}
        </div>
      </section>

      {pressCollections.map((collection) => {
        const articles = collection.slugs
          .map((slug) => pressArticles.find((item) => item.slug === slug))
          .filter(Boolean) as Article[];

        return <CollectionBlock key={collection.key} collection={collection} articles={articles} />;
      })}
    </>
  );
}

function ArticlePage({ article }: { article: Article }) {
  return (
    <>
      <article className="lvs-article">
        <section className="lvs-article-hero">
          <div className="lvs-article-meta">
            <CategoryPill category={article.category} />
            <span>{article.archiveLabel}</span>
            <span>{article.readingTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p className="lvs-article-excerpt">{article.excerpt}</p>
          <div className="lvs-article-update">{article.updatedLabel}</div>
        </section>

        {article.coverImage ? (
          <div className="lvs-article-cover">
            <img src={article.coverImage} alt={article.coverAlt || article.title} loading="eager" decoding="async" />
          </div>
        ) : null}

        <div className="lvs-article-body">
          {article.sections.map((section) => (
            <section key={section.title} className="lvs-article-section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {section.links?.length ? (
                <div className="lvs-article-links">
                  {section.links.map((link) => (
                    <a key={`${section.title}-${link.href}`} className="lvs-article-link" href={link.href}>
                      <span>{link.label}</span>
                      <ArrowIcon />
                    </a>
                  ))}
                </div>
              ) : null}
              {section.videoUrl ? (
                <div className="lvs-video-embed">
                  <iframe
                    src={section.videoUrl}
                    title={`${article.title} video`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : null}
              {section.profiles?.length ? (
                <div className="lvs-profile-grid">
                  {section.profiles.map((profile) => (
                    <article key={`${section.title}-${profile.name}`} className="lvs-profile-card">
                      <img
                        className="lvs-profile-image"
                        src={profile.image}
                        alt={profile.alt || profile.name}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="lvs-profile-copy">
                        <h3>{profile.name}</h3>
                        <p>{profile.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>

        <ArticleActions />
      </article>

      <RelatedStories currentSlug={article.slug} currentCategory={article.category} />
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="lvs-not-found">
      <span className="lvs-eyebrow">Ruta no encontrada</span>
      <h1>Esta historia todavía no está dentro de Pulso Salsero.</h1>
      <p>
        Estamos migrando el archivo de La Voz Salsa por etapas. Por ahora puedes volver a la sala o explorar la plataforma principal.
      </p>
      <div className="lvs-hero-actions">
        <a className="lvs-btn lvs-btn-primary" href="/">
          Ir a Pulso Salsero
        </a>
        <a className="lvs-btn lvs-btn-secondary" href={MAIN_SITE_URL}>
          Volver a La Voz Salsa
        </a>
      </div>
    </section>
  );
}

export default function App() {
  const currentPath = normalizePathname(typeof window === 'undefined' ? '/' : window.location.pathname);
  const currentArticle = pressArticles.find((article) => articleHref(article.slug) === currentPath);
  const isHome = HOME_ALIASES.has(currentPath);

  return (
    <>
      <StatusBar style="dark" />
      <style>{`
        @font-face {
          font-family: 'Gotham';
          src: url('/fonts/GothamBook.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
        }

        @font-face {
          font-family: 'Gotham';
          src: url('/fonts/GothamMedium.ttf') format('truetype');
          font-weight: 500;
          font-style: normal;
        }

        @font-face {
          font-family: 'Gotham';
          src: url('/fonts/GothamBold.ttf') format('truetype');
          font-weight: 700;
          font-style: normal;
        }

        @font-face {
          font-family: 'Gotham Display';
          src: url('/fonts/GothamBlack.otf') format('opentype');
          font-weight: 900;
          font-style: normal;
        }

        :root {
          color-scheme: light;
          --bg: #f3eee7;
          --surface: #fffdf9;
          --surface-soft: #ebe3d7;
          --ink: #111111;
          --muted: #5f584f;
          --line: rgba(17, 17, 17, 0.08);
          --line-strong: rgba(17, 17, 17, 0.16);
          --red: #ff2026;
          --red-deep: #7e0f14;
          --shadow: 0 24px 70px rgba(28, 16, 16, 0.08);
          --radius-xl: 34px;
          --radius-lg: 26px;
          --radius-md: 20px;
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          min-height: 100%;
          background: linear-gradient(180deg, #f4efe7 0%, #efe7da 100%);
          color: var(--ink);
          font-family: 'Gotham', 'Avenir Next', system-ui, sans-serif;
          overflow-x: hidden;
        }

        a { color: inherit; text-decoration: none; }

        .lvs-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .lvs-header {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(18px);
          background: rgba(243, 238, 231, 0.82);
          border-bottom: 1px solid rgba(17, 17, 17, 0.06);
        }

        .lvs-header-inner,
        .lvs-main,
        .lvs-footer-inner {
          width: min(1180px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .lvs-header-inner {
          min-height: 92px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .lvs-logo {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .lvs-logo img {
          height: 28px;
          width: auto;
          display: block;
        }

        .lvs-logo-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .lvs-logo-text strong {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .lvs-logo-text span {
          color: var(--muted);
          font-size: 0.84rem;
        }

        .lvs-nav {
          display: flex;
          align-items: center;
          gap: 22px;
          flex-wrap: wrap;
        }

        .lvs-nav a {
          color: var(--muted);
          font-size: 0.96rem;
          font-weight: 500;
          transition: color 160ms ease;
        }

        .lvs-nav a:hover { color: var(--red); }

        .lvs-header-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 22px;
          min-height: 46px;
          border-radius: 999px;
          background: var(--ink);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .lvs-main {
          width: min(1180px, calc(100vw - 48px));
          flex: 1;
          padding: 42px 0 96px;
        }

        .lvs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--red-deep);
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .lvs-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.7fr);
          gap: 28px;
          align-items: stretch;
          padding: 42px 0 22px;
        }

        .lvs-hero-copy,
        .lvs-hero-panel,
        .lvs-featured-main,
        .lvs-most-read,
        .lvs-collection,
        .lvs-article,
        .lvs-related,
        .lvs-not-found {
          border: 1px solid var(--line);
          box-shadow: var(--shadow);
        }

        .lvs-hero-copy {
          background:
            radial-gradient(circle at top left, rgba(255, 32, 38, 0.18), transparent 40%),
            linear-gradient(180deg, #ffffff 0%, #f5eee2 100%);
          border-radius: var(--radius-xl);
          padding: 44px;
        }

        .lvs-hero-copy h1 {
          margin: 18px 0 18px;
          max-width: 10ch;
          font-family: 'Gotham Display', 'Gotham', sans-serif;
          font-size: clamp(3.6rem, 8vw, 6.4rem);
          line-height: 0.92;
          letter-spacing: -0.06em;
        }

        .lvs-hero-lead,
        .lvs-hero-sublead,
        .lvs-featured-main p,
        .lvs-section-head p,
        .lvs-collection-head p,
        .lvs-article-excerpt,
        .lvs-not-found p {
          margin: 0;
          max-width: 64ch;
          color: var(--muted);
          font-size: 1.12rem;
          line-height: 1.75;
        }

        .lvs-hero-sublead { margin-top: 12px; }

        .lvs-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 28px;
        }

        .lvs-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 56px;
          padding: 0 24px;
          border-radius: 999px;
          font-size: 1rem;
          font-weight: 700;
          transition: transform 160ms ease, border-color 160ms ease, background-color 160ms ease, color 160ms ease;
        }

        .lvs-btn:hover { transform: translateY(-2px); }

        .lvs-btn-primary {
          background: var(--red);
          color: #fff;
        }

        .lvs-btn-secondary {
          border: 1px solid var(--line-strong);
          color: var(--ink);
          background: rgba(255, 255, 255, 0.7);
        }

        .lvs-hero-panel {
          background:
            linear-gradient(180deg, rgba(17,17,17,0.96) 0%, rgba(38,15,17,0.98) 100%);
          color: #fff;
          border-radius: var(--radius-xl);
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
        }

        .lvs-hero-stat {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .lvs-hero-stat svg,
        .lvs-card-link svg,
        .lvs-most-read-item svg,
        .lvs-text-link svg {
          width: 22px;
          height: 22px;
          flex-shrink: 0;
        }

        .lvs-hero-stat svg {
          color: #ff8e95;
          width: 26px;
          height: 26px;
        }

        .lvs-hero-stat strong {
          display: block;
          font-family: 'Gotham Display', 'Gotham', sans-serif;
          font-size: 2.7rem;
          line-height: 0.94;
        }

        .lvs-hero-stat span,
        .lvs-featured-header span,
        .lvs-card-topline span,
        .lvs-article-meta span,
        .lvs-article-update {
          color: rgba(255,255,255,0.68);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .lvs-hero-note {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 22px;
          background: rgba(255,255,255,0.03);
        }

        .lvs-hero-note-title {
          display: block;
          font-weight: 700;
          margin-bottom: 10px;
          color: #fff;
        }

        .lvs-hero-note p {
          margin: 0;
          color: rgba(255,255,255,0.72);
          line-height: 1.75;
        }

        .lvs-hero-tags {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .lvs-hero-tags li {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.76);
          font-size: 0.92rem;
        }

        .lvs-featured {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 24px;
          margin-top: 26px;
        }

        .lvs-featured-main {
          background: linear-gradient(180deg, #161214 0%, #0f0d0e 100%);
          color: #fff;
          border-radius: var(--radius-xl);
          padding: 34px;
          min-height: 100%;
        }

        .lvs-featured-main.has-cover {
          padding-top: 24px;
        }

        .lvs-featured-media,
        .lvs-card-media {
          overflow: hidden;
          border-radius: 22px;
          margin-bottom: 20px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.05);
        }

        .lvs-featured-media img,
        .lvs-card-media img {
          width: 100%;
          display: block;
          aspect-ratio: 1200 / 630;
          object-fit: cover;
        }

        .lvs-featured-header,
        .lvs-card-topline,
        .lvs-article-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .lvs-featured-main h2,
        .lvs-section-head h2,
        .lvs-collection-head h2,
        .lvs-related-head h2,
        .lvs-not-found h1 {
          margin: 20px 0 14px;
          font-family: 'Gotham Display', 'Gotham', sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.8rem);
          line-height: 0.95;
          letter-spacing: -0.05em;
        }

        .lvs-text-link,
        .lvs-card-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
        }

        .lvs-text-link { margin-top: 24px; }

        .lvs-featured-grid,
        .lvs-collection-grid,
        .lvs-related-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .lvs-card {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: rgba(255,255,255,0.82);
          border: 1px solid var(--line);
          border-radius: 26px;
          padding: 24px;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .lvs-card:hover,
        .lvs-most-read-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 44px rgba(34, 17, 17, 0.08);
          border-color: rgba(255, 32, 38, 0.18);
        }

        .lvs-card h3,
        .lvs-most-read-item h3 {
          margin: 0;
          font-size: clamp(1.2rem, 2vw, 1.56rem);
          line-height: 1.22;
          letter-spacing: -0.03em;
        }

        .lvs-card p,
        .lvs-most-read-item p {
          margin: 0;
          color: var(--muted);
          line-height: 1.7;
        }

        .lvs-card-link { margin-top: auto; }

        .lvs-card.is-compact { background: var(--surface); }

        .lvs-shelves,
        .lvs-most-read,
        .lvs-collection,
        .lvs-related,
        .lvs-article,
        .lvs-not-found {
          margin-top: 28px;
          background: rgba(255,255,255,0.74);
          border-radius: var(--radius-xl);
          padding: 34px;
        }

        .lvs-shelves {
          background: linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(247,240,230,0.96) 100%);
        }

        .lvs-section-head,
        .lvs-collection-head,
        .lvs-related-head {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          gap: 22px;
          align-items: end;
          margin-bottom: 26px;
        }

        .lvs-most-read-grid {
          display: grid;
          gap: 16px;
        }

        .lvs-shelves-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .lvs-shelf-card {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 24px;
          background: rgba(255,255,255,0.84);
          border: 1px solid var(--line);
          border-radius: 24px;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .lvs-shelf-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 44px rgba(34, 17, 17, 0.08);
          border-color: rgba(255, 32, 38, 0.18);
        }

        .lvs-shelf-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .lvs-shelf-topline strong {
          font-size: 1.08rem;
          line-height: 1.2;
        }

        .lvs-shelf-topline span,
        .lvs-collection-count {
          color: var(--muted);
          font-size: 0.92rem;
          font-weight: 500;
        }

        .lvs-shelf-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .lvs-most-read-item {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 18px;
          padding: 22px;
          background: rgba(255,255,255,0.8);
          border: 1px solid var(--line);
          border-radius: 24px;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .lvs-most-read-rank {
          width: 52px;
          text-align: center;
          font-family: 'Gotham Display', 'Gotham', sans-serif;
          font-size: 1.6rem;
          letter-spacing: -0.06em;
        }

        .lvs-most-read-copy {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .lvs-collection-head h2,
        .lvs-related-head h2 {
          font-size: clamp(1.8rem, 3vw, 3rem);
        }

        .lvs-article {
          background: linear-gradient(180deg, #fffdf9 0%, #f7f0e6 100%);
        }

        .lvs-article-hero {
          padding-bottom: 28px;
          border-bottom: 1px solid var(--line);
        }

        .lvs-article-hero h1 {
          margin: 18px 0 16px;
          max-width: 13ch;
          font-family: 'Gotham Display', 'Gotham', sans-serif;
          font-size: clamp(3rem, 7vw, 5.4rem);
          line-height: 0.94;
          letter-spacing: -0.06em;
        }

        .lvs-article-excerpt {
          max-width: 52ch;
        }

        .lvs-article-update {
          margin-top: 18px;
          color: var(--muted);
        }

        .lvs-article-body {
          padding-top: 18px;
          display: grid;
          gap: 30px;
        }

        .lvs-article-cover {
          margin-top: 28px;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid var(--line);
          box-shadow: 0 20px 44px rgba(34, 17, 17, 0.08);
        }

        .lvs-article-cover img {
          width: 100%;
          display: block;
          aspect-ratio: 1200 / 630;
          object-fit: cover;
          background: #e6ddd1;
        }

        .lvs-article-section h2 {
          margin: 0 0 14px;
          font-size: clamp(1.4rem, 2.4vw, 2.1rem);
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .lvs-article-section p,
        .lvs-article-section li {
          margin: 0;
          color: var(--muted);
          font-size: 1.08rem;
          line-height: 1.85;
        }

        .lvs-article-section p + p { margin-top: 14px; }

        .lvs-article-section ul {
          margin: 18px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 12px;
        }

        .lvs-article-links {
          margin-top: 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .lvs-article-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 999px;
          border: 1px solid var(--line-strong);
          background: rgba(255,255,255,0.84);
          font-weight: 700;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .lvs-article-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 28px rgba(34, 17, 17, 0.08);
          border-color: rgba(255, 32, 38, 0.18);
        }

        .lvs-article-section li {
          position: relative;
          padding-left: 26px;
        }

        .lvs-article-section li::before {
          content: '';
          position: absolute;
          top: 0.7em;
          left: 0;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--red);
          transform: translateY(-50%);
        }

        .lvs-video-embed {
          margin-top: 22px;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid var(--line);
          background: #111;
          box-shadow: 0 18px 38px rgba(34, 17, 17, 0.08);
        }

        .lvs-video-embed iframe {
          width: 100%;
          aspect-ratio: 16 / 9;
          border: 0;
          display: block;
        }

        .lvs-profile-grid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .lvs-profile-card {
          display: grid;
          grid-template-columns: 180px minmax(0, 1fr);
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: 24px;
          background: rgba(255,255,255,0.82);
          box-shadow: 0 18px 38px rgba(34, 17, 17, 0.06);
        }

        .lvs-profile-image {
          width: 100%;
          height: 100%;
          min-height: 240px;
          display: block;
          object-fit: cover;
          background: #e8ddd0;
        }

        .lvs-profile-copy {
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .lvs-profile-copy h3 {
          margin: 0;
          font-size: clamp(1.18rem, 1.8vw, 1.46rem);
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .lvs-profile-copy p {
          margin: 0;
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.75;
        }

        .lvs-article-actions {
          margin-top: 34px;
          padding-top: 28px;
          border-top: 1px solid var(--line);
          display: grid;
          gap: 20px;
        }

        .lvs-article-actions-head h2 {
          margin: 14px 0 12px;
          font-size: clamp(1.7rem, 2.8vw, 2.6rem);
          line-height: 0.98;
          letter-spacing: -0.04em;
        }

        .lvs-article-actions-head p {
          margin: 0;
          max-width: 64ch;
          color: var(--muted);
          line-height: 1.75;
        }

        .lvs-article-actions-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .lvs-article-action-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 24px;
          border-radius: 24px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.84);
          box-shadow: 0 18px 38px rgba(34, 17, 17, 0.05);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .lvs-article-action-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 44px rgba(34, 17, 17, 0.08);
          border-color: rgba(255, 32, 38, 0.18);
        }

        .lvs-article-action-card strong {
          font-size: 1.2rem;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .lvs-article-action-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.75;
        }

        .lvs-not-found {
          text-align: left;
          background: linear-gradient(180deg, #151112 0%, #090909 100%);
          color: #fff;
        }

        .lvs-not-found p { color: rgba(255,255,255,0.72); }

        .lvs-footer {
          background: #0b0b0c;
          color: rgba(255,255,255,0.78);
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .lvs-footer-inner {
          padding: 40px 0 46px;
          display: grid;
          gap: 30px;
        }

        .lvs-footer-top {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
        }

        .lvs-footer-top img {
          height: 38px;
          width: auto;
          display: block;
        }

        .lvs-footer-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
        }

        .lvs-footer-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .lvs-footer-column span {
          color: #fff;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .lvs-footer-column a {
          color: rgba(255,255,255,0.68);
          font-size: 0.98rem;
          transition: color 160ms ease;
        }

        .lvs-footer-column a:hover { color: #ff8e95; }

        .lvs-footer-bottom {
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 0.95rem;
        }

        .lvs-press-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 32px;
          padding: 0 12px;
          border-radius: 999px;
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @media (max-width: 1100px) {
          .lvs-hero,
          .lvs-featured,
          .lvs-section-head,
          .lvs-collection-head,
          .lvs-related-head {
            grid-template-columns: 1fr;
          }

          .lvs-shelves-grid,
          .lvs-featured-grid,
          .lvs-collection-grid,
          .lvs-related-grid,
          .lvs-footer-grid,
          .lvs-profile-grid,
          .lvs-article-actions-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 820px) {
          .lvs-header-inner {
            flex-wrap: wrap;
            justify-content: center;
            padding: 16px 0;
            min-height: auto;
          }

          .lvs-main,
          .lvs-header-inner,
          .lvs-footer-inner {
            width: min(100vw - 28px, 1180px);
          }

          .lvs-hero-copy,
          .lvs-hero-panel,
          .lvs-featured-main,
          .lvs-shelves,
          .lvs-most-read,
          .lvs-collection,
          .lvs-related,
          .lvs-article,
          .lvs-not-found {
            padding: 24px;
          }

          .lvs-shelves-grid,
          .lvs-featured-grid,
          .lvs-collection-grid,
          .lvs-related-grid,
          .lvs-footer-grid,
          .lvs-profile-grid,
          .lvs-article-actions-grid {
            grid-template-columns: 1fr;
          }

          .lvs-most-read-item {
            grid-template-columns: 1fr;
          }

          .lvs-profile-card {
            grid-template-columns: 1fr;
          }

          .lvs-profile-image {
            min-height: 320px;
            max-height: 420px;
          }

          .lvs-most-read-rank {
            text-align: left;
            width: auto;
          }

          .lvs-footer-top,
          .lvs-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .lvs-nav {
            justify-content: center;
            width: 100%;
          }

          .lvs-header-cta {
            width: 100%;
          }

          .lvs-hero-copy h1,
          .lvs-article-hero h1,
          .lvs-featured-main h2,
          .lvs-section-head h2,
          .lvs-collection-head h2,
          .lvs-related-head h2,
          .lvs-not-found h1 {
            max-width: none;
          }

          .lvs-hero-lead,
          .lvs-hero-sublead,
          .lvs-featured-main p,
          .lvs-section-head p,
          .lvs-collection-head p,
          .lvs-article-excerpt,
          .lvs-not-found p,
          .lvs-card p,
          .lvs-most-read-item p,
          .lvs-article-section p,
          .lvs-article-section li {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="lvs-shell">
        <header className="lvs-header">
          <div className="lvs-header-inner">
            <a className="lvs-logo" href="/">
              <img src={HEADER_LOGO_SRC} alt="La Voz Salsa" />
              <div className="lvs-logo-text">
                <strong>Pulso Salsero</strong>
                <span>Sala de prensa de La Voz Salsa</span>
              </div>
            </a>

            <nav className="lvs-nav">
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={isHome ? link.href : `/${link.href}`}>
                  {link.label}
                </a>
              ))}
            </nav>

            <a className="lvs-header-cta" href={MAIN_SITE_URL}>
              Ir a La Voz Salsa
            </a>
          </div>
        </header>

        <main className="lvs-main">
          {isHome ? <PressHome /> : currentArticle ? <ArticlePage article={currentArticle} /> : <NotFoundPage />}
        </main>

        <footer className="lvs-footer">
          <div className="lvs-footer-inner">
            <div className="lvs-footer-top">
              <img src={FOOTER_LOGO_SRC} alt="La Voz Salsa" />
              <p>Una sala de prensa para ordenar noticias, archivo y contexto alrededor de la salsa.</p>
            </div>

            <div className="lvs-footer-grid">
              <div className="lvs-footer-column">
                <span>Pulso Salsero</span>
                <a href="/">Portada</a>
                <a href="/#estanterias">Estanterías</a>
                <a href="/#destacados">Destacados</a>
                <a href="/#archivo">Archivo</a>
              </div>
              <div className="lvs-footer-column">
                <span>La Voz Salsa</span>
                <a href={MAIN_SITE_URL}>Sitio principal</a>
                <a href={APP_URL}>Plataforma web</a>
                <a href={LIVE_URL}>Live Streaming</a>
              </div>
              <div className="lvs-footer-column">
                <span>Productos</span>
                <a href={ARTISTS_URL}>Artistas</a>
                <a href={PREMIUM_URL}>Premium</a>
              </div>
              <div className="lvs-footer-column">
                <span>Acceso</span>
                <a href={APP_URL}>Abrir app</a>
                <a href={MAIN_SITE_URL}>Volver al inicio</a>
              </div>
            </div>

            <div className="lvs-footer-bottom">
              <span>© 2026 La Voz Salsa. Todos los derechos reservados.</span>
              <span>Prensa, archivo y cultura salsera con criterio editorial.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
