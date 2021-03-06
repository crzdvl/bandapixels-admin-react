import React, { useEffect, useState } from 'react';
import { Button, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from '../../components/Layout/Layout';
import { postActions } from '../../store/posts/post.actions';
import { PostTable } from '../../components/PostTable/PostTable';
import { getCountOfPosts, getFetchedPosts, getPublishedPost } from '../../store/posts/post.selectors';

export const PostsPage = () => {
  const dispatch = useDispatch();
  const fetchedPosts = useSelector(getFetchedPosts);
  const countOfPosts = useSelector(getCountOfPosts);
  const getLastPublishedPost = useSelector(getPublishedPost);

  const [posts, setPosts] = useState([]);
  const [deletedPost, setDeletedPost] = useState();
  const [itemsParams, setItemsParams] = useState({
    skip: 0,
    take: 5,
  });

  useEffect(() => {
    dispatch(postActions.getAll(itemsParams.skip, itemsParams.take));
    dispatch(postActions.getCountOfPosts());
  }, [deletedPost, getLastPublishedPost]);

  useEffect(() => {
    setPosts(fetchedPosts);
  }, [fetchedPosts]);

  const onChangePage = (page) => {
    const newSkip = (page - 1) * itemsParams.take;
    dispatch(postActions.getAll(newSkip, itemsParams.take));
    dispatch(postActions.getCountOfPosts());

    setItemsParams({
      ...itemsParams,
      skip: newSkip,
    });
  };

  const onPublish = (id, published) => {
    dispatch(postActions.publish(id, !published));
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
