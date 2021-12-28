import { authService } from './auth.service';
import { authHeader } from '../helpers';

const backendUrl = 'http://localhost:3000/api';

function upload(type, file) {
  const formData = new FormData();

  formData.append('file', file.originFileObj);

  const authorizationHeader = authHeader();
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authorizationHeader,
    },
    body: formData,
  };

  return fetch(`${backendUrl}/admin/files?type=${type}`, requestOptions)
    .then(authService.handleResponse)
    .then((result) => result);
}

export const fileService = {
  upload,
};
