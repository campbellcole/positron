import React, { Component } from 'react'
import { Modal, ModalBody, ModalHeader } from 'shards-react'

export default class AlertModal extends Component {
  render() {
    return (
      <Modal toggle={this.props.toggle} open={this.props.open}>
        <ModalHeader>
          {this.props.title}
        </ModalHeader>
        <ModalBody>
          {this.props.description}
          <hr />
          <button className='btn btn-dark' onClick={this.props.toggle}>OK</button>
        </ModalBody>
      </Modal>
    )
  }
}
