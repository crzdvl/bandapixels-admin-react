import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.min.css';
import './index.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { history } from './helpers';
import { store } from './store/store';
import { App } from './App';

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
