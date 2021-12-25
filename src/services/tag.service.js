import { authService } from './auth.service';
import { authHeader } from '../helpers';

const backendUrl = 'http://localhost:3000/api';

function getAll(skip = 0, take = 10) {
  const authorizationHeader = authHeader();
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...authorizationHeader },
  };
  console.log(backendUrl);
  return fetch(`${backendUrl}/admin/tags?skip=${skip}&take=${take}`, requestOptions)
    .then(authService.handleResponse)
    .then((tags) => {
      console.log(tags);
      return tags;
    })
    .catch((err) => console.log(err));
}

function getOne(id) {
  const authorizationHeader = authHeader();
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...authorizationHeader },
  };

  return fetch(`${backendUrl}/admin/tags/${id}`, requestOptions)
    .then(authService.handleResponse)
    .then((tag) => tag);
}

function create(name) {
  const authorizationHeader = authHeader();
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authorizationHeader },
    body: JSON.stringify({ name }),
  };

  return fetch(`${backendUrl}/admin/tags`, requestOptions)
    .then(authService.handleResponse)
    .then((tag) => tag);
}

function update(id, name) {
  const authorizationHeader = authHeader();
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Patch': 'application/merge-patch+json',
      ...authorizationHeader,
    },
    body: JSON.stringify({ name }),
  };

  return fetch(`${backendUrl}/admin/tags/${id}`, requestOptions)
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

export const tagService = {
  getAll,
  getOne,
  create,
  update,
  remove,
};