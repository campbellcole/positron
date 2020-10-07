import { v4 as uuid } from 'uuid'
const electron = window.require('electron')

function defer() {
  var res, rej;
  var promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  })
  promise.resolve = res;
  promise.reject = rej
  return promise
}

var handlers = {}
var initialized = false

function ipc_get(name, data = undefined) {
  if (!initialized) {
    electron.ipcRenderer.on('got', (event, data) => {
      var handler = handlers[data.requestId];
      if (handler !== undefined) {
        handler.resolve(data.response)
        handlers[requestId] = null
      } else console.log('disposing of received data because no handler was set up')
    })
    initialized = true
  }
  var promise = defer()
  var requestId = uuid()
  handlers[requestId] = promise
  electron.ipcRenderer.send('get', {requestId: requestId, name: name, data: data})
  return promise
}

var _functions = {}

var _refreshFunction;
function set_refresh_function(refreshFunction) {
  _functions['refresh'] = refreshFunction
}

function refresh_tasks(...args) {
  _functions['refresh'](...args)
}

function set_redirect_function(redirectFunction) {
  _functions['redirect'] = redirectFunction
}

function redirect(...args) {
  _functions['redirect'](...args)
}

function set_alert_function(alertFunction) {
  _functions['alert'] = alertFunction
}

function show_alert(...args) {
  _functions['alert'](...args)
}

export {
  ipc_get,
  set_refresh_function, refresh_tasks,
  set_redirect_function, redirect,
  set_alert_function, show_alert
}