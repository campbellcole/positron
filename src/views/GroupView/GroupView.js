import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './GroupView.scss'

export default class GroupView extends Component {
  constructor() {
    super()
    this.state = { clickedTask: undefined }
    this.handleTaskClick = this.handleTaskClick.bind(this)
  }
  render() {
    let tasksByGroup = {}
    for (const task of this.props.tasks) {
      for (const group of task.groups) {
        if (tasksByGroup[group]) tasksByGroup[group].push(task)
        else tasksByGroup[group] = [task]
      }
    }
    var cards = []
    for (const group in tasksByGroup) {
      cards.push(
        <div className='group-card'>
          <div className='group-header'>{group}</div>
          <ul className='group-tasks'>
            { tasksByGroup[group].map(task => (
              <li className='group-task' onClick={this.handleTaskClick(task)}>{task.title}</li>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className='groups scroll'>
        { this.state.clickedTask && 
          <Redirect to={{
            pathname: '/task',
            state: { task: this.state.clickedTask }
          }}/>
        }
        { cards }
      </div>
    )
  }
  handleTaskClick(task) {
    return () => this.setState({clickedTask: task})
  }
}
