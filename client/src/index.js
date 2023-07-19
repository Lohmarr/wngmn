import React from 'react';
import ReactDOM from 'react-dom';
import "simpledotcss/simple.min.css";
import "./componentStyles/App.css"
import './componentStyles/index.css';
import App from './App';


ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );