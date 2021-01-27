function Task(
  title,
  dueDate,
  description,
  url,
  groups,
  completed,
  canvasID = -1,
  id = -1
) {
  return {
    id: id,
    canvasID: canvasID,
    title: title,
    dueDate: dueDate,
    description: description,
    url: url,
    groups: groups,
    completed: completed
  }
}
module.exports = Task