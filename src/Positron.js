import React, { Component } from 'react'
import { ButtonGroup } from 'shards-react'
import { Link, Route } from 'react-router-dom'
import CalendarView from './views/CalendarView/CalendarView'
import ListView from './views/ListView/ListView'
import AddTaskView from './views/AddTaskView/AddTaskView'
import CanvasImportView from './views/CanvasImportView/CanvasImportView'
import './Positron.scss'
import './scss/scrollbar.scss'
import LinkReference from './Links'
import { ipc_get } from './util'

export default class Positron extends Component {
  constructor() {
    super()
    this.state = { tasks: [] }
  }
  render() {
    return (
      <div className='app'>
          <div className='view_selector'>
            <ButtonGroup size='sm'>
              <Link to='/group' component={LinkReference('Group View')} />
              <Link to='/calendar' component={LinkReference('Calendar View')} />
              <Link to='/list' component={LinkReference('List View')} />
            </ButtonGroup>
          </div>
          <Route path='/list' render={()=>(<ListView tasks={this.state.tasks}/>)} />
          <Route path='/add' component={AddTaskView} />
          <Route path='/calendar' render={()=>(<CalendarView tasks={this.state.tasks}/>)} />
          <Route path='/import' render={()=>(<CanvasImportView onImported={(tasks) => this.setState({tasks: tasks})}/>)} />
      </div>
    )
  }
  componentDidMount() {
    ipc_get('tasks').then((tasks) => this.setState({tasks: tasks}))
  }
}
