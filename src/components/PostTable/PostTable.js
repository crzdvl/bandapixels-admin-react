import React from 'react';
import { Table, Space, Button } from 'antd';

import styles from './PostTable.module.css';

const PostTable = ({ posts, onPublish, onDelete }) => (
  <Table
    className={styles.customTable}
    pagination={false}
    dataSource={posts}
    rowKey={(record) => record.id}
  >
    <Table.Column
      title="#"
      dataIndex="id"
      key="id"
    />
    <Table.Column
      title="Title"
      dataIndex="head"
      key="head"
    />
    <Table.Column
      title="Publish/Unpublish"
      dataIndex="published"
      key="published"
      render={(text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            id={record.id}
            onClick={() => onPublish(record.id, record.published)}
          >
            {!record.published ? 'Publish' : 'Unpublish'}
          </Button>
        </Space>
      )}
    />
    <Table.Column
      title="Preview"
      dataIndex="preview"
      key="preview"
      render={(text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            id={record.id}
          >
            <a href={`${process.env.REACT_APP_BACKEND_URL}/admin/posts/content/${record.slug}`} target="_blank">
              Preview
            </a>
          </Button>
        </Space>
      )}
    />
    <Table.Column
      title="Edit"
      dataIndex="published"
      key="published"
      render={(text, record) => (
        <Space size="middle">
          <a href={`/createPost?id=${record.id}`}>
            <Button
              id={record.id}
            >
              Edit
            </Button>
          </a>
        </Space>
      )}
    />
    <Table.Column
      title="Delete"
      key="delete"
      render={(text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            id={record.id}
            onClick={() => onDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      )}
    />
  </Table>
);

export { PostTable };
