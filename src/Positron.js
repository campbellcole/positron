import React, { Component } from 'react'
import { ButtonGroup } from 'shards-react'
import { HashRouter, Link, Route } from 'react-router-dom'
import ListView from './views/ListView/ListView'
import AddTaskView from './views/AddTaskView/AddTaskView'
import './Positron.scss'
import { GroupLink, CalendarLink, ListLink } from './Links'

export default class Positron extends Component {
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
          <Route path='/list' component={ListView} />
          <Route path='/add' component={AddTaskView} />
        </HashRouter>
      </div>
    )
  }
}
