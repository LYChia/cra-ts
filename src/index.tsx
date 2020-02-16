import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom';
import ContextStroe from 'store/ContextStore';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory({ basename: '/' });

ReactDOM.render(
    <Router history={history}>
        <ContextStroe history={history}>
            <App />
        </ContextStroe>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
