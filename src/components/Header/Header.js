import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Layout, Menu, Button } from 'antd';

import logo from './logo.svg';
import './Header.css';
import { authActions } from '../../store/auth/auth.actions';

export const Header = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Layout.Header theme="light">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      { localStorage.getItem('token') ? (
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="posts"><a href="/posts">Posts</a></Menu.Item>
          <Menu.Item key="tags"><a href="/tags">Tags</a></Menu.Item>
          <Button className="antBtnPrimaryYellow" onClick={onLogout}>Logout</Button>
        </Menu>
      ) : ''}
    </Layout.Header>
  );
};

/*

<Navbar>
    <Container>
      <Navbar.Brand href="/">Bandapixels-admin</Navbar.Brand>
      <Navbar.Toggle />
      { localStorage.getItem('token') ? (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="/tags">Tags</a>
          </Navbar.Text>
          <Navbar.Text>
            <a href="/posts">Posts</a>
          </Navbar.Text>
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="/">Login</a>
          </Navbar.Text>
        </Navbar.Collapse>
      )}
    </Container>
  </Navbar>

 */