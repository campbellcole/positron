import React, { Component } from 'react'
import CenterCard, { CenterCardButton } from '../../components/CenterCard/CenterCard'
import LabelledInput from '../../components/LabelledInput/LabelledInput'
import { ipc_get, call_global } from '../../util'

export default class CanvasLoginView extends Component {
  constructor() {
    super()
    this.updateImportLogin = this.updateImportLogin.bind(this)
    this.updateImportSettings = this.updateImportSettings.bind(this)
    this.state = { savedLogin: false, savedSettings: false }
  }
  render() {
    return (
      <CenterCard title='Canvas Login & Import Settings'>
        <LabelledInput id='token' title='Access Token' type='text' />
        <LabelledInput id='url' title='Canvas URL' type='text' />
        <LabelledInput render={() => (
          <CenterCardButton onClick={this.updateImportLogin}>{ this.state.savedLogin ? 'Saved' : 'Save Login'}</CenterCardButton>
        )}/>
        <hr />
        <LabelledInput id='decent_hours' title='Wake Up Time' type='time' />
        <LabelledInput render={() => (
          <CenterCardButton onClick={this.updateImportSettings}>{ this.state.savedSettings ? 'Saved' : 'Save Settings'}</CenterCardButton>
        )}/>
      </CenterCard>
    )
  }
  updateImportLogin() {
    ipc_get('setCanvasLogin', {base_url: document.getElementById('url').value, access_token: document.getElementById('token').value}).then(_ => {
      this.setState({ savedLogin: true })
      this.props.history.goBack()
      call_global('refresh')
    }).catch(err => {
      call_global('alert', 'Canvas Login Error', `There was an error saving Canvas login credentials: ${err}`)
    })
  }
  updateImportSettings() {
    ipc_get('setCanvasSettings', {decent_hours: document.getElementById('decent_hours').value}).then(_ => {
      this.setState({ savedSettings: true })
      this.props.history.goBack()
      call_global('refresh')
    }).catch(err => {
      call_global('alert', 'Canvas Login Error', `There was an error saving Canvas settings: ${err}`)
    })
  }
}
