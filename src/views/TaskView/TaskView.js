import React, { Component } from 'react'
import './TaskView.scss'
import sassColors from '../../_shared.scss'
import CenterCard from '../../components/CenterCard/CenterCard'
import moment from 'moment'

export default class TaskView extends Component {
  constructor(props) {
    super()
    if (props.location && props.location.state && props.location.state.task) {
      this.state = { task: props.location.state.task }
    } else this.state = { task: {
      id: 1,
      title: 'test title',
      dueDate: new Date(),
      description: 'TEST DESCRIPTION',
      url: 'https://google.com',
      groups: ['test_group'],
      completed: false
    }}
  }
  render() {
    let date = moment(this.state.task.dueDate)
    return (
      <div className='scroll'>
        <CenterCard title={this.state.task.title}>
          <center>
            <h6 className='task-due'>
              {
                `Due ${date.format('MMMM Do YYYY, h:mm A')}, ${date.fromNow()}`
              }
            </h6>
            <hr/>
            <iframe
              id='description-frame'
              frameBorder='false'
              onLoad={({target: frame})=>{
                // clean up canvas imports
                var elems = frame.contentWindow.document.querySelectorAll('p')
                for (const p of elems) {
                  if (p.innerText.trim() == '' || p.innerHTML.trim() == '' || p.innerHTML === '&nbsp;') {
                    p.parentElement.removeChild(p)
                  }
                }
                // auto expand iframe so no scrollbar appears
                frame.height = frame.contentWindow.document.body.scrollHeight+"px"
              }}
            />
          </center>
        </CenterCard>
      </div>
    )
  }
  componentDidMount() {
    var frame = document.getElementById('description-frame')
    frame.contentWindow.document.open()
    const html = `<html><head><base target="_blank"><style>*{color:${sassColors.textColorLight}}</style></head><body style="background-color: ${sassColors.foregroundColor};"><center>${this.state.task.description}</center></body></html>`
    frame.contentWindow.document.write(html)
    frame.contentWindow.document.close()
  }
}
