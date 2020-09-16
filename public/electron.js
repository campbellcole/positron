const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

var mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  const mainURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
  mainWindow.loadURL(mainURL);
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.openDevTools({mode: 'detach'})
  });
  mainWindow.on('closed', () => mainWindow = null);
  ipcMain.on('command', (event, command) => {
    switch (command) {
      case 'close': mainWindow.close(); break;
      case 'maximize':
        if (mainWindow.isMaximized()) mainWindow.unmaximize();
        else mainWindow.maximize();
        break;
      case 'minimize': mainWindow.minimize(); break;
      default: break;
    }
  })
}

app.on('ready', createWindow);