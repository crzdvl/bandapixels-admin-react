import React from 'react';
import { Table, Space, Button } from 'antd';

const CustomTable = ({ tags, onNameChange, onDelete }) => (
  <Table
    pagination={false}
    dataSource={tags}
  >
    <Table.Column title="#" dataIndex="id" key="id" />
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

export { CustomTable };
