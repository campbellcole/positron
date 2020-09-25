const fetch = require('node-fetch');
const Task = require('./Task');
require('dotenv').config();

const TOKEN = process.env.ACCESS_TOKEN;
TOKEN !== undefined && console.log(TOKEN);

var taskCache = []

async function getCanvasTasks(base_url, access_token = TOKEN, ignoreCache = false) {
  if (!ignoreCache && taskCache.length > 0) return taskCache
  console.log('getting canvas tasks')
  const canvURL = (endpoint) => `https://${base_url}/api/v1/${endpoint}?per_page=999`
  const canv = (endpoint) => fetch(canvURL(endpoint), {headers: {'Authorization':'Bearer '+access_token}}).then(res => res.json())
  const courses = await canv('courses')
  var possibleTasks = []
  for (const course of courses) {
    const assignments = await canv(`courses/${course.id}/assignments`)
    for (const assignment of assignments) {
      possibleTasks.push(convertToTask(assignment))
    }
  }
  console.log('complete')
  taskCache = possibleTasks
  return possibleTasks
}

function convertToTask(canvasObject) {
  return Task(
    -1,
    canvasObject.name || 'NO NAME',
    (canvasObject.due_at && Date.parse(canvasObject.due_at)) || 0,
    canvasObject.description || 'NO DESCRIPTION', 
    canvasObject.url || canvasObject.html_url || undefined, 
    [], 
    false
  )
}

module.exports = { getCanvasTasks }