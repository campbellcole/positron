import { v4 as uuid } from 'uuid'
const fetch = window.fetch
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
  }
  var promise = defer()
  var requestId = uuid()
  handlers[requestId] = promise
  electron.ipcRenderer.send('get', {requestId: requestId, name: name, data: data})
  return promise
}

function formatDateTime(date) {
  return `${(date.getHours()+1)%12}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${date.getHours()%12===1?'AM':'PM'} ${date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
}

export { ipc_get, formatDateTime }