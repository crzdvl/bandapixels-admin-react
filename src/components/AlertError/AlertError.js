import React from 'react';
import { Alert } from 'antd';

export const AlertError = ({ error }) => (
  <Alert type="error" message={error} />
);
