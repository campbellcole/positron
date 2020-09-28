import React, { Component } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './CalendarView.scss'

const localizer = momentLocalizer(moment)

export default class CalendarView extends Component {
  render() {
    return (
      <div className='calendar-container scroll'>
        <Calendar 
          localizer={localizer}
          events={this.props.tasks}
          allDayAccessor={()=>false}
          startAccessor={(task)=>moment(task.dueDate).subtract(1, 'hours').toDate()}
          endAccessor={(task)=>moment(task.dueDate).toDate()}
        />
      </div>
    )
  }
}
