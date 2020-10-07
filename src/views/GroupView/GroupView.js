import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import GroupCard from '../../components/GroupCard/GroupCard'
import './GroupView.scss'

// this class doesn't use the new group layout from the store
// update this to use ipc_get('groups') and go from there

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
      cards.push(<GroupCard title={group} tasks={tasksByGroup[group]} handleTaskClick={this.handleTaskClick}/>)
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
