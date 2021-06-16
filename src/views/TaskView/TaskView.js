import React, { Component } from 'react'
import './TaskView.scss'
import '../../scss/scrollbar.scss'
import sassColors from '../../_shared.scss'
import CenterCard from '../../components/CenterCard/CenterCard'
import moment from 'moment'
import { ipc_get, call_global } from '../../util'

export default class TaskView extends Component {
  constructor(props) {
    super()
    if (props.location && props.location.state && props.location.state.task) {
      this.state = { task: props.location.state.task }
    } else this.state = { task: {
      id: 1,
      title: 'NULL TASK',
      dueDate: new Date(),
      description: 'Page refreshed while viewing task, here is a placeholder task for you to view the styles with :)',
      url: 'https://google.com',
      groups: ['test_group'],
      completed: false
    }}
    this.openTaskURL = this.openTaskURL.bind(this)
    this.removeTask = this.removeTask.bind(this) 
  }
  render() {
    let date = moment(this.state.task.dueDate)
    return (
      <div className='scroll'>
        <CenterCard title={this.state.task.title}>
          <div className='absolute-wrapper'>
            <div className='task-controls'>
              { this.state.task.url !== '' &&
                <span className='task-control' onClick={this.openTaskURL}>Open URL</span>
              }
              <span className='task-control' onClick={this.removeTask}>Remove Task</span>
            </div>
          </div>
          <center>
            <h6 className='task-due'>
              { `Due ${date.format('MMMM Do YYYY, h:mm A')}, ${date.fromNow()}` }
            </h6>
            <hr />
            <div className='frame-container'>
              <iframe
                id='description-frame'
                frameBorder='false'
                onLoad={({target: frame})=>{
                  // clean up canvas descriptions
                  var elems = frame.contentWindow.document.querySelectorAll('p')
                  for (const p of elems) {
                    if ((p.innerText.trim() == '' && p.innerHTML.trim() == '') || p.innerHTML === '&nbsp;') {
                      p.parentElement.removeChild(p)
                    }
                  }
                  // auto expand iframe so no scrollbar appears
                  frame.height = frame.contentWindow.document.body.scrollHeight + "px"
                }}
              />
            </div>
          </center>
        </CenterCard>
      </div>
    )
  }
  openTaskURL() {
    call_global('openURL', {url: this.state.task.url})
  }
  removeTask() {
    ipc_get('removeTask', this.state.task.id).then(_ => {
      call_global('alert', 'Task Deleted', `The task "${this.state.task.title}" has been removed.`)
      this.props.history.goBack()
      call_global('refresh', true)
    })
  }
  componentDidMount() {
    var frame = document.getElementById('description-frame')
    frame.contentWindow.document.open()
    const html = 
    `
      <html>
        <head>
          <base target="_blank">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              height: 100%;
            }
            * {
              color: ${sassColors.textColorLight}
            }
          </style>
        </head>
        <body>
          <center>
            <div id="description">
              ${this.state.task.description}
            </div>
          </center>
        </body>
      </html>
    `
    frame.contentWindow.document.write(html)
    frame.contentWindow.document.close()
  }
}
