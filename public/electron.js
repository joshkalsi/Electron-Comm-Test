// Modules to control application life and create native browser window
// Need to turn off ESLint as it wants import syntax, but that isn't supported here
const {
    app,
    BrowserWindow,
    ipcMain,
    globalShortcut,
    screen,
} = require('electron'); // eslint-disable-line @typescript-eslint/no-var-requires
const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires
const url = require('url'); // eslint-disable-line @typescript-eslint/no-var-requires

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, tabletWindow, displays;

function createMainWindow() {
    const display = displays[0];
    // Create the browser window.
    mainWindow = new BrowserWindow({
        x: display.bounds.x,
        y: display.bounds.y,
        width: display.bounds.width,
        height: display.bounds.height,
        frame: true,
        fullscreen: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'electron-preload.js'),
            webSecurity: false,
        },
    });

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL
        ? process.env.ELECTRON_START_URL + '/#/main'
        : url.format({
              pathname: path.join(__dirname, 'index.html'),
              protocol: 'file:',
              slashes: true,
              hash: '/main',
          });

    mainWindow.webContents.openDevTools();
    console.log(startUrl);
    mainWindow.loadURL(startUrl);

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}
function createTabletWindow() {
    const display = displays[1];
    // Create the browser window.
    tabletWindow = new BrowserWindow({
        x: display.bounds.x,
        y: display.bounds.y,
        width: display.bounds.width,
        height: display.bounds.height,
        frame: true,
        fullscreen: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'electron-preload.js'),
            webSecurity: false,
        },
    });

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL
        ? process.env.ELECTRON_START_URL + '/#/tablet'
        : url.format({
              pathname: path.join(__dirname, 'index.html'),
              protocol: 'file:',
              slashes: true,
              hash: '/tablet',
          });

    console.log(startUrl);

    tabletWindow.webContents.openDevTools();
    tabletWindow.loadURL(startUrl);

    // Emitted when the window is closed.
    tabletWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        tabletWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    displays = screen.getAllDisplays();
    createMainWindow();
    createTabletWindow();

    globalShortcut.register('CommandOrControl+Shift+D', () => {
        mainWindow.webContents.openDevTools();
        tabletWindow.webContents.openDevTools();
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until  the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createMainWindow();
    if (tabletWindow === null) createTabletWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('getExternalResourcePath', () => {
    if (app.isPackaged) return process.resourcesPath;
    else return __dirname;
});

ipcMain.handle('sendToMainWindow', (event, message) => {
    console.log('message to main: ', message);
    mainWindow.webContents.send('sendToMainWindow', message);
});
ipcMain.handle('sendToTabletWindow', (event, message) => {
    console.log('message to tablet: ', message);
    tabletWindow.webContents.send('sendToTabletWindow', message);
});
