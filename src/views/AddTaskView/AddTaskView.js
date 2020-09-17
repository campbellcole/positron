import React, { Component } from 'react'
import './AddTaskView.scss'

export default class AddTaskView extends Component {
  render() {
    return (
      <div className='add-task'>
        <center>
          <h2>Add Task</h2>
        </center>
        <form className='task-form'>
          <div className='label-pair'>
                <label htmlFor='title'>
                  <span className='label-text'>Task Title</span>
                </label>
                <input id='title' name='title' type='text' placeholder='Title' />
          </div>
          <div className='label-pair'>
                <label htmlFor='type'>
                  <span className='label-text'>Task Group</span>
                </label>
                <select id='type' name='type'>
                  <option value='example1'>Example Group 1</option>
                  <option value='example2'>Example Group 2</option>
                  <option value='example3'>Example Group 3</option>
                  <option value='example4'>Example Group 4</option>
                </select>
          </div>
          <div className='label-pair'>
            <label htmlFor='due-date'>
              Due Date
            </label>
            <input type='datetime-local' name='due-date' id='due-date' />
          </div>
        </form>
      </div>
    )
  }
}
