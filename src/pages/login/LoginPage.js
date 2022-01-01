import React from 'react';
import { useDispatch } from 'react-redux';

import { Layout } from '../../components/Layout/Layout';
import { authActions } from '../../store/auth/auth.actions';
import { LoginForm } from '../../components/LoginForm/LoginForm';

import zdarova from '../../assets/images/zdarova.svg';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const onFinish = ({ username, password }) => {
    dispatch(authActions.login(username, password));
  };

  return (
    <Layout>
      <LoginForm onFinish={onFinish} />
      <img className={styles.zdarova} src={zdarova} alt="xpamik" />
    </Layout>
  );
};
