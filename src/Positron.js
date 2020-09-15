/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

export default class Positron extends Component {
  render() {
    return (
      <div>
        <Header>
          Homework Manager
        </Header>
        <Footer>
          With &#128420; by Campbell Cole
        </Footer> 
      </div>
    )
  }
}
