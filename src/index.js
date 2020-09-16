/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import ReactDOM from 'react-dom'
import 'shards-ui/dist/css/shards.min.css'
import './index.css'
import Positron from './Positron'
import Header from './components/Header/Header'
import Banner from './components/Banner/Banner'
import Footer from './components/Footer/Footer'

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Banner>
      Homework Manager
    </Banner>
    <Positron />
    <Footer>
      With &#128420; by Campbell Cole
    </Footer>
  </React.StrictMode>,
  document.getElementById('positron')
)