import { localStorageService } from './localStorage.service';

const backendUrl = 'http://localhost:3000/api';

function logout() {
  localStorageService.removeKey('token');
  // eslint-disable-next-line no-restricted-globals
  history.go('/');
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        // eslint-disable-next-line no-restricted-globals
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
    .then(async (user) => {
      if (user?.access_token) {
        await localStorageService.setKey('token', user.access_token);

        // eslint-disable-next-line no-restricted-globals
        history.go('/posts');
      }

      return user;
    });
}

export const authService = {
  login,
  logout,
  handleResponse,
};
