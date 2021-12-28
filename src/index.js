import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.min.css';
import './index.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { App } from './App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
