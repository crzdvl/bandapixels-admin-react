import React from 'react';

import { Table } from 'react-bootstrap';

const CustomTable = ({
  onNameChange, onDelete, tags, columns,
}) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        {columns?.length ? columns.map((name) => (
          <th>{name}</th>
        )) : 'Loading...'}
      </tr>
    </thead>
    <tbody>
      {tags?.length ? tags.map(({ id, name }) => (
        <tr key={id}>
          <td>{id}</td>
          <td
            id={id}
            contentEditable="true"
            onKeyUpCapture={(e) => onNameChange(e.target.id, e.currentTarget.textContent)}
          >
            {name}
          </td>
          <td>
            <button
              id={id}
              type="submit"
              onClick={(e) => onDelete(e.target.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )) : 'Loading...'}
    </tbody>
  </Table>
);

export { CustomTable };
