function Task(
  id,
  title,
  dueDate,
  description,
  link,
  groups,
  completed
) {
  return {
    id: id,
    title: title,
    dueDate: dueDate,
    description: description,
    link: link,
    groups: groups,
    completed: completed
  }
}
module.exports = Task