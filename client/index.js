import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// add styles
import styles from './scss/app.scss'

console.log('in client/index.js');

render (
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
