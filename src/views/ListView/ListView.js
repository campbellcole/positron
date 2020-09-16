import React, { Component } from 'react'
import { bindTasks } from '../../Positron'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'shards-react'
import { Link } from 'react-router-dom'
import './ListView.scss'
import { AddLink } from '../../Links'

export default class ListView extends Component {
  constructor() {
    super();
    this.state = { tasks: [] }
  }
  render() {
    return (
      <div className='list-view'>
        <ListGroup>
          <ListGroupItem key={-1} action className='item-add-btn'>
            <Link to='/add' component={AddLink} />
          </ListGroupItem>
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
    )
  }
  componentDidMount() {
    bindTasks((tasks) => this.setState({tasks: tasks}))
  }
}
