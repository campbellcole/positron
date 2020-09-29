import React, { Component } from 'react'
import CenterCard, { CenterCardButton } from '../../components/CenterCard/CenterCard'
import LabelledInput from '../../components/LabelledInput/LabelledInput'
import { ipc_get } from '../../util'

export default class CanvasImportView extends Component {
  constructor() {
    super()
    this.handleImport = this.handleImport.bind(this)
    this.state = { cardTitle: 'Canvas Importer' }
  }
  render() {
    return (
      <CenterCard title={this.state.cardTitle}>
        <LabelledInput id='token' title='Access Token' type='text' />
        <LabelledInput id='url' title='Canvas URL' type='text' />
        <LabelledInput render={() => (
          <CenterCardButton onClick={this.handleImport}>Import</CenterCardButton>
        )}/>
      </CenterCard>
    )
  }
  handleImport() {
    this.setState({cardTitle:'Loading...'})
    ipc_get('canvas', {url:document.getElementById('url').value,token:document.getElementById('token').value}).then(tasks => {
      this.props.onImported(tasks)
      this.setState({cardTitle: 'IMPORT COMPLETE'})
    })
  }
}
