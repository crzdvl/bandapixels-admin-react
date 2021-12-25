const backendUrl = 'http://localhost:3000/api';

function logout() {
  localStorage.removeItem('token');
  // eslint-disable-next-line no-restricted-globals
  history.go('/');
}

function handleResponse(response) {
  return response.text().then((text) => {
    console.log(text);
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
    .then((user) => {
      if (user?.access_token) {
        localStorage.setItem('token', JSON.stringify(user.access_token));
      }

      return user;
    });
}

export const authService = {
  login,
  logout,
  handleResponse,
};
