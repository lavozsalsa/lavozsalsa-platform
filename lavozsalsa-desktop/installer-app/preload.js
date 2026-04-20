const { contextBridge, ipcRenderer } = require('electron');

const API = {
  getBootstrap: () => ipcRenderer.invoke('installer:get-bootstrap'),
  prepareAndOpen: () => ipcRenderer.invoke('installer:prepare-and-open'),
  showInFinder: () => ipcRenderer.invoke('installer:show-in-finder'),
  onProgress: (handler) => {
    const listener = (_event, payload) => handler(payload);
    ipcRenderer.on('installer:progress', listener);

    return () => {
      ipcRenderer.removeListener('installer:progress', listener);
    };
  },
};

contextBridge.exposeInMainWorld('lavozsalsaInstaller', API);
