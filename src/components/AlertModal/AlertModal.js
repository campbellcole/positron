import React, { Component } from 'react'
import { Modal, ModalBody, ModalHeader } from 'shards-react'
import './AlertModal.scss'

export default class AlertModal extends Component {
  render() {
    return (
      <Modal toggle={this.props.toggle} open={this.props.open}>
        <ModalHeader>
          {this.props.title}
        </ModalHeader>
        <ModalBody>
          {this.props.description}
        </ModalBody>
        <div className='modal-buttons'>
          <button className='btn btn-dark' onClick={this.props.toggle}>OK</button>
        </div>
      </Modal>
    )
  }
}
