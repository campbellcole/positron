import React, { Component } from 'react'
import { ipc_get, formatDateTime } from '../../util'
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
            console.log(value.due)
            return (
              <ListGroupItem key={index} action>
                <ListGroupItemHeading>{value.title}</ListGroupItemHeading>
                <ListGroupItemText>{formatDateTime(new Date(value.dueDate))}</ListGroupItemText>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    )
  }
  componentDidMount() {
    ipc_get('canv').then((tasks) => this.setState({ tasks: tasks }))
  }
}
