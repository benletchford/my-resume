import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import qs from 'qs'

import 'bootstrap/dist/css/bootstrap.css'
import './css/react-split-pane.css'
import './css/app.css'

// substring here removes the `?` at the beginning of the string.
var query = qs.parse(window.location.search.substring(1))
var mode = query.mode === 'd' || query.mode === 'display' ? 'display' : 'edit'

ReactDOM.render(<App mode={mode}/>, document.getElementById('root'));
