const fetch = require('node-fetch');
const Task = require('./Task');
require('dotenv').config();

const TOKEN = process.env.ACCESS_TOKEN;
TOKEN !== undefined && console.log(TOKEN);

async function getCanvasTasks(base_url, access_token = TOKEN) {
  console.log('getting canvas tasks')
  const canvURL = (endpoint, perPageDelimit = false) => `https://${base_url}/api/v1/${endpoint}?per_page=999`
  const canv = (endpoint) => fetch(canvURL(endpoint), {headers: {'Authorization':'Bearer '+access_token}}).then(res => res.json())
  const courses = await canv('courses')
  var possibleTasks = []
  for (const course of courses) {
    const assignments = await canv(`courses/${course.id}/assignments`, true)
    for (const assignment of assignments) {
      possibleTasks.push(convertToTask(assignment))
    }
  }
  console.log('complete')
  return possibleTasks
}

function convertToTask(canvasObject) {
  return Task(
    -1,
    canvasObject.name || 'NO NAME',
    (canvasObject.due_at && Date.parse(canvasObject.due_at)) || new Date(),
    canvasObject.description || 'NO DESCRIPTION', 
    canvasObject.url || canvasObject.html_url || undefined, 
    [], 
    false
  )
}

module.exports = { getCanvasTasks }