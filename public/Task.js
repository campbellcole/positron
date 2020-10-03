function Task(
  title,
  dueDate,
  description,
  url,
  groups,
  completed,
  id = -1
) {
  return {
    id: id,
    title: title,
    dueDate: dueDate,
    description: description,
    url: url,
    groups: groups,
    completed: completed
  }
}
module.exports = Task