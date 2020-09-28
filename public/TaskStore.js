const electron = require('electron')
const path = require('path')
const fs = require('fs')

class TaskStore {
  constructor() {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')
    this.path = path.join(userDataPath, 'tasks.json')
    this.data = parseDataFile(this.path)
  }
  
  getTasks() {
    return this.data.tasks
  }

  get(index) {
    return this.data.tasks[index]
  }
  
  set(index, task) {
    this.data.tasks[index] = task
    this.save()
  }

  add(task) {
    this._add(task)
    this.save()
  }

  _add(task) {
    task.id = this.getNextIndex()
    this.data.tasks.push(task)
  }

  addAll(tasks) {
    for (const task of tasks) {
      this._add(task)
    }
    this.save()
  }

  save() {
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }

  getNextIndex() {
    return this.data.tasks.length
  }
}

function parseDataFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch(error) {
    return {tasks:[]}
  }
}

module.exports = TaskStore