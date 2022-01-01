import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Layout, Menu, Button } from 'antd';

import styles from './Header.module.css';
import logo from '../../assets/images/logo.svg';
import { authActions } from '../../store/auth/auth.actions';
import { localStorageService } from '../../services/localStorage.service';

export const Header = () => {
  const dispatch = useDispatch();
  const token = localStorageService.getKey('token');

  const onLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Layout.Header warnkey={1} theme="light">
      <div className="logo">
        <a href="https://bandapixels.com/"><img src={logo} alt="logo" /></a>
      </div>
      { token && (
        <div className={styles.wrapper}>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="posts"><a href="/posts">Posts</a></Menu.Item>
            <Menu.Item key="tags"><a href="/tags">Tags</a></Menu.Item>
          </Menu>
          <Button htmlType="button" className="antBtnPrimaryYellow" onClick={onLogout}>Logout</Button>
        </div>
      )}
    </Layout.Header>
  );
};
