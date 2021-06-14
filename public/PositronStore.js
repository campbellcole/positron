const electron = require('electron')
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')
const moment = require('moment')
const Task = require('./Task')

const DEFAULT_STORE_LAYOUT = () => ({
  tasks: [],
  groups: {},
  deleted: [], // array of canvas IDs that shouldn't be reimported
  login: { base_url: null, access_token: null },
  settings: { decent_hours: null }
})

const DEFAULT_GROUP_LAYOUT = () => ({
  tasks: [],
  label: '',
  id: '' // maybe add group colors later?
})

class PositronStore {
  constructor() {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')
    this.path = path.join(userDataPath, 'store.json')
    this.data = parseDataFile(this.path)
  }
  
  getGroups() {
    var groupList = []
    for (const group in this.data.groups) groupList.push(group)
    return groupList
  }

  getGroup(groupID) {
    return this.data.groups[groupID]
  }

  setCanvasLogin(base_url, access_token) {
    this.data.login.base_url = base_url
    this.data.login.access_token = access_token
    this.resetCanvasImports()
  }

  async setCanvasSettings(settings) {
    console.log(settings)
    if (this.data.settings === undefined || Object.keys(this.data.settings).length === 0) this.data.settings = DEFAULT_STORE_LAYOUT().settings
    for (var key of Object.keys(settings)) {
      if (settings[key] != null && this.data.settings[key] !== undefined) {
        this.data.settings[key] = settings[key]
      }
    }
    this.resetCanvasImports()
    await this.refreshCanvasImports()
  }

  resetCanvasImports() {
    this.data.tasks = this.data.tasks.filter(task => !task.canvasID)
    this.canvas = {}
    this.save()
  }

  async refreshCanvasImports() {
    const { login } = this.data
    if (!login.access_token || !login.base_url) return []
    const { base_url, access_token } = login
    console.log(`getting canvas tasks from ${base_url}`)
    const canvURL = (endpoint, include) => `https://${base_url}/api/v1/${endpoint}?per_page=999${include && `&include[]=${include}`}`
    const canv = (endpoint, include) => fetch(canvURL(endpoint, include), {headers: {'Authorization':`Bearer ${access_token}`}}).then(res => res.json())
    const parseDate = (due_at) => (due_at && Date.parse(due_at)) || undefined
    const courses = await canv('courses')
    var possibleTasks = []
    for (const course of courses) {
      const assignments = await canv(`courses/${course.id}/assignments`)
      if (assignments.status && assignments.status === 'unauthorized') {
        console.log(`skipping course ${course.id}, unauthorized`)
        continue
      }
      for (const assignment of assignments) {
        if (this.data.deleted.indexOf(assignment.id) !== -1) continue
        if (this.data.tasks.filter(task => task.canvasID && task.canvasID === assignment.id).length === 0) {
          var id = assignment.id || -1
          var name = assignment.name || `${course.course_code} assignment`
          var date = (assignment.due_at && Date.parse(assignment.due_at)) || 0
          var description = assignment.description || `Imported from class: ${course.name} (${course.course_code})`
          var url = assignment.html_url || undefined
          var groups = [`${course.course_code.replace(/\W/g, '_')}`]
          var completed = false
          if (this.data.settings.decent_hours && date !== 0) {
            var momentDate = moment(date)
            var decentDate = momentDate.clone()
            var decentHoursSplit = this.data.settings.decent_hours.split(':')
            decentDate.set({'hours':parseInt(decentHoursSplit[0]),'minutes':parseInt(decentHoursSplit[1])})
            if (momentDate.isBefore(decentDate)) {
              momentDate.subtract(1, 'days')
              momentDate.set({'hours':11,'minutes':59})
              date = momentDate.unix() * 1000
            }
          }
          possibleTasks.push(Task(name, date, description, url, groups, completed, id))
        }
      }
    }
    console.log(`complete, found ${possibleTasks.length} new tasks`)
    this.addAllTasks(possibleTasks)
    return possibleTasks
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
      if (!this.data.groups[groupID]) {
        this.data.groups[groupID] = DEFAULT_GROUP_LAYOUT()
      }
      this.data.groups[groupID].tasks.push(task.id)
    }
    this.data.tasks.push(task)
  }

  addAllTasks(tasks) {
    if (tasks.length === 0) return
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
      tasks = tasks.filter(task => task !== taskID)
      if (tasks.length !== 0) {
        this.data.groups[groupID].tasks = tasks
      } else delete this.data.groups[groupID]
    }
    this.data.tasks.splice(taskIndex, 1)
    this.save()
  }

  getNextTaskIndex() {
    return this.data.tasks.length
  }

  save() {
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }
}

function parseDataFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch(error) {
    return DEFAULT_STORE_LAYOUT()
  }
}

module.exports = PositronStore