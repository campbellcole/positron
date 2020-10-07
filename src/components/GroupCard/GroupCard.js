import React, { Component } from 'react'
import { MdChevronRight } from 'react-icons/md'
import './GroupCard.scss'

export default class GroupCard extends Component {
  constructor() {
    super()
    this.state = { clickedTask: undefined }
  }
  render() {
    return (
      <div className='group-card'>
        <div className='group-header'>{this.props.title}</div>
        <ul className='group-tasks'>
          { this.props.tasks.map(task => (
              <li className='group-task' onClick={this.props.handleTaskClick(task)} key={task.id}><MdChevronRight />{task.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}
