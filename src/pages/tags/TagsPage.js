import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import './TagsPage.css';

import { tagActions } from '../../store/tags/tag.actions';
import { Layout } from '../../components/Layout/Layout';
import { TagForm } from '../../components/TagForm/TagForm';
import { TagTable } from '../../components/TagTable/TagTable';
import { getCountOfTags, getFetchedTags, getLastAddedTag } from '../../store/tags/tag.selectors';

export const TagsPage = () => {
  const dispatch = useDispatch();

  const fetchedTags = useSelector(getFetchedTags);
  const countOfTags = useSelector(getCountOfTags);
  const addedTag = useSelector(getLastAddedTag);

  const [itemsParams, setItemsParams] = useState({
    skip: 0,
    take: 5,
  });
  const [deletedTag, setDeletedTag] = useState();
  const [tags, setTags] = useState(fetchedTags);

  useEffect(() => {
    dispatch(tagActions.getAll(itemsParams.skip, itemsParams.take));
  }, [dispatch]);

  useEffect(() => {
    setTags(fetchedTags);
  }, [fetchedTags]);

  useEffect(() => {
    dispatch(tagActions.getAll(itemsParams.skip, itemsParams.take));
  }, [addedTag, deletedTag]);

  const onDelete = (id) => {
    dispatch(tagActions.remove(id));
    setTags(tags.filter((tag) => tag.id !== Number(id)));

    setDeletedTag(id);
  };

  const onChangePage = (page) => {
    const newSkip = (page - 1) * itemsParams.take;
    dispatch(tagActions.getAll(newSkip, itemsParams.take));

    setItemsParams({
      ...itemsParams,
      skip: newSkip,
    });
  };

  const onNameChange = (id, newName) => dispatch(tagActions.update(id, newName));
  const onFinish = ({ name }) => dispatch(tagActions.create(name));

  return (
    <Layout>
      <>
        <TagForm onFinish={onFinish} />
        <TagTable tags={tags} onNameChange={onNameChange} onDelete={onDelete} />
        <Pagination className="m30" onChange={onChangePage} pageSize={itemsParams.take} total={countOfTags} />
      </>
    </Layout>
  );
};
