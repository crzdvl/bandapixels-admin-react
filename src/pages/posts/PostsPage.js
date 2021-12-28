import React, { useEffect, useState } from 'react';

import { Button, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/Layout/Layout';
import { postActions } from '../../store/posts/post.actions';
import { tagActions } from '../../store/tags/tag.actions';
import { PostTable } from '../../components/PostTable/PostTable';

export const PostsPage = () => {
  const [itemsParams, setItemsParams] = useState({
    skip: 0,
    take: 5,
  });

  const [posts, setPosts] = useState();

  const dispatch = useDispatch();
  const fetchedPosts = useSelector((state) => state?.posts?.posts?.data);
  const countOfPosts = useSelector((state) => state?.posts?.posts?.count);

  useEffect(() => {
    dispatch(postActions.getAll(itemsParams.skip, itemsParams.take));
  }, []);

  useEffect(() => {
    setPosts(fetchedPosts);
  }, [fetchedPosts]);

  const onChangePage = (page) => {
    const newSkip = (page - 1) * itemsParams.take;
    dispatch(tagActions.getAll(newSkip, itemsParams.take));

    setItemsParams({
      ...itemsParams,
      skip: newSkip,
    });
  };

  const onPublish = (id, published) => {
    dispatch(postActions.publish(id, !published));
    dispatch(postActions.getAll(itemsParams.skip, itemsParams.take));
  };

  return (
    <Layout>
      <>
        <a href="/createPost">
          <Button
            className="antBtnPrimaryYellow"
            type="primary"
          >
            Add new post
          </Button>
        </a>
        <PostTable posts={posts} onPublish={onPublish} />
        <Pagination onChange={onChangePage} pageSize={itemsParams.take} total={countOfPosts} />
      </>
    </Layout>
  );
};
