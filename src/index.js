import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Positron from './Positron'
import Header from './components/Header/Header'
import Banner from './components/Banner/Banner'
import Footer from './components/Footer/Footer'
import AlertModal from './components/AlertModal/AlertModal'
import { HashRouter, Redirect } from 'react-router-dom'
import { ipc_get, register_global_function } from './util'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

class App extends Component {
  constructor() {
    super()
    this.state = { 
      tasks: [],
      loading: false,
      showAlert: false,
      alertTitle: '',
      alertDescription: ''
    }
    this.setTasks = this.setTasks.bind(this)
    this.refreshTasks = this.refreshTasks.bind(this)
    this.showAlert = this.showAlert.bind(this)
    this.toggleAlert = this.toggleAlert.bind(this)
    this.redirect = this.redirect.bind(this)
    register_global_function('refresh', this.refreshTasks)
    register_global_function('redirect', this.redirect)
    register_global_function('alert', this.showAlert)
  }
  render() {
    return (
      <HashRouter type='noslash'>
        <AlertModal
          toggle={this.toggleAlert}
          open={this.state.showAlert}
          title={this.state.alertTitle}
          description={this.state.alertDescription}
        />
        { this.state.redirect && 
          <Redirect to={this.state.redirect} />
        }
        <Header loading={this.state.loading}/>
        <Banner>
          Homework Manager
        </Banner>
        <Positron tasks={this.state.tasks} setTasks={this.setTasks} refreshTasks={this.refreshTasks} />
        <Footer>
          With &#128420; by Campbell Cole
        </Footer>
      </HashRouter>
    )
  }
  toggleAlert() {
    this.setState({showAlert: !this.state.showAlert})
  }
  showAlert(title, description) {
    this.setState({alertTitle: title, alertDescription: description, showAlert: true})
  }
  refreshTasks(onlyLocal = false) {
    ipc_get('tasks:local').then(this.setTasks)
    if (!onlyLocal) {
      this.setState({loading: true})
      ipc_get('tasks:remote').then(newTasks => {
        this.setState({loading: false})
        if (newTasks.length > 0) {
          var msg = `Grabbed ${newTasks.length} new assignment(s) from Canvas.`
          if (newTasks.length <= 10) {
            for (const task of newTasks) {
              msg += `\n${task.title}`
            }
          } else {
            var assignmentsByGroup = {}
            for (const task of newTasks) {
              for (const group of task.groups) {
                if (assignmentsByGroup[group]) assignmentsByGroup[group]++
                else assignmentsByGroup[group] = 1
              }
            }
            for (const group in assignmentsByGroup) {
              msg += `\n[${group}] ${assignmentsByGroup[group]} assignment(s)`
            }
          }
          this.showAlert('Import Complete', msg)
          this.refreshTasks(true)
        }
      }).catch(err => {
        this.setState({loading: false})
        this.showAlert('Import Error', `There was an error importing assignments from Canvas: ${err}`)
      })
    }
  }
  setTasks(tasks) {
    this.setState({tasks: tasks})
  }
  redirect(to) {
    this.setState({redirect: to})
  }
  componentDidMount() {
    this.refreshTasks()
  }
}

ReactDOM.render(<App />, document.getElementById('positron'))