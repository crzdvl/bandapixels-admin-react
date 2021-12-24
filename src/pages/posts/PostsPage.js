import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Table } from 'react-bootstrap';

import { tagActions } from '../../store/tags/tag.actions';
import { Header } from '../../components/Header/Header';

export const TagsPage = () => {
  const dispatch = useDispatch();
  let tags = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(tagActions.getAll(0, 10));
  }, []);

  const [inputs, setInputs] = useState({});
  const onChangeHandler = (e) => setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    const { name } = inputs;

    if (name) {
      dispatch(tagActions.create(name));
    }
  };

  const onNameChange = (id, newName) => {
    dispatch(tagActions.update(id, newName));
  };

  const onDelete = (id) => {
    dispatch(tagActions.remove(id));
    tags = tags.filter((tag) => tag.id !== id);
  };

  return (
    <div>
      <Header />
      <div className="col-md-6 col-md-offset-3">
        <form name="form" onSubmit={handleSubmit(onSubmit)}>
          <div className={`form-group${!inputs.name ? ' has-error' : ''}`}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={inputs.name || ''}
              onChange={onChangeHandler}
            />
            {!inputs.name
                            && <div className="help-block">Username is required</div>}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Create tag</button>
          </div>
        </form>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tags.length ? tags.map(({ id, name }) => (
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
    </div>
  );
};
