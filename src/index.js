import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './utils/Settings';
import App from './App';
import './index.css';

Settings.init();

ReactDOM.render(<App />, document.getElementById('root'));
