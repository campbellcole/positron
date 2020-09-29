const fetch = require('node-fetch');
const Task = require('./Task');
require('dotenv').config();

const TOKEN = process.env.ACCESS_TOKEN;
TOKEN !== undefined && console.log(TOKEN);

var taskCache = []

async function getCanvasTasks(base_url, access_token = TOKEN, ignoreCache = false) {
  if (!ignoreCache && taskCache.length > 0) return taskCache
  if (access_token === undefined) return []
  console.log('getting canvas tasks')
  const canvURL = (endpoint) => `https://${base_url}/api/v1/${endpoint}?per_page=999`
  const canv = (endpoint) => fetch(canvURL(endpoint), {headers: {'Authorization':'Bearer '+access_token}}).then(res => res.json())
  const courses = await canv('courses')
  var possibleTasks = []
  for (const course of courses) {
    const assignments = await canv(`courses/${course.id}/assignments`)
    for (const assignment of assignments) {
      possibleTasks.push(Task(
        -1,
        assignment.name || `${course.course_code} assignment`,
        (assignment.due_at && Date.parse(assignment.due_at)) || 0,
        assignment.description || `imported from class: ${course.name}`,
        assignment.url || assignment.html_url || undefined,
        [`${course.course_code}`],
        false
      ))
    }
  }
  console.log('complete')
  taskCache = possibleTasks
  return possibleTasks
}

module.exports = { getCanvasTasks }