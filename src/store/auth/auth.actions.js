import { authConstants } from './auth.constants';
import { authService } from '../../services/auth.service';
import { history } from '../../helpers/history';

function logout() {
  authService.logout();
  return { type: authConstants.LOGOUT };
}

function login(username, password) {
  function request(user) { return { type: authConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: authConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: authConstants.LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request({ username }));

    authService.login(username, password)
      .then(
        (user) => {
          dispatch(success(user));
          history.go('/posts');
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

export const authActions = {
  login,
  logout,
};
