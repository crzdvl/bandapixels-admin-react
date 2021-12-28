import React from 'react';
import { Navigate } from 'react-router-dom';

const IsAuth = ({ children }) => (localStorage.getItem('token') ? children : <Navigate to="/" />);

const IsNotAuth = ({ children }) => (!localStorage.getItem('token') ? children : <Navigate to="/posts" />);

export { IsAuth, IsNotAuth };
