import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

type ArticleSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  orderedBullets?: string[];
  links?: {
    label: string;
    href: string;
  }[];
  videoUrl?: string;
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
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
  showInFeed?: boolean;
  sections: ArticleSection[];
};

type Collection = {
  key: string;
  title: string;
  description: string;
  slugs: string[];
};

type DownloadTrack = {
  index: number;
  title: string;
  filename: string;
  sourceUrl: string;
  file: string;
  sizeBytes?: number;
};

const { pressArticles, pressCollections } = require('./content/articles') as {
  pressArticles: Article[];
  pressCollections: Collection[];
};
const descargarSalsaTracks = require('./content/descargar-salsa-audios.json') as DownloadTrack[];
const EXCLUDED_DOWNLOAD_FILENAMES = new Set([
  '25-panico-grupo-niche.mp3',
  '28-caricias-prohibidas-viti-ruiz.mp3',
  '70-magia-rosa-viti-ruiz.mp3',
  '73-me-muero-por-estar-contigo-viti-ruiz.mp3',
]);
const curatedDescargarSalsaTracks = descargarSalsaTracks.filter(
  (track) => !EXCLUDED_DOWNLOAD_FILENAMES.has(track.filename)
);

const MAIN_SITE_URL = 'https://lavozsalsa.com';
const APP_URL = 'https://app.lavozsalsa.com';
const LIVE_URL = 'https://app.lavozsalsa.com/tv';
const ARTISTS_URL = 'https://artistas.lavozsalsa.com';
const PREMIUM_URL = 'https://premium.lavozsalsa.com';
const APP_DOWNLOAD_URL = 'https://onelink.to/w5n2k9';

const HOME_ALIASES = new Set(['/', '/pulso-salsero/']);
const HEADER_LOGO_SRC = '/brand/logo-pulso-salsero-black.png';
const FOOTER_LOGO_SRC = '/brand/logo-pulso-salsero-footer-isotipo.png';

const NAV_LINKS = [
  { label: 'Historias clave', href: '#destacados' },
  { label: 'Perfiles', href: '#perfiles' },
  { label: 'Descargar Salsa', href: '/descargar-salsa/' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/lavozsalsa', icon: 'instagram' },
  { label: 'TikTok', href: 'https://tiktok.com/@lavozsalsa', icon: 'tiktok' },
  { label: 'Facebook', href: 'https://facebook.com/lavozsalsa', icon: 'facebook' },
  { label: 'YouTube', href: 'https://youtube.com/@lavozsalsa', icon: 'youtube' },
];

const CATEGORY_TONES: Record<string, { bg: string; ink: string }> = {
  Guía: { bg: '#ffe3dd', ink: '#7d1218' },
  Descargas: { bg: '#ffe7d6', ink: '#7f2c00' },
  Archivo: { bg: '#fff1cd', ink: '#694300' },
  Historia: { bg: '#f9d9ea', ink: '#7f164d' },
  Ciudad: { bg: '#dff3f6', ink: '#004e5b' },
  Homenajes: { bg: '#efe3ff', ink: '#53248d' },
  Perfiles: { bg: '#e5edff', ink: '#193f93' },
  Comunidad: { bg: '#ffe2e2', ink: '#8b1116' },
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

function LinkBadge({ subtle = false }: { subtle?: boolean }) {
  return (
    <span className={`lvs-link-badge${subtle ? ' is-subtle' : ''}`}>
      <ArrowIcon />
    </span>
  );
}

function LinkPresentation({
  kicker,
  label,
  className = '',
}: {
  kicker?: string;
  label: string;
  className?: string;
}) {
  return (
    <span className={`lvs-link-presentation ${className}`.trim()}>
      <span className="lvs-link-copy">
        {kicker ? <span className="lvs-link-kicker">{kicker}</span> : null}
        <span className="lvs-link-title">{label}</span>
      </span>
      <LinkBadge />
    </span>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3v10m0 0 4-4m-4 4-4-4M4 16.8V19h16v-2.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.1"
      />
    </svg>
  );
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

function MenuToggleIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 6l12 12M18 6 6 18"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.5 7.5h15M4.5 12h15M4.5 16.5h15"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function formatTrackSize(sizeBytes?: number) {
  if (!sizeBytes) return 'MP3';
  const mb = sizeBytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
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
      <LinkPresentation className="lvs-card-link" kicker="Pulso Salsero" label="Leer historia" />
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
    <section id="rutas" className="lvs-shelves">
      <div className="lvs-section-head">
        <div>
          <span className="lvs-eyebrow">Rutas editoriales</span>
          <h2>Cómo se está ordenando Pulso Salsero</h2>
        </div>
        <p>
          Aquí no estamos apilando enlaces. Estamos armando una sala con entradas claras para que el lector encuentre guías, memoria, ciudad y perfiles con una lógica editorial que sí represente a La Voz Salsa.
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
              <LinkPresentation className="lvs-card-link" kicker="Ruta editorial" label="Abrir ruta" />
            </a>
          );
        })}
      </div>
    </section>
  );
}

function RelatedStories({ currentSlug, currentCategory }: { currentSlug: string; currentCategory: string }) {
  const related = pressArticles
    .filter((article) => article.showInFeed !== false && article.slug !== currentSlug)
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
            <LinkPresentation className="lvs-card-link" kicker="Acceso directo" label="Ir ahora" />
          </a>
        ))}
      </div>
    </section>
  );
}

function PressHome() {
  const visibleArticles = pressArticles.filter((article) => article.showInFeed !== false);
  const ordered = [...visibleArticles].sort((a, b) => a.featuredRank - b.featuredRank);
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
            Historias, memoria, artistas y ciudad para leer la salsa con criterio editorial, identidad propia y una mirada más cercana a lo que de verdad mueve la conversación del género.
          </p>
          <p className="lvs-hero-sublead">
            Pulso Salsero reúne piezas que siguen teniendo valor real: guías que responden búsquedas fuertes, perfiles con peso histórico y archivo que todavía dialoga con el presente.
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
              <strong>{visibleArticles.length}</strong>
              <span>Historias inaugurales</span>
            </div>
          </div>
          <div className="lvs-hero-note">
            <span className="lvs-hero-note-title">Qué vas a encontrar aquí</span>
            <p>
              Una mezcla de guías, archivo vivo y perfiles que ayudan a entender mejor la salsa, sus figuras, su memoria y su eco cultural en Colombia y fuera de ella.
            </p>
          </div>
          <ul className="lvs-hero-tags">
            <li>Guías</li>
            <li>Historia</li>
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
            <LinkPresentation kicker="Historia destacada" label="Leer completa" />
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
          <p>Esta selección reúne las historias que mejor conectan con nuestra audiencia por memoria, búsqueda orgánica y peso real dentro de la conversación salsera.</p>
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
              <LinkBadge subtle />
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

        <ArticleSections article={article} />

        <ArticleActions />
      </article>

      <RelatedStories currentSlug={article.slug} currentCategory={article.category} />
    </>
  );
}

function ArticleSections({ article }: { article: Article }) {
  return (
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
          {section.orderedBullets ? (
            <ol className="lvs-article-ordered-list">
              {section.orderedBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ol>
          ) : null}
          {section.images?.length ? (
            <div className={`lvs-article-image-grid ${section.images.length === 1 ? 'is-single' : ''}`}>
              {section.images.map((image) => (
                <figure key={`${section.title}-${image.src}`} className="lvs-article-figure">
                  <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                  {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          ) : null}
          {section.links?.length ? (
            <div className="lvs-article-links">
              {section.links.map((link) => (
                <a key={`${section.title}-${link.href}`} className="lvs-article-link" href={link.href}>
                  <LinkPresentation className="lvs-article-link-body" label={link.label} />
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
  );
}

function DownloadLandingPage({ article }: { article: Article }) {
  const totalTracks = curatedDescargarSalsaTracks.length;

  return (
    <>
      <article className="lvs-downloads-page">
        <section className="lvs-download-hero">
          <div className="lvs-download-hero-copy">
            <CategoryPill category={article.category} />
            <h1>{article.title}</h1>
            <p className="lvs-download-lead">{article.excerpt}</p>
            <p className="lvs-download-sublead">
              Una biblioteca pensada para quienes todavía quieren oír primero, escoger bien y guardar salsa con orden. Aquí la descarga vuelve a sentirse útil, directa y verdaderamente salsera.
            </p>
            <div className="lvs-download-actions">
              <a className="lvs-btn lvs-btn-primary" href="#descargas-disponibles">
                Escuchar y descargar
              </a>
              <a className="lvs-btn lvs-btn-secondary" href="/exitos-de-la-salsa-romantica/">
                Abrir salsa romántica
              </a>
            </div>
          </div>

          <div className="lvs-download-hero-panel">
            <div className="lvs-download-icon-shell">
              <DownloadIcon />
            </div>
            <div className="lvs-download-stat-grid">
              <div className="lvs-download-stat">
                <strong>{String(totalTracks).padStart(2, '0')}</strong>
                <span>Descargas disponibles</span>
              </div>
              <div className="lvs-download-stat">
                <strong>MP3</strong>
                <span>Listos para móvil o PC</span>
              </div>
              <div className="lvs-download-stat">
                <strong>Curado</strong>
                <span>Selección ordenada por Pulso Salsero</span>
              </div>
              <div className="lvs-download-stat">
                <strong>Directo</strong>
                <span>Escucha previa y descarga individual</span>
              </div>
            </div>
            <p className="lvs-download-note">
              El contador muestra el total real de pistas activas dentro de esta biblioteca para que la cifra responda al archivo disponible hoy, no a promesas viejas.
            </p>
          </div>
        </section>

        <section id="descargas-disponibles" className="lvs-download-board">
          <div className="lvs-download-board-head">
            <div>
              <span className="lvs-eyebrow">Descargar salsa</span>
              <h2>Una biblioteca de MP3 hecha para escuchar y bajar con gusto</h2>
              <p>
                Cada pista tiene escucha previa, descarga directa y una presentación más limpia para que el título respire. Algunas canciones todavía salen desde su fuente histórica mientras terminamos de consolidar la biblioteca completa.
              </p>
            </div>
            <div className="lvs-download-total">
              <DownloadIcon />
              <strong>{totalTracks}</strong>
              <span>descargas activas</span>
            </div>
          </div>

          <div className="lvs-download-track-grid">
            {curatedDescargarSalsaTracks.map((track, visibleIndex) => {
              const deliveryUrl = track.sizeBytes ? track.file : track.sourceUrl;

              return (
                <article key={track.filename} className="lvs-download-track">
                  <div className="lvs-download-track-top">
                    <span className="lvs-download-track-index">Pista {String(visibleIndex + 1).padStart(2, '0')}</span>
                    <span className="lvs-download-track-size">{formatTrackSize(track.sizeBytes)}</span>
                  </div>
                  <h3 className="lvs-download-track-title">{track.title}</h3>
                  <audio controls preload="none" src={deliveryUrl} />
                  <div className="lvs-download-track-actions">
                    <a className="lvs-download-track-button" href={deliveryUrl} download>
                      <DownloadIcon />
                      <span>Bajar MP3</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <ArticleSections article={article} />

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
  const isDownloadLanding = currentArticle?.slug === 'descargar-salsa';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navHref = (href: string) => (href.startsWith('/') ? href : isHome ? href : `/${href}`);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          min-height: 106px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .lvs-logo {
          display: inline-flex;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
        }

        .lvs-logo img {
          height: 50px;
          max-width: min(36vw, 430px);
          width: auto;
          display: block;
        }

        .lvs-mobile-toggle,
        .lvs-mobile-panel {
          display: none;
        }

        .lvs-mobile-toggle {
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          padding: 0;
          appearance: none;
          border: 1px solid rgba(17, 17, 17, 0.12);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.82);
          color: var(--ink);
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(17, 17, 17, 0.08);
        }

        .lvs-mobile-toggle svg {
          width: 22px;
          height: 22px;
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

        .lvs-hero-stat svg {
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

        .lvs-text-link {
          margin-top: 24px;
          display: inline-flex;
          width: min(100%, 360px);
        }

        .lvs-link-presentation {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
          min-width: 0;
        }

        .lvs-link-copy {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .lvs-link-kicker {
          color: var(--red-deep);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition: color 180ms ease;
        }

        .lvs-link-title {
          color: var(--ink);
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.03em;
          transition: color 180ms ease;
        }

        .lvs-link-badge {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--ink);
          color: #fff;
          flex-shrink: 0;
          box-shadow: 0 14px 28px rgba(17, 17, 17, 0.12);
          transition: transform 160ms ease, background-color 160ms ease, color 160ms ease, border-color 160ms ease, box-shadow 180ms ease;
        }

        .lvs-link-badge svg {
          width: 16px;
          height: 16px;
          display: block;
        }

        .lvs-link-badge.is-subtle {
          background: rgba(255,255,255,0.8);
          color: var(--ink);
          border: 1px solid rgba(17, 17, 17, 0.1);
          box-shadow: none;
        }

        .lvs-text-link .lvs-link-presentation {
          padding: 16px 18px;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease;
        }

        .lvs-text-link .lvs-link-kicker {
          color: rgba(255,255,255,0.58);
        }

        .lvs-text-link .lvs-link-title {
          color: #fff;
        }

        .lvs-text-link .lvs-link-badge {
          background: #fff;
          color: var(--ink);
          box-shadow: none;
        }

        .lvs-text-link:hover .lvs-link-presentation {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
        }

        .lvs-text-link:hover .lvs-link-title,
        .lvs-card:hover .lvs-link-title,
        .lvs-shelf-card:hover .lvs-link-title,
        .lvs-article-action-card:hover .lvs-link-title,
        .lvs-article-link:hover .lvs-link-title {
          color: var(--red-deep);
        }

        .lvs-text-link:hover .lvs-link-kicker,
        .lvs-card:hover .lvs-link-kicker,
        .lvs-shelf-card:hover .lvs-link-kicker,
        .lvs-article-action-card:hover .lvs-link-kicker,
        .lvs-article-link:hover .lvs-link-kicker {
          color: var(--red);
        }

        .lvs-text-link:hover .lvs-link-badge,
        .lvs-card:hover .lvs-link-badge,
        .lvs-shelf-card:hover .lvs-link-badge,
        .lvs-article-action-card:hover .lvs-link-badge,
        .lvs-article-link:hover .lvs-link-badge,
        .lvs-most-read-item:hover .lvs-link-badge {
          background: var(--red);
          color: #fff;
          border-color: rgba(255, 32, 38, 0.28);
          box-shadow: 0 0 0 8px rgba(255, 32, 38, 0.12), 0 18px 34px rgba(255, 32, 38, 0.24);
        }

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

        .lvs-card-link {
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid rgba(17, 17, 17, 0.08);
        }

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

        .lvs-article-ordered-list {
          margin: 18px 0 0;
          padding-left: 24px;
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
          display: block;
          width: min(100%, 520px);
        }

        .lvs-article-link-body {
          padding: 18px 20px;
          border-radius: 24px;
          border: 1px solid var(--line);
          background: linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(247,240,230,0.96) 100%);
          box-shadow: 0 18px 38px rgba(34, 17, 17, 0.06);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .lvs-article-link:hover .lvs-article-link-body {
          transform: translateY(-2px);
          box-shadow: 0 20px 34px rgba(34, 17, 17, 0.08);
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

        .lvs-article-ordered-list li {
          padding-left: 0;
          list-style: decimal;
          position: static;
        }

        .lvs-article-ordered-list li::before {
          content: none;
        }

        .lvs-article-image-grid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          align-items: start;
        }

        .lvs-article-image-grid.is-single {
          grid-template-columns: 1fr;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }

        .lvs-article-figure {
          margin: 0;
          border-radius: 24px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.82);
          box-shadow: 0 18px 38px rgba(34, 17, 17, 0.06);
          padding: 16px;
        }

        .lvs-article-figure img {
          width: auto;
          max-width: 100%;
          max-height: 420px;
          height: auto;
          margin: 0 auto;
          display: block;
          background: #e8ddd0;
        }

        .lvs-article-figure figcaption {
          padding: 14px 18px 18px;
          color: var(--muted);
          font-size: 0.94rem;
          line-height: 1.6;
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

        .lvs-downloads-page {
          display: grid;
          gap: 30px;
        }

        .lvs-subscribe-page {
          display: grid;
          gap: 30px;
        }

        .lvs-subscribe-block {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, 0.82fr) minmax(320px, 1.18fr);
          gap: 24px;
          padding: 30px;
          border-radius: 34px;
          border: 1px solid var(--line);
          background:
            radial-gradient(circle at top left, rgba(255, 80, 80, 0.11), transparent 30%),
            radial-gradient(circle at 88% 14%, rgba(255, 190, 120, 0.1), transparent 26%),
            linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,240,230,0.98) 100%);
          box-shadow: 0 24px 56px rgba(34, 17, 17, 0.08);
        }

        .lvs-subscribe-block::after {
          content: '';
          position: absolute;
          inset: auto -60px -90px auto;
          width: 240px;
          height: 240px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255, 32, 38, 0.1), transparent 68%);
          pointer-events: none;
        }

        .lvs-subscribe-block-copy,
        .lvs-subscribe-frame-wrap {
          position: relative;
          z-index: 1;
        }

        .lvs-subscribe-block-copy {
          display: grid;
          align-content: start;
          gap: 18px;
        }

        .lvs-subscribe-block-copy h1 {
          margin: 0;
          color: var(--ink);
          font-size: clamp(2.2rem, 4.2vw, 4rem);
          line-height: 0.94;
          letter-spacing: -0.055em;
          max-width: 10ch;
        }

        .lvs-subscribe-lead {
          margin: 0;
          color: var(--muted);
          font-size: 1.04rem;
          line-height: 1.72;
          max-width: 54ch;
        }

        .lvs-subscribe-note {
          display: grid;
          gap: 10px;
          padding: 18px 20px;
          border-radius: 24px;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(17,17,17,0.08);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .lvs-subscribe-note-title {
          display: block;
          color: var(--red-deep);
          font-weight: 700;
          letter-spacing: 0.14em;
          font-size: 0.76rem;
          text-transform: uppercase;
        }

        .lvs-subscribe-note p {
          margin: 0;
          color: var(--muted);
          line-height: 1.75;
        }

        .lvs-subscribe-frame-wrap {
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid rgba(17,17,17,0.08);
          background: #fff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 18px 42px rgba(34, 17, 17, 0.06);
          padding: 6px;
        }

        .lvs-subscribe-iframe {
          display: block;
          width: 100%;
          min-height: 860px;
          background: #fff;
          border-radius: 22px;
        }

        .lvs-download-hero {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
          gap: 28px;
          padding: 36px;
          border-radius: 34px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            radial-gradient(circle at top left, rgba(255, 110, 88, 0.24), transparent 34%),
            radial-gradient(circle at 85% 15%, rgba(255, 32, 38, 0.24), transparent 26%),
            linear-gradient(135deg, #120e0d 0%, #251515 50%, #3a1418 100%);
          box-shadow: 0 30px 80px rgba(26, 8, 8, 0.28);
        }

        .lvs-download-hero::after {
          content: '';
          position: absolute;
          right: -70px;
          bottom: -90px;
          width: 260px;
          height: 260px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent 68%);
          pointer-events: none;
        }

        .lvs-download-hero-copy,
        .lvs-download-hero-panel {
          position: relative;
          z-index: 1;
        }

        .lvs-download-hero-copy {
          display: grid;
          align-content: start;
          gap: 18px;
        }

        .lvs-download-hero-copy h1 {
          margin: 0;
          color: #fff;
          font-size: clamp(2.9rem, 5.7vw, 5.3rem);
          line-height: 0.92;
          letter-spacing: -0.06em;
          max-width: 8ch;
        }

        .lvs-download-lead {
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.08rem;
          line-height: 1.7;
          max-width: 58ch;
        }

        .lvs-download-sublead {
          margin: 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: 0.98rem;
          line-height: 1.7;
          max-width: 60ch;
        }

        .lvs-download-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .lvs-download-hero-panel {
          display: grid;
          gap: 18px;
          align-content: start;
        }

        .lvs-download-icon-shell {
          width: 84px;
          height: 84px;
          display: grid;
          place-items: center;
          border-radius: 26px;
          background: rgba(255, 255, 255, 0.09);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #fff;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .lvs-download-icon-shell svg,
        .lvs-download-total svg,
        .lvs-download-track-button svg {
          width: 24px;
          height: 24px;
        }

        .lvs-download-stat-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .lvs-download-stat {
          display: grid;
          gap: 6px;
          padding: 18px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .lvs-download-stat strong {
          color: #fff;
          font-size: 1.75rem;
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .lvs-download-stat span {
          color: rgba(255, 255, 255, 0.72);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .lvs-download-note {
          margin: 0;
          color: rgba(255, 255, 255, 0.66);
          font-size: 0.92rem;
          line-height: 1.65;
        }

        .lvs-download-board {
          display: grid;
          gap: 24px;
          padding: 30px;
          border-radius: 32px;
          border: 1px solid var(--line);
          background:
            radial-gradient(circle at top left, rgba(255, 108, 82, 0.14), transparent 32%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 247, 243, 0.98) 100%);
          box-shadow: 0 24px 60px rgba(34, 17, 17, 0.08);
        }

        .lvs-download-board-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
        }

        .lvs-download-board-head h2 {
          margin: 6px 0 12px;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .lvs-download-board-head p {
          margin: 0;
          color: var(--muted);
          max-width: 60ch;
          line-height: 1.7;
        }

        .lvs-download-total {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid rgba(255, 32, 38, 0.14);
          color: var(--ink);
          box-shadow: 0 14px 28px rgba(255, 32, 38, 0.08);
          flex-shrink: 0;
        }

        .lvs-download-total svg {
          color: var(--red);
        }

        .lvs-download-total strong {
          font-size: 1.1rem;
        }

        .lvs-download-total span {
          color: var(--muted);
          font-size: 0.94rem;
        }

        .lvs-download-track-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .lvs-download-track {
          position: relative;
          display: grid;
          gap: 18px;
          padding: 24px;
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,248,245,0.98) 100%);
          border: 1px solid rgba(37, 20, 20, 0.08);
          box-shadow: 0 18px 40px rgba(34, 17, 17, 0.06);
          overflow: hidden;
        }

        .lvs-download-track::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          border-radius: 28px 28px 0 0;
          background: linear-gradient(90deg, #ff2026, #ff8248);
        }

        .lvs-download-track-top {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
        }

        .lvs-download-track-index {
          display: inline-flex;
          align-items: center;
          min-height: 32px;
          padding: 0 12px;
          border-radius: 999px;
          background: #fff1ee;
          color: var(--red);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lvs-download-track-size {
          color: var(--muted);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lvs-download-track-title {
          margin: 0;
          max-width: 14ch;
          font-family: 'Gotham Display', 'Gotham', sans-serif;
          font-size: clamp(1.56rem, 2vw, 1.92rem);
          line-height: 0.96;
          letter-spacing: -0.06em;
          text-wrap: balance;
          text-transform: none;
          position: relative;
          z-index: 1;
        }

        .lvs-download-track-caption {
          margin: 0;
          color: var(--muted);
          font-size: 0.94rem;
          line-height: 1.65;
        }

        .lvs-download-track audio {
          width: 100%;
          height: 46px;
          display: block;
          position: relative;
          z-index: 1;
        }

        .lvs-download-track-actions {
          display: flex;
          position: relative;
          z-index: 1;
        }

        .lvs-download-track-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 46px;
          padding: 0 18px;
          border-radius: 999px;
          background: var(--ink);
          color: #fff;
          font-size: 0.94rem;
          font-weight: 700;
          transition: transform 160ms ease, background 160ms ease;
        }

        .lvs-download-track-button:hover {
          transform: translateY(-1px);
          background: #2b1718;
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

        .lvs-article-action-card .lvs-card-link {
          padding-top: 14px;
          margin-top: auto;
        }

        .lvs-not-found {
          text-align: left;
          background: linear-gradient(180deg, #151112 0%, #090909 100%);
          color: #fff;
        }

        .lvs-not-found p { color: rgba(255,255,255,0.72); }

        .lvs-footer {
          background: #000;
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
          justify-content: flex-start;
          gap: 18px;
          align-items: flex-start;
        }

        .lvs-footer-brand {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border-radius: 0;
          background: transparent;
        }

        .lvs-footer-top img {
          height: 36px;
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

        .lvs-footer-socials-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .lvs-footer-socials-wrap span {
          color: #fff;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .lvs-footer-socials {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
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
          color: #ff8e95;
          transform: translateY(-1px);
        }

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
          .lvs-subscribe-block,
          .lvs-download-hero,
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
          .lvs-download-track-grid,
          .lvs-footer-grid,
          .lvs-profile-grid,
          .lvs-article-image-grid,
          .lvs-article-actions-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 820px) {
          .lvs-header-inner {
            flex-wrap: wrap;
            justify-content: center;
            padding: 14px 0;
            min-height: auto;
            gap: 18px;
          }

          .lvs-main,
          .lvs-header-inner,
          .lvs-footer-inner {
            width: min(100vw - 28px, 1180px);
          }

          .lvs-hero-copy,
          .lvs-hero-panel,
          .lvs-subscribe-block,
          .lvs-download-hero,
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
          .lvs-download-track-grid,
          .lvs-download-stat-grid,
          .lvs-footer-grid,
          .lvs-profile-grid,
          .lvs-article-image-grid,
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

          .lvs-footer-top img {
            height: 33px;
          }

          .lvs-footer-socials-wrap {
            flex-direction: column;
            align-items: flex-start;
          }

          .lvs-download-board-head {
            flex-direction: column;
            align-items: flex-start;
          }

          .lvs-subscribe-iframe {
            min-height: 940px;
          }
        }

        @media (max-width: 640px) {
          .lvs-header {
            backdrop-filter: blur(20px);
          }

          .lvs-header-inner {
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            gap: 12px;
            position: relative;
          }

          .lvs-logo {
            width: auto;
            justify-content: flex-start;
            max-width: calc(100% - 64px);
          }

          .lvs-logo img {
            height: 38px;
            max-width: min(62vw, 260px);
            width: auto;
          }

          .lvs-nav,
          .lvs-header-cta {
            display: none;
          }

          .lvs-mobile-toggle {
            display: inline-flex;
            flex-shrink: 0;
          }

          .lvs-mobile-panel {
            position: absolute;
            top: calc(100% + 10px);
            left: 0;
            right: 0;
            display: none;
            flex-direction: column;
            gap: 8px;
            padding: 16px;
            border-radius: 24px;
            background: rgba(17, 17, 17, 0.98);
            color: #fff;
            box-shadow: 0 24px 54px rgba(17, 17, 17, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.06);
          }

          .lvs-mobile-panel.is-open {
            display: flex;
          }

          .lvs-mobile-panel a {
            color: rgba(255, 255, 255, 0.84);
            font-size: 1rem;
            font-weight: 600;
            padding: 8px 4px;
          }

          .lvs-mobile-panel .lvs-header-cta {
            display: inline-flex;
            width: 100%;
            margin-top: 6px;
            background: var(--red);
            color: #fff;
          }

          .lvs-footer-top img {
            height: 27px;
          }

          .lvs-download-track-title {
            max-width: none;
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
          .lvs-subscribe-lead,
          .lvs-subscribe-note p,
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
              <img src={HEADER_LOGO_SRC} alt="Pulso Salsero" />
            </a>

            <nav className="lvs-nav">
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={navHref(link.href)}>
                  {link.label}
                </a>
              ))}
            </nav>

            <a className="lvs-header-cta" href={MAIN_SITE_URL}>
              Ir a La Voz Salsa
            </a>

            <button
              type="button"
              className="lvs-mobile-toggle"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <MenuToggleIcon open={mobileMenuOpen} />
            </button>

            <div className={`lvs-mobile-panel${mobileMenuOpen ? ' is-open' : ''}`}>
              {NAV_LINKS.map((link) => (
                <a
                  key={`mobile-${link.label}`}
                  href={navHref(link.href)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a className="lvs-header-cta" href={MAIN_SITE_URL} onClick={() => setMobileMenuOpen(false)}>
                Ir a La Voz Salsa
              </a>
            </div>
          </div>
        </header>

        <main className="lvs-main">
          {isHome ? (
            <PressHome />
          ) : currentArticle ? (
            isDownloadLanding ? (
              <DownloadLandingPage article={currentArticle} />
            ) : (
              <ArticlePage article={currentArticle} />
            )
          ) : (
            <NotFoundPage />
          )}
        </main>

        <footer className="lvs-footer">
          <div className="lvs-footer-inner">
            <div className="lvs-footer-top">
              <div className="lvs-footer-brand">
                <img src={FOOTER_LOGO_SRC} alt="Pulso Salsero" />
              </div>
            </div>

            <div className="lvs-footer-grid">
              <div className="lvs-footer-column">
                <span>Pulso Salsero</span>
                <a href="/">Portada</a>
                <a href="/#destacados">Historias clave</a>
                <a href="/#perfiles">Perfiles</a>
                <a href="/descargar-salsa/">Descargar Salsa</a>
              </div>
              <div className="lvs-footer-column">
                <span>La Voz Salsa</span>
                <a href={APP_URL}>Escuchar La Voz Salsa</a>
                <a href={LIVE_URL}>Live Streaming</a>
              </div>
              <div className="lvs-footer-column">
                <span>Productos</span>
                <a href={APP_URL}>Plataforma</a>
                <a href={ARTISTS_URL}>Artistas</a>
                <a href={PREMIUM_URL}>Premium</a>
              </div>
              <div className="lvs-footer-column">
                <span>Acceso</span>
                <a href={APP_URL}>Abrir app</a>
                <a href={APP_DOWNLOAD_URL}>Descargar app</a>
              </div>
            </div>

            <div className="lvs-footer-socials-wrap">
              <span>Redes sociales</span>
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
