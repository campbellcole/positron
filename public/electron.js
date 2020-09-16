const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

var mainWindow;

const tempTasks = [
  {
    id: 0,
    title: 'test',
    due: new Date().getTime(),
    groups: ['test', 'test1', 'test2']
  },
  {
    id: 1,
    title: 'testing!',
    due: 0,
    groups: ['test', 'test1', 'test2']
  },
  {
    id: 2,
    title: 'when?',
    due: 11325712895,
    groups: ['test', 'test1', 'test2']
  },
  {
    id: 3,
    title: 'now',
    due: new Date().getTime(),
    groups: ['test', 'test1', 'test2']
  },
  {
    id: 4,
    title: 'ok',
    due: new Date().getTime(),
    groups: ['test', 'test1', 'test2']
  },
  {
    id: 4,
    title: 'ok',
    due: new Date().getTime(),
    groups: ['test', 'test1', 'test2']
  },
  {
    id: 4,
    title: 'ok',
    due: new Date().getTime(),
    groups: ['test', 'test1', 'test2']
  },
  {
    id: 4,
    title: 'ok',
    due: new Date().getTime(),
    groups: ['test', 'test1', 'test2']
  },
  {
    id: 4,
    title: 'ok',
    due: new Date().getTime(),
    groups: ['test', 'test1', 'test2']
  },
  {
    id: 4,
    title: 'ok',
    due: new Date().getTime(),
    groups: ['test', 'test1', 'test2']
  },
]

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
    resizable: false
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
      case 'close':
        mainWindow.close()
        break
      case 'maximize':
        if (mainWindow.isMaximized()) mainWindow.unmaximize()
        else mainWindow.maximize()
        break
      case 'minimize':
        mainWindow.minimize()
        break
      case 'getTasks':
        mainWindow.webContents.send('tasks', tempTasks)
        break
      default: 
        break
    }
  })
}

app.on('ready', createWindow);