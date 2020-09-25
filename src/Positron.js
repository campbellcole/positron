import React, { Component } from 'react'
import { ButtonGroup } from 'shards-react'
import { HashRouter, Link, Route } from 'react-router-dom'
import CalendarView from './views/CalendarView/CalendarView'
import ListView from './views/ListView/ListView'
import AddTaskView from './views/AddTaskView/AddTaskView'
import './Positron.scss'
import { GroupLink, CalendarLink, ListLink } from './Links'
import { ipc_get } from './util'

export default class Positron extends Component {
  constructor() {
    super()
    this.state = { tasks: [] }
  }
  render() {
    return (
      <div className='app'>
        <HashRouter hashType='noslash'>
          <div className='view_selector'>
            <ButtonGroup size='sm'>
              <Link to='/group' component={GroupLink} />
              <Link to='/calendar' component={CalendarLink} />
              <Link to='/list' component={ListLink} />
            </ButtonGroup>
          </div>
          <Route path='/list' render={()=>(<ListView tasks={this.state.tasks}/>)} />
          <Route path='/add' component={AddTaskView} />
          <Route path='/calendar' render={()=>(<CalendarView tasks={this.state.tasks}/>)} />
        </HashRouter>
      </div>
    )
  }
  componentDidMount() {
    ipc_get('canv').then((tasks) => {
      console.log('tasks', tasks)
      this.setState({tasks: tasks})
    })
  }
}
