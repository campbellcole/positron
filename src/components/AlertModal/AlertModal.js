import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './AlertModal.scss'

export default class AlertModal extends Component {
  render() {
    return (
      <Modal show={this.props.open} onHide={this.props.toggle}>
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>
            {this.props.description}
          </pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.props.toggle}>OK</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
