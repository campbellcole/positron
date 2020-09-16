import React, { Component } from 'react'
import { MdRemove, MdClose, MdFullscreen, MdFullscreenExit } from 'react-icons/md'
import './Header.css'
const { ipcRenderer } = window.require('electron')

export default class Header extends Component {
  constructor() {
    super()
    this.state = { isMaximized: false }
    this.sendClose = this.sendClose.bind(this)
    this.sendMaximize = this.sendMaximize.bind(this)
    this.sendMinimize = this.sendMinimize.bind(this)
  }
  render() {
    return (
      <div className='header'>
        <span id='control_close' className='control' onClick={this.sendClose}><MdClose /></span>
        <span id='control_maximize' className='control' onClick={this.sendMaximize}>
          { this.state.isMaximized && 
            <MdFullscreenExit />
          }
          { !this.state.isMaximized &&
            <MdFullscreen />
          }
        </span>
        <span id='control_minimize' className='control' onClick={this.sendMinimize}><MdRemove /></span>
      </div>
    )
  }
  sendClose() {
    ipcRenderer.send('command', 'close')
  }
  sendMaximize() {
    this.setState({isMaximized: !this.state.isMaximized})
    ipcRenderer.send('command', 'maximize')
  }
  sendMinimize() {
    ipcRenderer.send('command', 'minimize')
  }
}
