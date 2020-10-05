const { app, BrowserWindow, ipcMain, shell } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const PositronStore = require('./PositronStore')
const { getCanvasTasks } = require('./canvas')

var mainWindow, store

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
  mainWindow.show()
  mainWindow.webContents.on('new-window', (e, url) => {
    if (url != mainWindow.webContents.getURL()) {
      e.preventDefault()
      shell.openExternal(url)
    }
  })
  mainWindow.on('closed', () => mainWindow = null)
  store = new PositronStore()
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
  ipcMain.on('get', (_, request) => {
    const send = (data) => {
      request.response = data
      mainWindow.webContents.send('got', request)
    }
    switch (request.name) {
      case 'groups':
        var groups = store.getGroups()
        send(groups)
        break
      case 'newTask':
        if (request.data !== undefined) {
          var task = request.data
          store.addTask(task)
        }
        // fall through
      case 'tasks:local':
        console.log('getting local tasks')
        send(store.getTasks())
        break
      case 'tasks:remote':
        console.log('getting remote tasks')
        store.refreshCanvasImports().then(tasks => send(tasks)).catch(err => {
          console.error(err)
          send([])
        })
        break
      case 'setCanvasLogin':
        console.log('setting canvas login')
        store.setCanvasLogin(request.data.base_url, request.data.access_token)
      default:
        send('bad request')
        break
    }
  })
}

app.on('ready', createWindow)