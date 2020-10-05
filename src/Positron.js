import React, { Component } from 'react'
import { ButtonGroup } from 'shards-react'
import { NavLink, Route } from 'react-router-dom'
import GroupView from './views/GroupView/GroupView'
import CalendarView from './views/CalendarView/CalendarView'
import ListView from './views/ListView/ListView'
import AddTaskView from './views/AddTaskView/AddTaskView'
import CanvasLoginView from './views/CanvasLoginView/CanvasLoginView'
import TaskView from './views/TaskView/TaskView'
import './Positron.scss'
import './scss/scrollbar.scss'
import LinkReference from './Links'
import { ipc_get } from './util'

export default class Positron extends Component {
  render() {
    return (
      <div className='app'>
          <div className='view_selector'>
            <ButtonGroup size='sm'>
              <NavLink to='/group' activeClassName='active' className='btn btn-dark'>Group View</NavLink>
              <NavLink to='/calendar' activeClassName='active' className='btn btn-dark'>Calendar View</NavLink>
              <NavLink to='/list' activeClassName='active' className='btn btn-dark'>List View</NavLink>
            </ButtonGroup>
          </div>
          <Route path='/group' render={()=>(<GroupView tasks={this.props.tasks}/>)} />
          <Route path='/calendar' render={()=>(<CalendarView tasks={this.props.tasks}/>)} />
          <Route path='/list' render={()=>(<ListView tasks={this.props.tasks}/>)} />
          <Route path='/add' component={AddTaskView} />
          <Route path='/import' render={()=>(<CanvasLoginView onSaved={this.props.refreshTasks}/>)} />
          <Route path='/task' component={TaskView} />
      </div>
    )
  }
}
