import { localStorageService } from '../services/localStorage.service';

export function authHeader() {
  const token = localStorageService.getKey('token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}
