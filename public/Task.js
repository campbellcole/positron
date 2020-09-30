function Task(
  id,
  title,
  dueDate,
  description,
  url,
  groups,
  completed
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