const state = {
  destinationPath: null,
  pending: false,
};

function $(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const node = $(id);
  if (node) {
    node.textContent = value;
  }
}

function setStatus(title, copy, stage = 'idle') {
  $('status-box').dataset.stage = stage;
  setText('status-title', title);
  setText('status-copy', copy);
}

function setProgress(percent, label, visible = true) {
  $('progress-area').hidden = !visible;
  $('progress-bar').style.width = `${Math.max(0, Math.min(100, percent))}%`;
  setText('progress-percent', `${Math.round(percent)}%`);
  setText('progress-label', label);
}

function setPending(pending) {
  state.pending = pending;
  $('btn-install').disabled = pending;
}

function bindProgressEvents() {
  window.lavozsalsaInstaller.onProgress((payload) => {
    if (payload.stage === 'preparing') {
      setStatus(
        'Preparando instalacion',
        'Estamos preparando la version correcta de La Voz Salsa para tu Mac.',
        'working',
      );
      setProgress(10, 'Preparando instalacion...', true);
      return;
    }

    if (payload.stage === 'copying') {
      setStatus(
        'Preparando instalacion',
        'Estamos organizando la version correcta para este Mac.',
        'working',
      );
      setProgress(payload.percent || 0, 'Copiando archivos de instalacion...', true);
      return;
    }

    if (payload.stage === 'extracting') {
      setStatus(
        'Descomprimiendo app',
        'Estamos preparando internamente La Voz Salsa para instalarla en Aplicaciones.',
        'working',
      );
      setProgress(payload.percent || 0, 'Descomprimiendo app...', true);
      return;
    }

    if (payload.stage === 'installing') {
      setStatus(
        'Instalando app',
        'macOS puede pedirte permiso para copiar La Voz Salsa a la carpeta Aplicaciones. Ese es el permiso normal del sistema.',
        'working',
      );
      setProgress(payload.percent || 0, 'Instalando en Aplicaciones...', true);
      return;
    }

    if (payload.stage === 'ready') {
      state.destinationPath = payload.destinationPath || state.destinationPath;
      $('btn-finder').hidden = !state.destinationPath;
      setStatus(
        'Instalacion terminada',
        'La Voz Salsa ya quedo instalada y lista para abrirse desde Aplicaciones.',
        'success',
      );
      setProgress(100, 'Instalacion completa', true);
      return;
    }

    if (payload.stage === 'error') {
      setStatus('No pudimos preparar el instalador', payload.message || 'Intentalo de nuevo.', 'error');
      setProgress(0, 'Error', false);
    }
  });
}

async function hydrate() {
  const bootstrap = await window.lavozsalsaInstaller.getBootstrap();
  setText('architecture-label', bootstrap.architectureLabel);
  setText('app-version', bootstrap.appVersion || '-');
  setText('destination-name', bootstrap.destinationLabel || 'Aplicaciones');
  setText('payload-size', bootstrap.payloadSizeLabel || '-');
  setText('app-version-badge', `App ${bootstrap.appVersion || '-'}`);
  setText('footnote', bootstrap.note || $('footnote').textContent);
}

async function handleInstall() {
  setPending(true);
  setStatus(
    'Preparando instalacion',
    'Estamos preparando automaticamente la version correcta para este Mac.',
    'working',
  );
  setProgress(10, 'Preparando instalacion...', true);

  try {
    const result = await window.lavozsalsaInstaller.prepareAndOpen();
    state.destinationPath = result.destinationPath || null;
    $('btn-finder').hidden = !state.destinationPath;
    setStatus(
      'La Voz Salsa ya esta instalada',
      'Tu app ya quedo instalada en Aplicaciones y lista para abrir.',
      'success',
    );
    setProgress(100, 'Instalacion completa', true);
  } catch (error) {
    setStatus(
      'No pudimos instalar La Voz Salsa',
      error.message || 'Intentalo otra vez en unos segundos.',
      'error',
    );
    setProgress(0, 'Error', false);
  } finally {
    setPending(false);
  }
}

async function handleShowInFinder() {
  try {
    await window.lavozsalsaInstaller.showInFinder();
  } catch (error) {
    setStatus(
      'No encontramos el instalador',
      error.message || 'Vuelve a instalar para que la app aparezca en Finder.',
      'error',
    );
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  bindProgressEvents();
  $('btn-install').addEventListener('click', handleInstall);
  $('btn-finder').addEventListener('click', handleShowInFinder);

  try {
    await hydrate();
  } catch (error) {
    setStatus(
      'No pudimos iniciar el instalador',
      error.message || 'Reinicia la app e intentalo otra vez.',
      'error',
    );
  }
});
