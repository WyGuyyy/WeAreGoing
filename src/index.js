import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Encapsulate application within the 'root' div of the index file
//Application rendering is linked to the root div and all rendered DOM 
//elements created in React components will reside within the 'root' div
ReactDOM.render(<App />, document.getElementById('root'));  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
