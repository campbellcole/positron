import React, { Component } from 'react'
import './Banner.scss'

export default class Banner extends Component {
  render() {
    return (
      <div className='banner'>
        <h3 className='banner-text'>
          { this.props.children }
        </h3>
      </div>
    )
  }
}
