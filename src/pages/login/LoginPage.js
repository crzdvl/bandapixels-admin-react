import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from '../../components/Layout/Layout';
import { authActions } from '../../store/auth/auth.actions';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { getAuthError } from '../../store/auth/auth.selectors';

import zdarova from '../../assets/images/zdarova.svg';
import styles from './LoginPage.module.css';
import { AlertError } from '../../components/AlertError/AlertError';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const authError = useSelector(getAuthError);

  const onFinish = ({ username, password }) => {
    dispatch(authActions.login(username, password));
  };

  return (
    <Layout>
      <div className={styles.wrapper}>
        {authError && <AlertError error={authError[0]} />}
        <LoginForm onFinish={onFinish} />
        <img className={styles.zdarova} src={zdarova} alt="xpamik" />
      </div>
    </Layout>
  );
};
