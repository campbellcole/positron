import React, { Component } from 'react'
import './CenterCard.scss'

export default class CenterCard extends Component {
  render() {
    return (
      <div className='center-card'>
        { this.props.title && 
          <center>
            <h2 className='center-card-title'>{this.props.title}</h2>
          </center>
        }
        <div className='center-card-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
