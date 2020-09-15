import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import './index.scss'
import Positron from './Positron';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='_positron'>
        <Route path='/' exact component={Positron} />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('positron')
)