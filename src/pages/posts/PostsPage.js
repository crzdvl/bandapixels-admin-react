import React, { useEffect, useState } from 'react';
import { Button, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from '../../components/Layout/Layout';
import { postActions } from '../../store/posts/post.actions';
import { PostTable } from '../../components/PostTable/PostTable';
import { getCountOfPosts, getFetchedPosts } from '../../store/posts/post.selectors';

export const PostsPage = () => {
  const [itemsParams, setItemsParams] = useState({
    skip: 0,
    take: 5,
  });

  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const fetchedPosts = useSelector(getFetchedPosts);
  const countOfPosts = useSelector(getCountOfPosts);
  const [deletedPost, setDeletedPost] = useState();

  useEffect(() => {
    dispatch(postActions.getAll(itemsParams.skip, itemsParams.take));
  }, [deletedPost]);

  useEffect(() => {
    setPosts(fetchedPosts);
  }, [fetchedPosts]);

  const onChangePage = (page) => {
    const newSkip = (page - 1) * itemsParams.take;
    dispatch(postActions.getAll(newSkip, itemsParams.take));

    setItemsParams({
      ...itemsParams,
      skip: newSkip,
    });
  };

  const onPublish = (id, published) => {
    dispatch(postActions.publish(id, !published));
    dispatch(postActions.getAll(itemsParams.skip, itemsParams.take));
  };

  const onDelete = (id) => {
    dispatch(postActions.remove(id));
    setPosts(posts.filter((post) => post.id !== Number(id)));

    setDeletedPost(id);
  };

  return (
    <Layout>
      <a className="m30" href="/createPost">
        <Button
          className="antBtnPrimaryYellow"
          type="primary"
        >
          Add new post
        </Button>
      </a>
      <PostTable posts={posts} onDelete={onDelete} onPublish={onPublish} />
      <Pagination className="m30" onChange={onChangePage} pageSize={itemsParams.take} total={countOfPosts} />
    </Layout>
  );
};
