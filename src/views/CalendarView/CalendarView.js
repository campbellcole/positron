import React, { Component } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './CalendarView.scss'
import { Redirect } from 'react-router-dom'

/*
==============================

CHANGE react-big-calendar TO @fullcalendar/core -- IT LOOKS SO MUCH BETTER

==============================
*/

const localizer = momentLocalizer(moment)

export default class CalendarView extends Component {
  constructor() {
    super()
    this.state = {selected: undefined}
  }
  render() {
    return (
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
    )
  }
}
