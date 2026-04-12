const RANGE_OPTIONS = [
  { key: '1h', label: '1 hora' },
  { key: '6h', label: '6 horas' },
  { key: '24h', label: '24 horas' },
  { key: '7d', label: '7 dias' },
];

const REFRESH_INTERVAL_MS = 30_000;

const FRIENDLY_LABELS = {
  android_tv: 'Android TV',
  city: 'Ciudad',
  connecting: 'Conectando',
  edge_log_observer: 'Observador edge',
  ended: 'Finalizada',
  error: 'Error',
  fallback: 'Fallback',
  heartbeat: 'Heartbeat',
  live: 'Live',
  playback_error: 'Error de reproduccion',
  playback_ready: 'Playback listo',
  playing: 'En reproduccion',
  server_hls: 'Servidor HLS',
  session_ended: 'Sesion cerrada',
  session_started: 'Sesion iniciada',
  starting: 'Iniciando',
  tizen_tv: 'Samsung Tizen',
  unknown: 'Sin dato',
};

const state = {
  bucket: '15m',
  range: '24h',
  view: 'inicio',
};

const els = {
  activeNowLocations: document.getElementById('activeNowLocations'),
  activeNowValue: document.getElementById('activeNowValue'),
  activeTopCity: document.getElementById('activeTopCity'),
  activeTopCityMeta: document.getElementById('activeTopCityMeta'),
  bucketSelect: document.getElementById('bucketSelect'),
  chartLegend: document.getElementById('chartLegend'),
  concurrencyChart: document.getElementById('concurrencyChart'),
  freshnessDot: document.getElementById('freshnessDot'),
  freshnessLabel: document.getElementById('freshnessLabel'),
  generatedAtLabel: document.getElementById('generatedAtLabel'),
  locationBreakdown: document.getElementById('locationBreakdown'),
  overviewHighlights: document.getElementById('overviewHighlights'),
  overviewLegend: document.getElementById('overviewLegend'),
  platformBreakdown: document.getElementById('platformBreakdown'),
  rangeButtons: document.getElementById('rangeButtons'),
  recentEventsList: document.getElementById('recentEventsList'),
  recentSessionsBody: document.getElementById('recentSessionsBody'),
  sidebarButtons: Array.from(document.querySelectorAll('.nav-button')),
  streamBreakdown: document.getElementById('streamBreakdown'),
  summaryGrid: document.getElementById('summaryGrid'),
  topErrorsBody: document.getElementById('topErrorsBody'),
  views: Array.from(document.querySelectorAll('.content-view')),
};

function iconMarkup(name) {
  return `
    <svg class="icon" aria-hidden="true" focusable="false">
      <use href="#icon-${name}"></use>
    </svg>
  `;
}

function humanizeToken(value) {
  if (!value) {
    return 'Sin dato';
  }

  const normalized = String(value).trim();
  if (!normalized) {
    return 'Sin dato';
  }

  if (FRIENDLY_LABELS[normalized]) {
    return FRIENDLY_LABELS[normalized];
  }

  return normalized
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatRelativeTime(timestamp) {
  if (!timestamp) {
    return 'Sin registro';
  }

  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} h`;
  }

  return `${Math.floor(hours / 24)} d`;
}

function formatTimestamp(timestamp) {
  if (!timestamp) {
    return 'Sin dato';
  }

  return new Date(timestamp).toLocaleString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'short',
  });
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '0m';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

function formatPeopleLabel(count) {
  const safeCount = Number.isFinite(count) ? count : 0;
  return `${safeCount} ${safeCount === 1 ? 'persona' : 'personas'}`;
}

function createMetricCard(label, value, meta, icon) {
  const article = document.createElement('article');
  const isNumberLike = typeof value === 'number' || /^-?\d+(?:[.,]\d+)?$/.test(String(value).trim());
  article.className = `metric-card${isNumberLike ? '' : ' is-text-value'}`;
  article.innerHTML = `
    <div class="metric-icon-chip">${iconMarkup(icon)}</div>
    <p class="metric-value">${value}</p>
    <p class="metric-label">${label}</p>
    <p class="metric-meta">${meta}</p>
  `;
  return article;
}

function renderSummary(summary, breakdowns) {
  els.summaryGrid.innerHTML = '';

  const topPlatform = breakdowns.platforms[0];
  const topStream = breakdowns.streams[0];
  const cards = [
    createMetricCard('Usuarios activos', summary.connectedNow, 'Sesiones con heartbeat reciente', 'users'),
    createMetricCard('Sesiones del rango', summary.sessionsStarted, `Ventana ${state.range}`, 'pulse'),
    createMetricCard('Ciudades detectadas', summary.uniqueLocations, 'Ubicaciones nuevas o activas', 'map'),
    createMetricCard('Pico concurrente', summary.peakConcurrent, 'Maximo observado en la serie', 'signal'),
    createMetricCard('Errores', summary.errorEvents, 'Eventos playback_error', 'alert'),
    createMetricCard(
      'Modo dominante',
      topStream ? humanizeToken(topStream.streamType) : 'Sin dato',
      topPlatform ? `Cliente lider: ${humanizeToken(topPlatform.platform)}` : 'Sin plataformas todavia',
      'monitor'
    ),
  ];

  cards.forEach((card) => els.summaryGrid.appendChild(card));
}

function renderHeroMeta(snapshot) {
  const activeLocations = snapshot.breakdowns.locations.filter((row) => (row.activeNow || 0) > 0);
  const primaryLocation = activeLocations[0];

  els.activeNowValue.textContent = formatPeopleLabel(snapshot.summary.connectedNow);

  if (!activeLocations.length) {
    els.activeNowLocations.textContent = 'Todavia no hay una ciudad activa detectada en esta ventana.';
    els.activeTopCity.textContent = 'Sin ciudad';
    els.activeTopCityMeta.textContent = 'Cuando entren nuevas sesiones veras aqui Medellin, Bogota y otras ciudades.';
    return;
  }

  const liveLabels = activeLocations
    .slice(0, 3)
    .map((row) => `${row.activeNow} en ${row.locationLabel}`)
    .join(' · ');

  els.activeNowLocations.textContent = liveLabels;
  els.activeTopCity.textContent = primaryLocation.locationLabel;
  els.activeTopCityMeta.textContent = `${formatPeopleLabel(primaryLocation.activeNow)} activas en este momento.`;
}

function renderOverviewHighlights(snapshot) {
  els.overviewHighlights.innerHTML = '';
  els.overviewLegend.innerHTML = '';

  const topPlatform = snapshot.breakdowns.platforms[0];
  const topStream = snapshot.breakdowns.streams[0];
  const topLocation = snapshot.breakdowns.locations[0];
  const latestEvent = snapshot.recentEvents[0];

  const highlightRows = [
    {
      icon: 'monitor',
      label: 'Cliente dominante',
      value: topPlatform ? humanizeToken(topPlatform.platform) : 'Sin dato',
      meta: topPlatform ? `${topPlatform.activeNow} activos · ${topPlatform.sessionsStarted} sesiones` : 'Esperando trafico',
    },
    {
      icon: 'signal',
      label: 'Stream dominante',
      value: topStream ? humanizeToken(topStream.streamType) : 'Sin dato',
      meta: topStream ? `${topStream.activeNow} activos · ${topStream.playedSessions} reproducciones listas` : 'Sin reproducciones',
    },
    {
      icon: 'map',
      label: 'Ciudad mas activa',
      value: topLocation ? topLocation.locationLabel : 'Sin ciudad',
      meta: topLocation ? `${topLocation.activeNow} activos · ${topLocation.sessionsStarted} sesiones` : 'GeoIP esperando nuevos eventos',
    },
    {
      icon: 'list',
      label: 'Ultimo evento',
      value: latestEvent ? humanizeToken(latestEvent.eventType) : 'Sin eventos',
      meta: latestEvent
        ? `${humanizeToken(latestEvent.platform)} · ${latestEvent.locationLabel || 'sin ciudad'}`
        : 'Sin movimiento reciente',
    },
  ];

  highlightRows.forEach((row) => {
    const card = document.createElement('article');
    card.className = 'highlight-card';
    card.innerHTML = `
      <div class="highlight-icon">${iconMarkup(row.icon)}</div>
      <div>
        <p class="highlight-label">${row.label}</p>
        <h3>${row.value}</h3>
        <p class="highlight-meta">${row.meta}</p>
      </div>
    `;
    els.overviewHighlights.appendChild(card);
  });

  const legendRows = [
    { icon: 'clock', label: 'Promedio por sesion', value: `${snapshot.summary.avgSessionMinutes} min` },
    { icon: 'users', label: 'Conectando ahora', value: String(snapshot.summary.connectingNow) },
    { icon: 'pulse', label: 'Sesiones cerradas', value: String(snapshot.summary.sessionsCompleted) },
  ];

  legendRows.forEach((row) => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <span class="legend-icon">${iconMarkup(row.icon)}</span>
      <div>
        <strong>${row.value}</strong>
        <span>${row.label}</span>
      </div>
    `;
    els.overviewLegend.appendChild(item);
  });
}

function resolveBreakdownLabel(row, labelKey) {
  if (labelKey === 'locationLabel') {
    return row.locationLabel || 'Sin dato';
  }

  return humanizeToken(row[labelKey]);
}

function renderBreakdown(container, rows, labelKey) {
  container.innerHTML = '';
  if (!rows.length) {
    container.innerHTML = '<div class="empty-state">Aun no hay datos para este bloque.</div>';
    return;
  }

  const peak = rows.reduce((max, row) => Math.max(max, row.sessionsStarted || 0, 1), 1);

  rows.forEach((row) => {
    const item = document.createElement('section');
    item.className = 'stack-row';
    const label = resolveBreakdownLabel(row, labelKey);
    const width = Math.max(8, Math.round(((row.sessionsStarted || 0) / peak) * 100));
    item.innerHTML = `
      <header>
        <strong>${label}</strong>
        <span>${row.activeNow} activos · ${row.sessionsStarted} sesiones</span>
      </header>
      <div class="stack-bar"><div style="width: ${width}%"></div></div>
      <span>${row.playedSessions} sesiones llegaron a playback_ready</span>
    `;
    container.appendChild(item);
  });
}

function renderSessions(rows) {
  els.recentSessionsBody.innerHTML = '';

  if (!rows.length) {
    els.recentSessionsBody.innerHTML = '<tr><td colspan="6">Sin sesiones recientes</td></tr>';
    return;
  }

  rows.forEach((row) => {
    const tr = document.createElement('tr');
    const locationLabel = row.locationLabel || row.city || row.region || row.countryCode || row.country || 'Sin dato';
    tr.innerHTML = `
      <td><span class="status-chip ${row.status}">${humanizeToken(row.status)}</span></td>
      <td>${humanizeToken(row.platform)}</td>
      <td>${locationLabel}</td>
      <td>${humanizeToken(row.streamType)}</td>
      <td>${formatDuration(row.durationSeconds)}</td>
      <td title="${formatTimestamp(row.lastSeenAt)}">${formatRelativeTime(row.lastSeenAt)}</td>
    `;
    els.recentSessionsBody.appendChild(tr);
  });
}

function renderTopErrors(rows) {
  els.topErrorsBody.innerHTML = '';

  if (!rows.length) {
    els.topErrorsBody.innerHTML = '<tr><td colspan="3">Sin errores en el rango seleccionado</td></tr>';
    return;
  }

  rows.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.label}</td>
      <td>${row.count}</td>
      <td title="${formatTimestamp(row.lastSeenAt)}">${formatRelativeTime(row.lastSeenAt)}</td>
    `;
    els.topErrorsBody.appendChild(tr);
  });
}

function renderRecentEvents(rows) {
  els.recentEventsList.innerHTML = '';

  if (!rows.length) {
    els.recentEventsList.innerHTML = '<div class="empty-state">Esperando eventos...</div>';
    return;
  }

  rows.forEach((row) => {
    const item = document.createElement('article');
    item.className = 'event-item';
    item.innerHTML = `
      <div class="event-main">
        <div class="event-icon">${iconMarkup('pulse')}</div>
        <div>
          <strong>${humanizeToken(row.eventType)}</strong>
          <p>${humanizeToken(row.platform)} · ${humanizeToken(row.streamType)} · ${humanizeToken(row.playbackState || 'unknown')}</p>
          <p>${row.locationLabel || row.errorMessage || row.errorCode || 'Evento operativo'}</p>
        </div>
      </div>
      <time datetime="${new Date(row.serverTimestamp).toISOString()}">${formatRelativeTime(row.serverTimestamp)}</time>
    `;
    els.recentEventsList.appendChild(item);
  });
}

function renderChart(points) {
  const svg = els.concurrencyChart;
  svg.innerHTML = '';

  if (!points.length) {
    return;
  }

  const width = 960;
  const height = 320;
  const padding = { top: 16, right: 22, bottom: 34, left: 42 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxConnected = Math.max(...points.map((point) => point.connected), 1);
  const minTs = points[0].bucketStart;
  const maxTs = points[points.length - 1].bucketEnd;

  const xAt = (value) => {
    if (maxTs === minTs) {
      return padding.left;
    }
    return padding.left + ((value - minTs) / (maxTs - minTs)) * innerWidth;
  };

  const yAt = (value) => padding.top + innerHeight - (value / maxConnected) * innerHeight;
  const linePoints = points.map((point) => `${xAt(point.bucketStart)},${yAt(point.connected)}`).join(' ');

  for (let tick = 0; tick <= 4; tick += 1) {
    const value = Math.round((maxConnected / 4) * tick);
    const y = yAt(value);
    const guide = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    guide.setAttribute('x1', String(padding.left));
    guide.setAttribute('y1', String(y));
    guide.setAttribute('x2', String(width - padding.right));
    guide.setAttribute('y2', String(y));
    guide.setAttribute('stroke', 'rgba(255,255,255,0.08)');
    guide.setAttribute('stroke-width', '1');
    svg.appendChild(guide);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', String(padding.left - 12));
    label.setAttribute('y', String(y + 4));
    label.setAttribute('fill', 'rgba(255,255,255,0.5)');
    label.setAttribute('font-size', '12');
    label.setAttribute('text-anchor', 'end');
    label.textContent = String(value);
    svg.appendChild(label);
  }

  const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const areaPoints = `${padding.left},${height - padding.bottom} ${linePoints} ${xAt(points[points.length - 1].bucketStart)},${height - padding.bottom}`;
  area.setAttribute('d', `M ${areaPoints}`);
  area.setAttribute('fill', 'rgba(255, 63, 43, 0.14)');
  svg.appendChild(area);

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', linePoints);
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', '#ff4732');
  polyline.setAttribute('stroke-width', '3.5');
  polyline.setAttribute('stroke-linejoin', 'round');
  polyline.setAttribute('stroke-linecap', 'round');
  svg.appendChild(polyline);

  points.forEach((point, index) => {
    if (index % Math.max(1, Math.floor(points.length / 6)) !== 0 && index !== points.length - 1) {
      return;
    }

    const x = xAt(point.bucketStart);
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', String(x));
    circle.setAttribute('cy', String(yAt(point.connected)));
    circle.setAttribute('r', '4.5');
    circle.setAttribute('fill', '#ff4732');
    circle.setAttribute('stroke', '#ffffff');
    circle.setAttribute('stroke-width', '1.5');
    svg.appendChild(circle);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', String(x));
    label.setAttribute('y', String(height - 10));
    label.setAttribute('fill', 'rgba(255,255,255,0.48)');
    label.setAttribute('font-size', '12');
    label.setAttribute('text-anchor', 'middle');
    label.textContent = new Date(point.bucketStart).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
    });
    svg.appendChild(label);
  });

  const latest = points[points.length - 1];
  els.chartLegend.textContent = `Ultimo punto: ${latest.connected} conectados · ${latest.starts} inicios · ${latest.errors} errores`;
}

function renderFreshness(snapshot) {
  const generatedAt = new Date(snapshot.generatedAt);
  els.generatedAtLabel.textContent = `Actualizado ${generatedAt.toLocaleTimeString('es-CO')}`;

  const lastTouch = snapshot.freshness.latestSessionTouchAt;
  const lagMs = lastTouch ? snapshot.generatedAt - lastTouch : Number.POSITIVE_INFINITY;
  const healthy = Number.isFinite(lagMs) && lagMs <= snapshot.freshness.activeWindowMs;

  els.freshnessDot.style.color = healthy ? 'var(--success)' : 'var(--warning)';
  els.freshnessDot.style.background = healthy ? 'var(--success)' : 'var(--warning)';
  els.freshnessLabel.textContent = healthy
    ? `Latencia operativa ${Math.max(1, Math.round(lagMs / 1000))}s`
    : 'Sin heartbeat reciente dentro de la ventana activa';
}

function renderRangeButtons() {
  els.rangeButtons.innerHTML = '';
  RANGE_OPTIONS.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `range-button${state.range === option.key ? ' active' : ''}`;
    button.textContent = option.label;
    button.addEventListener('click', () => {
      state.range = option.key;
      renderRangeButtons();
      fetchSnapshot();
    });
    els.rangeButtons.appendChild(button);
  });
}

function setActiveView(viewKey) {
  state.view = viewKey;

  els.sidebarButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.view === viewKey);
  });

  els.views.forEach((view) => {
    view.classList.toggle('active', view.id === `view-${viewKey}`);
  });
}

async function fetchSnapshot() {
  const params = new URLSearchParams({
    range: state.range,
    bucket: state.bucket,
  });

  const response = await fetch(`/api/v1/dashboard/snapshot?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`No se pudo cargar el dashboard (${response.status})`);
  }

  const snapshot = await response.json();
  renderFreshness(snapshot);
  renderHeroMeta(snapshot);
  renderSummary(snapshot.summary, snapshot.breakdowns);
  renderOverviewHighlights(snapshot);
  renderBreakdown(els.platformBreakdown, snapshot.breakdowns.platforms, 'platform');
  renderBreakdown(els.streamBreakdown, snapshot.breakdowns.streams, 'streamType');
  renderBreakdown(els.locationBreakdown, snapshot.breakdowns.locations, 'locationLabel');
  renderSessions(snapshot.recentSessions);
  renderTopErrors(snapshot.topErrors);
  renderRecentEvents(snapshot.recentEvents);
  renderChart(snapshot.charts.concurrency);
}

async function refreshLoop() {
  try {
    await fetchSnapshot();
  } catch (error) {
    els.freshnessDot.style.background = 'var(--danger)';
    els.freshnessLabel.textContent = error.message;
  }
}

els.bucketSelect.addEventListener('change', () => {
  state.bucket = els.bucketSelect.value;
  fetchSnapshot().catch((error) => {
    els.freshnessLabel.textContent = error.message;
  });
});

els.sidebarButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveView(button.dataset.view);
  });
});

renderRangeButtons();
setActiveView(state.view);
refreshLoop();
setInterval(refreshLoop, REFRESH_INTERVAL_MS);
