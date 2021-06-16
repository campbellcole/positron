import React, { Component } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from "react-bootstrap/Button"
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
    super(props)
    this.state = {
      selected: undefined,
      tasks: transformTasks(props.tasks),
      currentView: 'dayGridMonth'
    }
    this.calendarRef = React.createRef()
  }

  render() {
    return (
      <div className="calendar-container">
        <ButtonGroup className="calendar-view-selector">
          <Button variant="dark" active={this.state.currentView === "dayGridMonth"} onClick={() => this.changeCalendarView("dayGridMonth")}>Month</Button>
          <Button variant="dark" active={this.state.currentView === "listWeek"} onClick={() => this.changeCalendarView("listWeek")}>Week</Button>
          <Button variant="dark" active={this.state.currentView === "listDay"} onClick={() => this.changeCalendarView("listDay")}>Day</Button>
        </ButtonGroup>
        { this.state.selected !== undefined &&
          <Redirect to={{
            pathname: '/task',
            state: { task: this.state.selected }
          }}/>
        }
        <FullCalendar
          plugins={[ dayGridPlugin, listViewPlugin, momentPlugin ]}
          initialView={this.state.currentView}
          events={this.state.tasks}
          themeSystem="bootstrap"
          eventClick={(info) => {
            info.jsEvent.preventDefault()
            this.setState({selected: transformEvent(info.event)})
          }}
          height="100%"
          ref={this.calendarRef}
        />
      </div>
    )
  }

  changeCalendarView(newView) {
    this.calendarRef.current.getApi().changeView(newView)
    this.setState({currentView: newView})
  }
}
