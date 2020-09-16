import React from 'react'
import './Links.scss'

const GroupLink = React.forwardRef((props, ref) => (
  <a href={props.href} className='btn btn-dark'>Group List</a>
))
const CalendarLink = React.forwardRef((props, ref) => (
  <a href={props.href} className='btn btn-dark'>Calendar View</a>
))
const ListLink = React.forwardRef((props, ref) => (
  <a href={props.href} className='btn btn-dark'>List View</a>
))
const AddLink = React.forwardRef((props, ref) => (
  <a href={props.href} className='add-btn-list'>Add Task</a>
))

export {
  GroupLink, CalendarLink, ListLink, AddLink
}