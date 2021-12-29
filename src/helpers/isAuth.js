import React from 'react';
import { Navigate } from 'react-router-dom';
import { localStorageService } from '../services/localStorage.service';

const IsAuth = ({ children }) => (localStorageService.getKey('token') ? children : <Navigate to="/" />);

const IsNotAuth = ({ children }) => (!localStorageService.getKey('token') ? children : <Navigate to="/posts" />);

export { IsAuth, IsNotAuth };
