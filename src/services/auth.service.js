import { localStorageService } from './localStorage.service';
import { history } from '../helpers/history';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function logout() {
  localStorageService.removeKey('token');

  history.go('/');
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();

        history.go('/');
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${backendUrl}/users/login`, requestOptions)
    .then(handleResponse)
    .then(async (data) => {
      if (data?.access_token) {
        await localStorageService.setKey('token', data.access_token);

        history.go('/posts');
      }

      return data;
    });
}

export const authService = {
  login,
  logout,
  handleResponse,
};
