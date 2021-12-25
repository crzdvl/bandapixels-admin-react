import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import { tagActions } from '../../store/tags/tag.actions';
import { Header } from '../../components/Header/Header';
import './TagsPage.css';
import { TagForm } from '../../components/TagForm/TagForm';
import { CustomTable } from '../../components/CustomTable/CustomTable';

export const TagsPage = () => {
  const skip = 0;
  const take = 5;

  const dispatch = useDispatch();

  const fetchedTags = useSelector((state) => state.tags.tags.data);
  const countOfTags = useSelector((state) => state.tags.tags.count);

  const addedTag = useSelector((state) => state.tags.tag);

  const [deletedTag, setDeletedTag] = useState();
  const [tags, setTags] = useState(fetchedTags);

  useEffect(() => {
    dispatch(tagActions.getAll(skip, take));
  }, [dispatch]);

  useEffect(() => {
    setTags(fetchedTags);
  }, [fetchedTags]);

  useEffect(() => {
    dispatch(tagActions.getAll(skip, take));
  }, [addedTag, deletedTag]);

  const onNameChange = (id, newName) => {
    dispatch(tagActions.update(id, newName));
  };

  const onDelete = (id) => {
    dispatch(tagActions.remove(id));
    setTags(tags.filter((tag) => tag.id !== Number(id)));

    setDeletedTag(id);
  };

  const onChangePage = (page) => {
    const newSkip = (page - 1) * take;
    dispatch(tagActions.getAll(newSkip, take));
  };

  const onFinish = ({ name }) => {
    dispatch(tagActions.create(name));
  };

  return (
    <div>
      <Header />
      <TagForm onFinish={onFinish} />
      <CustomTable tags={tags} onNameChange={onNameChange} onDelete={onDelete} />
      <Pagination onChange={onChangePage} defaultCurrent={1} pageSize={take} total={countOfTags} />
    </div>
  );
};
