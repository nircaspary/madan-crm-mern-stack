import React from 'react';
import reactDOM from 'react-dom';
import App from './components/App';
import './components/app.css';
import { BrowserRouter as Router } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

reactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector('#root')
);
