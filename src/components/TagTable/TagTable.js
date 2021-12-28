import React from 'react';
import { Table, Space, Button } from 'antd';

import styles from './TagTable.module.css';

const TagTable = ({ tags, onNameChange, onDelete }) => (
  <Table
    className={styles.customTable}
    pagination={false}
    dataSource={tags}
    rowKey={(record) => record.id}
  >
    <Table.Column
      title="#"
      dataIndex="id"
      key="id"
    />
    <Table.Column
      title="Name"
      dataIndex="name"
      key="name"
      render={(text, record) => (
        <p
          contentEditable="true"
          suppressContentEditableWarning="true"
          onKeyUpCapture={(e) => onNameChange(record.id, e.currentTarget.textContent)}
        >
          {record.name}
        </p>
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

export { TagTable };
