import { authConstants } from './auth.constants';
import { localStorageService } from '../../services/localStorage.service';

const user = localStorageService.getKey('token');
const initialState = user ? { loggedIn: true, user } : {};

export function auth(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case authConstants.LOGIN_FAILURE:
      return {
        loggedIn: true,
        error: action.error,
      };
    case authConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
