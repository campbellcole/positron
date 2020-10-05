/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Positron from './Positron'
import Header from './components/Header/Header'
import Banner from './components/Banner/Banner'
import Footer from './components/Footer/Footer'
import AlertModal from './components/AlertModal/AlertModal'
import { HashRouter } from 'react-router-dom'
import { ipc_get } from './util'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'shards-ui/dist/css/shards.min.css'
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
  }
  render() {
    return (
      <HashRouter type='noslash'>
        { this.state.showAlert && 
          <AlertModal
            toggle={this.toggleAlert}
            open={this.state.showAlert}
            title={this.state.alertTitle}
            description={this.state.alertDescription}
          />
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
        if (newTasks.length > -1) {
          this.refreshTasks(true)
          this.showAlert('Import Complete', `Grabbed ${newTasks.length} new assignments from Canvas. They will be automatically loaded within the next few seconds.`)
        }
      })
    }
  }
  setTasks(tasks) {
    this.setState({tasks: tasks})
  }
  componentDidMount() {
    this.refreshTasks()
  }
}

ReactDOM.render(<App />, document.getElementById('positron'))