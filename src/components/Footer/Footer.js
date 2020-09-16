import React, { Component } from 'react'
import './Footer.scss'

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <span className='footer-text'>
          { this.props.children }
        </span>
      </div>
    )
  }
}
