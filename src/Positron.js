import React, { Component } from 'react'
import { ButtonGroup } from 'shards-react'
import { HashRouter, Link, Route } from 'react-router-dom'
import ListView from './views/ListView/ListView'
import AddTaskView from './views/AddTaskView/AddTaskView'
import './Positron.scss'
import { GroupLink, CalendarLink, ListLink } from './Links'
const { ipcRenderer } = window.require('electron')

var callbacks = [];
export default class Positron extends Component {
  constructor() {
    super()
    ipcRenderer.on('tasks', (event, tasks) => {
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i](tasks)
      }
    })
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
          <Route path='/list' component={ListView} />
          <Route path='/add' component={AddTaskView} />
        </HashRouter>
      </div>
    )
  }
}

function bindTasks(callback) {
  callbacks.push(callback)
  ipcRenderer.send('command', 'getTasks')
}

export {
  bindTasks
}
