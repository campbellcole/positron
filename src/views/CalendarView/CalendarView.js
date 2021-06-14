import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listViewPlugin from '@fullcalendar/list'
import momentPlugin from '@fullcalendar/moment'
import moment from 'moment'
import './CalendarView.scss'
import { Redirect } from 'react-router-dom'

function transformTasks(tasks) {
  var transformed = []
  for (var task of tasks) {
    if (task.dueDate === 0) continue;
    task.start = moment(task.dueDate).subtract(1, 'hours').toISOString()
    task.end = moment(task.dueDate).toISOString()
    transformed.push(task)
  }
  return transformed
}

function transformEvent(event) {
  var task = {...event.extendedProps}
  task.id = event.id
  task.title = event.title
  task.url = event.url
  return task
}

export default class CalendarView extends Component {
  constructor(props) {
    super()
    this.state = {selected: undefined, tasks: transformTasks(props.tasks)}
  }
  render() {
    return (
      <div className="calendar-container">
        { this.state.selected !== undefined &&
          <Redirect to={{
            pathname: '/task',
            state: { task: this.state.selected }
          }}/>
        }
        <FullCalendar
          plugins={[ dayGridPlugin, listViewPlugin, momentPlugin ]}
          initialView="dayGridMonth"
          events={this.state.tasks}
          themeSystem="bootstrap"
          eventClick={(info) => {
            info.jsEvent.preventDefault()
            this.setState({selected: transformEvent(info.event)})
          }}
          height="100%"
        ></FullCalendar>
      </div>
    )
      /*
      <div className='calendar-container scroll'>
        { this.state.selected !== undefined &&
          <Redirect to={{
            pathname: '/task',
            state: { task: this.state.selected }
          }}/>
        }
        <Calendar
          localizer={localizer}
          events={this.props.tasks}
          allDayAccessor={()=>true}
          startAccessor={(task)=>moment(task.dueDate).subtract(1, 'hours').toDate()}
          endAccessor={(task)=>moment(task.dueDate).toDate()}
          onSelectEvent={selected=>this.setState({selected:selected})}
        />
      </div>
    )*/
  }
}
