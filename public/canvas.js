const fetch = require('node-fetch');
require('dotenv').config();

const TOKEN = process.env.ACCESS_TOKEN;
console.log(TOKEN);

async function getCanvasTasks(base_url, access_token = TOKEN) {
  const canvURL = (endpoint) => `https://${base_url}/api/v1/${endpoint}?access_token=${access_token}`
  const canv = (endpoint) => fetch(canvURL(endpoint)).then(res => res.json())
  const courses = await canv('courses')
  var possibleTasks = { // if you find new places/methods for finding assignments, here is where to start
    assignments: {},
    modules: {}
  }
  for (const course of courses) {
    const assignments = await canv(`courses/${course.id}/assignments`)
    const modules = await canv(`courses/${course.id}/modules`)
    for (const module of modules) {
      const items = await canv(`courses/${course.id}/modules/${module.id}/items`)
      module.items = items
    }
    possibleTasks.assignments[course.id] = assignments
    possibleTasks.modules[course.id] = modules
  }
  return possibleTasks
}

module.exports = { getCanvasTasks }