import React, { Component } from 'react'
import { ButtonGroup } from 'shards-react'
import { HashRouter, Link, Route } from 'react-router-dom'
import ListView from './views/ListView/ListView'
import './Positron.css'
const { ipcRenderer } = window.require('electron')

const GroupLink = React.forwardRef((props, ref) => (
  <a href={props.href} className='btn btn-dark'>Group List</a>
))
const CalendarLink = React.forwardRef((props, ref) => (
  <a href={props.href} className='btn btn-dark'>Calendar View</a>
))
const ListLink = React.forwardRef((props, ref) => (
  <a href={props.href} className='btn btn-dark'>List View</a>
))

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
        </HashRouter>
      </div>
    )
  }
}

function getTasks(callback) {
  ipcRenderer.send('command', 'getTasks')
  ipcRenderer.on('tasks', (event, tasks) => {
    callback(tasks)
  })
}

export {
  getTasks
}
