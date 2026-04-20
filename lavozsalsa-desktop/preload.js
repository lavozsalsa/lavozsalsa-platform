const { contextBridge, ipcRenderer } = require('electron');

const API = {
  getBootstrap: () => ipcRenderer.invoke('desktop:get-bootstrap'),
  loginWithEmail: (payload) => ipcRenderer.invoke('desktop:login-email', payload),
  registerWithEmail: (payload) => ipcRenderer.invoke('desktop:register-email', payload),
  sendPasswordReset: (payload) => ipcRenderer.invoke('desktop:send-password-reset', payload),
  logout: () => ipcRenderer.invoke('desktop:logout'),
  reloadWebview: () => ipcRenderer.send('desktop:reload-webview'),
  openExternal: (url) => ipcRenderer.send('desktop:open-external', url),
  openSectionExternal: (section) => ipcRenderer.send('desktop:open-section-external', section),
  onNavigateRequest: (handler) => {
    const listener = (_event, section) => handler(section);
    ipcRenderer.on('desktop:navigate-request', listener);

    return () => {
      ipcRenderer.removeListener('desktop:navigate-request', listener);
    };
  },
};

contextBridge.exposeInMainWorld('lavozsalsaDesktop', API);
