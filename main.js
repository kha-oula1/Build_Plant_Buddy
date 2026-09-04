require('electron-reload')(__dirname) // electron-reload

const { app, BrowserWindow, ipcMain } = require('electron');
function createWindow() {
  const win = new BrowserWindow({
    width: 320,
    height: 420,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    center: true,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
  ipcMain.on('window:minimize', () => win.minimize());
  ipcMain.on('window:close', () => win.close());
};

app.whenReady().then(createWindow);