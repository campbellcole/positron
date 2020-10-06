import React, { Component } from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'shards-react'
import { Link } from 'react-router-dom'
import './ListView.scss'
import '../../scss/scrollbar.scss'
import moment from 'moment'

export default class ListView extends Component {
  render() {
    return (
      <div className='scroll'>
        <ListGroup>
          <ListGroupItem key={-1} action className='item-add-btn'>
            <Link to='/add' className='add-btn-list'>Add Task</Link>
          </ListGroupItem>
          { this.props.tasks.map((value, index) => {
            return (
              <ListGroupItem key={index} action>
                <ListGroupItemHeading>{value.title}</ListGroupItemHeading>
                <ListGroupItemText>{moment(value.dueDate).format('MMMM Do YYYY, h:mm:ss A')}</ListGroupItemText>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    )
  }
}
