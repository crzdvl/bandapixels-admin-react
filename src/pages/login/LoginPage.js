import React from 'react';
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';

import { authActions } from '../../store/auth/auth.actions';
import { Header } from '../../components/Header/Header';
import { LoginForm } from '../../components/LoginForm/LoginForm';

import zdarova from './zdarova.svg';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const onFinish = ({ username, password }) => {
    dispatch(authActions.login(username, password));
  };

  return (
    <div>
      <Header />
      <Layout.Content>
        <LoginForm onFinish={onFinish} />
      </Layout.Content>
      <img className={styles.zdarova} src={zdarova} alt="xpamik" />
    </div>
  );
};
