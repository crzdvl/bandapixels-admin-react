import React from 'react';

import styles from './Layout.module.css';
import { Header } from '../Header/Header';

export const Layout = ({ children }) => (
  <>
    <Header />
    <div className={styles.wrapper}>
      { children }
    </div>
  </>
);
