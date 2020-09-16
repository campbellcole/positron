import React, { Component } from 'react'
import {Form, FormGroup, FormInput } from 'shards-react'
import './AddTaskView.scss'

export default class AddTaskView extends Component {
  render() {
    return (
      <div className='add-task'>
        <Form>
          <FormGroup>
            <label htmlFor='#title'>Title</label>
            <FormInput id='#title' placeholder='Title' />
          </FormGroup>
          <FormGroup>

          </FormGroup>
        </Form>
      </div>
    )
  }
}
