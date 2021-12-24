import React from 'react';
import { Redirect } from 'react-router-dom';

const isAuth = (Component) => function Comp(props) {
  return localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/" />;
};

const isNotAuth = (Component) => function Comp(props) {
  return !localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/posts" />;
};

export { isAuth, isNotAuth };
