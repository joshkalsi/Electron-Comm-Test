// ipcRenderer is used to receive messages sent from the main process to the browser process - we can't call it directly in the browser, so contexrBridge acts as a transfer point

// Need to turn off ESLint as it wants import syntax, but that isn't supported here
const { contextBridge, ipcRenderer } = require('electron'); // eslint-disable-line @typescript-eslint/no-var-requires

// Preload:
contextBridge.exposeInMainWorld('electronAPI', {
    getExternalResourcePath: () =>
        ipcRenderer.invoke('getExternalResourcePath'),
    sendToMainWindow: (message) =>
        ipcRenderer.invoke('sendToMainWindow', message),
    sendToTabletWindow: (message) =>
        ipcRenderer.invoke('sendToTabletWindow', message),
    onMainWindowReceive: (callback) =>
        ipcRenderer.on('sendToMainWindow', callback),
    onTabletWindowReceive: (callback) =>
        ipcRenderer.on('sendToTabletWindow', callback),
});
