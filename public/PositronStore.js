const electron = require('electron')
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch');
const { getCanvasTasks } = require('./canvas')
const Task = require('./Task')

const DEFAULT_STORE_LAYOUT = {
  tasks: [],
  groups: {},
  canvas: {}
}

const DEFAULT_GROUP_LAYOUT = {
  tasks: [],
  label: '',
  id: '' // maybe add group colors later?
}

const NULL_TASK = Task(undefined, undefined, undefined, undefined, undefined, undefined, undefined)

class PositronStore {
  constructor() {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')
    this.path = path.join(userDataPath, 'store.json')
    this.data = parseDataFile(this.path)
  }
  
  getGroups() {
    var groupList = []
    for (const group of this.data.groups) groupList.push(group)
    return groupList
  }

  getGroup(groupID) {
    return this.data.groups[groupID]
  }

  async refreshCanvasImports(base_url, access_token) {
    if (access_token === undefined) return []
    console.log('getting canvas tasks')
    const canvURL = (endpoint) => `https://${base_url}/api/v1/${endpoint}?per_page=999`
    const canv = (endpoint) => fetch(canvURL(endpoint), {headers: {'Authorization':`Bearer ${access_token}`}}).then(res => res.json())
    const courses = await canv('courses')
    var possibleTasks = []
    for (const course of courses) {
      if (!this.data.canvas[course.id]) this.data.canvas[course.id] = {}
      const assignments = await canv(`courses/${course.id}/assignments`)
      for (const assignment of assignments) {
        var stored = this.data.canvas[course.id][assignment.id] || NULL_TASK
        const date = (due_at) => (due_at && Date.parse(due_at)) || undefined
        this.data.canvas[course.id][assignment.id] = assignment
        if (this.data.tasks.filter(task => task.id === (assignment.id || stored.id)).length === 0) {
          possibleTasks.push(Task(
            assignment.name || stored.name || `${course.course_code} assignment`,
            date(assignment.due_at) || date(stored.due_at) || 0,
            assignment.description || stored.description || `Imported from class: ${course.name} (${course.course_code})`,
            assignment.html_url || stored.html_url || undefined,
            [`${course.course_code}`],
            false,
            assignment.id || stored.id || -1
          ))
        }
      }
    }
    console.log(`complete, found ${possibleTasks.length} new tasks`)
    this.addAllTasks(possibleTasks)
    return this.data.tasks
  }

  getTasks() {
    return this.data.tasks
  }

  getTask(index) {
    return this.data.tasks[index]
  }
  
  setTask(index, task) {
    this.data.tasks[index] = task
    this.save()
  }

  addTask(task) {
    this._addTask(task)
    this.save()
  }

  _addTask(task) {
    if (task.id === -1) task.id = this.getNextTaskIndex()
    for (const groupID of task.groups) {
      if (!this.data.groups[groupID]) this.data.groups[groupID] = DEFAULT_GROUP_LAYOUT
      this.data.groups[groupID].tasks.push(task.id)
    }
    this.data.tasks.push(task)
  }

  addAllTasks(tasks) {
    for (const task of tasks) {
      this._addTask(task)
    }
    this.save()
  }

  removeTask(taskID) {
    var taskIndex = -1
    var task = this.data.tasks.filter((task, index) => {
      if (task.id === taskID) {
        taskIndex = index
        return true
      } else return false
    })[0]
    for (const groupID of task.groups) {
      var tasks = this.data.groups[groupID].tasks
      tasks = tasks.filter(task => task.id !== taskID)
      if (tasks.length !== 0) {
        this.data.groups[groupID].tasks = tasks
      } else delete this.data.groups[groupID]
    }
    this.data.tasks.splice(taskIndex, 1)
  }

  save() {
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }

  getNextTaskIndex() {
    return this.data.tasks.length
  }
}

function parseDataFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch(error) {
    return DEFAULT_STORE_LAYOUT
  }
}

module.exports = PositronStore