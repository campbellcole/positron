import React, { Component } from 'react'
import { MdRemove, MdClose, MdFullscreen, MdFullscreenExit, MdFileDownload, MdRefresh } from 'react-icons/md'
import { AiOutlineDrag } from 'react-icons/ai'
import { DiTerminal } from 'react-icons/di'
import { Link } from 'react-router-dom'
import './Header.scss'
const { ipcRenderer } = window.require('electron')

export default class Header extends Component {
  constructor() {
    super()
    this.state = { isMaximized: false }
    this.sendClose = this.sendClose.bind(this)
    this.sendMaximize = this.sendMaximize.bind(this)
    this.sendMinimize = this.sendMinimize.bind(this)
    this.sendOpenTools = this.sendOpenTools.bind(this)
  }
  render() {
    return (
      <div className='header'>
        <div className='header-grabber'>
          <span id='control_drag' className='control drag'><AiOutlineDrag /></span>
        </div>
        <div className='header-controls'>
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
          <span id='control_devtools' className='control' onClick={this.sendOpenTools}><DiTerminal /></span>
          <Link to='/import' className='control'>{this.props.loading ? <MdRefresh className='rotate'/> : <MdFileDownload />}</Link>
        </div>
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
  sendOpenTools() {
    ipcRenderer.send('command', 'openTools')
  }
}
