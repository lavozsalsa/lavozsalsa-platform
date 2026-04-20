const state = {
  mode: 'home',
  pageTitle: 'La Voz Salsa',
  urls: {
    app: 'https://app.lavozsalsa.com/',
    radio: 'https://app.lavozsalsa.com/',
    tv: 'https://app.lavozsalsa.com/tv',
  },
};

let webviewReady = false;

function $(id) {
  return document.getElementById(id);
}

function getWebview() {
  return $('app-webview');
}

function getTargetUrl(mode) {
  if (mode === 'tv') {
    return state.urls.tv;
  }

  if (mode === 'radio') {
    return state.urls.radio;
  }

  return state.urls.app;
}

function updateTitle() {
  document.title = state.pageTitle ? `La Voz Salsa · ${state.pageTitle}` : 'La Voz Salsa';
}

function loadSection(mode) {
  state.mode = mode;

  const webview = getWebview();
  const targetUrl = getTargetUrl(mode);
  const currentSrc = webview.getAttribute('src');

  if (currentSrc !== targetUrl) {
    webview.setAttribute('src', targetUrl);
    return;
  }

  if (webviewReady) {
    webview.reload();
  }
}

function updateLocationState() {
  const webview = getWebview();

  try {
    const currentUrl = webview.getURL();
    if (currentUrl.includes('/tv')) {
      state.mode = 'tv';
    } else if (currentUrl.startsWith(state.urls.radio)) {
      state.mode = 'radio';
    } else {
      state.mode = 'home';
    }
  } catch {}

  try {
    const title = webview.getTitle();
    if (title) {
      state.pageTitle = title;
    }
  } catch {}

  updateTitle();
}

function bindWebviewEvents() {
  const webview = getWebview();

  webview.addEventListener('dom-ready', () => {
    webviewReady = true;
    updateLocationState();
  });

  webview.addEventListener('page-title-updated', (event) => {
    state.pageTitle = event.title || 'La Voz Salsa';
    updateTitle();
  });

  webview.addEventListener('did-navigate', updateLocationState);
  webview.addEventListener('did-navigate-in-page', updateLocationState);
  webview.addEventListener('did-stop-loading', updateLocationState);
}

function bindActions() {
  window.lavozsalsaDesktop.onNavigateRequest((section) => {
    if (section === 'reload-webview') {
      if (webviewReady) {
        getWebview().reload();
      }
      return;
    }

    if (section === 'home' || section === 'radio' || section === 'tv') {
      loadSection(section);
    }
  });
}

async function hydrate() {
  try {
    const bootstrap = await window.lavozsalsaDesktop.getBootstrap();
    state.urls = bootstrap.urls || state.urls;
    loadSection(bootstrap.startSection || 'home');
  } catch {
    loadSection('home');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  bindWebviewEvents();
  bindActions();
  hydrate();
});
