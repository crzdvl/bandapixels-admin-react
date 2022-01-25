import React from 'react';
import {
  Form, Input, Button, Upload, InputNumber,
} from 'antd';

import { CustomEditor } from '../CustomEditor/CustomEditor';
import styles from './PostForm.module.css';
import { CustomDropdown } from '../Dropdown/Dropdown';

const PostForm = ({
  onFinish, imagePreview, setImagePreview, image, setImage, htmlValue, setHtmlValue, tags, onSelect,
  selectedDefault, formInitialValue,
}) => {
  const onUploadImage = (data) => {
    if (data?.fileList) setImage(data.fileList);
  };

  const onUploadImagePreview = (data) => {
    if (data?.fileList) setImagePreview(data.fileList);
  };

  return (
    <Form
      className={styles.antForm}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={formInitialValue}
    >
      <Form.Item
        label="Head"
        name="head"
        rules={[
          {
            required: true,
            message: 'Please input head!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Subtitle"
        name="subtitle"
        rules={[
          {
            required: true,
            message: 'Please input subtitle!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Excerpt"
        name="excerpt"
        rules={[
          {
            required: true,
            message: 'Please input excerpt!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Minutes to read"
        name="minutes_to_read"
        rules={[
          {
            required: true,
            message: 'Please input minutes to read!',
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Image"
        rules={[
          {
            required: true,
            message: 'Please upload image!',
          },
        ]}
      >
        <Upload
          listType="picture-card"
          fileList={image}
          beforeUpload={() => false}
          onChange={onUploadImage}
          showUploadList={({
            showPreviewIcon: false,
          })}
        >
          {image?.length >= 1 ? null : 'uploadButton'}
        </Upload>
      </Form.Item>
      <Form.Item
        label="Image preview"
        rules={[
          {
            required: true,
            message: 'Please upload image preview!',
          },
        ]}
      >
        <Upload
          listType="picture-card"
          fileList={imagePreview}
          beforeUpload={() => false}
          onChange={onUploadImagePreview}
          showUploadList={({
            showPreviewIcon: false,
          })}
        >
          {imagePreview?.length >= 1 ? null : 'uploadButton'}
        </Upload>
      </Form.Item>
      <Form.Item className={styles.antEditor}>
        <CustomEditor htmlValue={htmlValue} setHtmlValue={setHtmlValue} />
      </Form.Item>
      <Form.Item className={styles.antEditor}>
        <CustomDropdown tags={tags} onSelect={onSelect} selectedDefault={selectedDefault} />
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
};

export { PostForm };
