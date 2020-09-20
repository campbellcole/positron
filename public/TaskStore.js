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
    return [
      {
        id: 0,
        title: 'test',
        due: 7586345643875,
        description: 'test description',
        groups: ['test', 'test1']
      },
      {
        id: 1,
        title: 'test',
        due: 0,
        description: 'test description',
        groups: ['test', 'test1']
      },
      {
        id: 2,
        title: 'test',
        due: 0,
        description: 'test description',
        groups: ['test', 'test1']
      },
      {
        id: 3,
        title: 'test',
        due: 0,
        description: 'test description',
        groups: ['test', 'test1']
      },
      {
        id: 4,
        title: 'test',
        due: 0,
        description: 'test description',
        groups: ['test', 'test1']
      },
    ]
    //return this.data.tasks
  }

  get(index) {
    return this.data.tasks[index]
  }
  
  set(index, task) {
    this.data.tasks[index] = task
    this.save()
  }

  add(task) {
    task.id = this.getNextIndex()
    this.data.tasks.push(task)
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