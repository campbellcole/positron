import React, { Component } from 'react'
import './LabelledInput.scss'

export default class LabelledInput extends Component {
  render() {
    return (
      <div className='labelled-pair'>
        { (this.props.id && this.props.title) &&
          <label htmlFor={this.props.id}>
            <span className='labelled-pair-text'>{this.props.title}</span>
          </label>
        }
        { (this.props.render && this.props.render(this.props)) ||
          <input type={this.props.type} id={this.props.id} name={this.props.id} placeholder={this.props.title} />
        }
      </div>
    )
  }
}
