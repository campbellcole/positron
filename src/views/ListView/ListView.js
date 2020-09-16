import React, { Component } from 'react'
import { getTasks } from '../../Positron'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'shards-react'
import './ListView.css'

export default class ListView extends Component {
  constructor() {
    super();
    this.state = { tasks: [] }
  }
  render() {
    return (
      <div className='list-container'>
      <div className='list-view'>
        <ListGroup>
          { this.state.tasks.map((value, index) => {
            return (
              <ListGroupItem key={index} action>
                <ListGroupItemHeading>{value.title}</ListGroupItemHeading>
                <ListGroupItemText>{new Date(value.due).toString()}</ListGroupItemText>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
      </div>
    )
  }
  componentDidMount() {
    getTasks((tasks) => this.setState({tasks: tasks}))
  }
}
