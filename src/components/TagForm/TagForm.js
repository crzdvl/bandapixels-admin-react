import React from 'react';
import {
  Form, Input, Button,
} from 'antd';

import styles from './TagForm.module.css';

const TagForm = ({ onFinish }) => (
  <Form
    className={styles.antForm}
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input name of the tag!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button
        className="antBtnPrimaryYellow"
        type="primary"
        htmlType="submit"
      >
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export { TagForm };
