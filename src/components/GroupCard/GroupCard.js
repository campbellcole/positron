import React, { Component } from 'react'
import { MdChevronRight } from 'react-icons/md'
import './GroupCard.scss'

export default class GroupCard extends Component {
  constructor() {
    super()
    this.state = { clickedTask: undefined, collapsed: false }
    this.handleCollapse = this.handleCollapse.bind(this)
  }
  render() {
    const col = this.state.collapsed ? 'collapsed' : ''
    return (
      <div className={`group-card ${col}`}>
        <div className={`group-header ${col}`} onClick={this.handleCollapse}>{this.props.title}</div>
        <ul className={`group-tasks ${col}`}>
          { this.props.tasks.map(task => (
              <li className={`group-task ${col}`} onClick={this.props.handleTaskClick(task)} key={task.id}><MdChevronRight />{task.title}</li>
          ))}
        </ul>
      </div>
    )
  }
  handleCollapse() {
    this.setState({collapsed: !this.state.collapsed})
  }
}
