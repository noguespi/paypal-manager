import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
// import blow from './blow.js';
import http from 'http';
var paypal = require('paypal-rest-sdk');



http.get({ path : '/' }, function (res) {
    res.on('data', function (buf) {
        console.log("http", buf);
    });
});

ReactDOM.render(<App />, document.getElementById('app'));