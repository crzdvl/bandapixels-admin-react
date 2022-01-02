import { authConstants } from './auth.constants';
import { authService } from '../../services/auth.service';
import { history } from '../../helpers/history';

function logout() {
  authService.logout();
  return { type: authConstants.LOGOUT };
}

function login(username, password) {
  return (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    authService.login(username, password)
      .then(
        (user) => {
          dispatch({ type: authConstants.LOGIN_SUCCESS, user });
          history.go('/posts');
        },
        (error) => {
          dispatch({ type: authConstants.LOGIN_FAILURE, error });
        },
      );
  };
}

export const authActions = {
  login,
  logout,
};
