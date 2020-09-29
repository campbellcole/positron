import React, { Component } from 'react'
import CenterCard from '../../components/CenterCard/CenterCard'
import LabelledInput from '../../components/LabelledInput/LabelledInput'

export default class CanvasImportView extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {
    return (
      <CenterCard title='Canvas Importer'>
        <LabelledInput id='token' title='Access Token' type='text' />
        <LabelledInput id='url' title='Canvas URL' type='text' />
        <LabelledInput render={() => (
          <button className='submit-btn' onClick={this.handleSubmit}>Import</button>
        )}/>
      </CenterCard>
    )
  }
  handleSubmit() {
    console.log('todo')
  }
}
