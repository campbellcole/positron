import React, { Component } from 'react'
import './Header.scss'

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <h3 className='header-text'>
          { this.props.children }
        </h3>
      </div>
    )
  }
}
