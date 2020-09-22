const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const TaskStore = require('./TaskStore')
const { getCanvasTasks } = require('./canvas')

var mainWindow, taskStore

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  const mainURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  mainWindow.loadURL(mainURL)
  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.on('closed', () => mainWindow = null)
  taskStore = new TaskStore()
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
      case 'openTools':
        mainWindow.openDevTools({ mode: 'undocked'})
        break;
      default: 
        break
    }
  })
  ipcMain.on('get', (event, request) => {
    switch (request.name) {
      case 'groups':
        const o = (l) => ({value:l,label:l})
        request.response = [o('Test 1'), o('Test 2'), o('Test 3')]
        break
      case 'newTask':
        if (request.data !== undefined) {
          var task = request.data
          taskStore.add(task)
        }
        // fall through
      case 'tasks':
        request.response = taskStore.getTasks()
        break
      case 'canv':
        getCanvasTasks('4cd.instructure.com').then((courses) => {
          request.response = courses
          mainWindow.webContents.send('got', request)
        })
        break
      default:
        request.response = 'bad request'
        break
    }
    if (request.response) mainWindow.webContents.send('got', request)
  })
}

app.on('ready', createWindow)