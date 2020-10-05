import React, { Component } from 'react'
import CenterCard, { CenterCardButton } from '../../components/CenterCard/CenterCard'
import LabelledInput from '../../components/LabelledInput/LabelledInput'
import { ipc_get } from '../../util'

export default class CanvasLoginView extends Component {
  constructor() {
    super()
    this.handleImport = this.handleImport.bind(this)
    this.state = { saved: false }
  }
  render() {
    return (
      <CenterCard title='Canvas Login'>
        <LabelledInput id='token' title='Access Token' type='text' />
        <LabelledInput id='url' title='Canvas URL' type='text' />
        <LabelledInput render={() => (
          <CenterCardButton onClick={this.handleImport}>{ this.state.saved ? 'Saved' : 'Save Login'}</CenterCardButton>
        )}/>
      </CenterCard>
    )
  }
  handleImport() {
    ipc_get('setCanvasLogin', {base_url: document.getElementById('url').value, access_token: document.getElementById('token').value})
    this.setState({ saved: true })
    this.props.onSaved()
  }
}
