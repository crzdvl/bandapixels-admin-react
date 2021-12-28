import { authService } from './auth.service';
import { authHeader } from '../helpers';

import { history } from '../helpers/history';

const backendUrl = 'http://localhost:3000/api';

function getAll(skip = 0, take = 10) {
  const authorizationHeader = authHeader();
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...authorizationHeader },
  };
  return fetch(`${backendUrl}/admin/posts?skip=${skip}&take=${take}`, requestOptions)
    .then(authService.handleResponse)
    .then((tags) => tags)
    .catch((err) => console.log(err));
}

function getOne(id) {
  const authorizationHeader = authHeader();
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...authorizationHeader },
  };

  return fetch(`${backendUrl}/admin/posts/${id}`, requestOptions)
    .then(authService.handleResponse)
    .then((post) => post);
}

function create(data) {
  const authorizationHeader = authHeader();
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authorizationHeader },
    body: JSON.stringify(data),
  };

  return fetch(`${backendUrl}/admin/posts`, requestOptions)
    .then(authService.handleResponse)
    .then(() => {
      history.go('/posts');
    });
}

function publish(id, publishValue) {
  const authorizationHeader = authHeader();
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authorizationHeader },
  };

  return fetch(`${backendUrl}/admin/posts/${id}/publish?publish=${publishValue}`, requestOptions)
    .then(authService.handleResponse)
    .then((data) => data);
}

function update(id, data) {
  const authorizationHeader = authHeader();
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Patch': 'application/merge-patch+json',
      ...authorizationHeader,
    },
    body: JSON.stringify(data),
  };

  return fetch(`${backendUrl}/admin/posts/${id}`, requestOptions)
    .then(authService.handleResponse)
    .then((tag) => tag);
}

function remove(id) {
  const authorizationHeader = authHeader();
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authorizationHeader },
  };

  return fetch(`${backendUrl}/admin/tags/${id}`, requestOptions)
    .then(authService.handleResponse);
}

export const postService = {
  getAll,
  getOne,
  create,
  update,
  remove,
  publish,
};
