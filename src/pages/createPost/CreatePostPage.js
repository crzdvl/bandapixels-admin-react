import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

import styles from './CreatePostPage.module.css';
import { fileActions } from '../../store/files/file.actions';
import { PostForm } from '../../components/PostForm/PostForm';
import { getFetchedTags } from '../../store/tags/tag.selectors';
import { postActions } from '../../store/posts/post.actions';
import { tagActions } from '../../store/tags/tag.actions';
import { getPost, getPostError } from '../../store/posts/post.selectors';
import { getFileError, getUploadedFiles } from '../../store/files/file.selectors';
import { AlertError } from '../../components/AlertError/AlertError';
import { Layout } from '../../components/Layout/Layout';

export const CreatePostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchedPost = useSelector(getPost);
  const fileError = useSelector(getFileError);
  const postError = useSelector(getPostError);
  const fetchedTags = useSelector(getFetchedTags);
  const uploadedFiles = useSelector(getUploadedFiles);

  const [scrolled, setScrolled] = useState(false);
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState();
  const [formDataUpdated, setFormDataUpdated] = useState(false);
  const [image, setImage] = useState([]);
  const [tags, setTags] = useState(fetchedTags);
  const [htmlValue, setHtmlValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [formInitialValue, setFormInitialValue] = useState({});
  const [selectedDefaultTags, setSelectedDefaultTags] = useState([]);
  const [countOfNedeedUploads, setCountOfNedeedUploads] = useState(2);

  const postId = searchParams.get('id');
  useEffect(() => {
    if ((fileError || postError) && !scrolled) {
      setScrolled(true);

      window.scrollTo(0, 0);
    }
  }, [fileError, postError]);

  useEffect(() => {
    dispatch(tagActions.getAll(0, 100));

    if (postId) {
      dispatch(postActions.getOne(postId));
    }
  }, []);

  useEffect(() => {
    if (postId && fetchedPost && Object.keys(fetchedPost.post).length !== 0) {
      const fileContentUrl = `${process.env.REACT_APP_BACKEND_URL}/admin/files/`;
      setImage([
        ...image,
        {
          url: `${fileContentUrl}${fetchedPost.post.imageId}`,
        },
      ]);
      setImagePreview([
        ...image,
        {
          url: `${fileContentUrl}${fetchedPost.post.previewImageId}`,
        },
      ]);
      setFormInitialValue({
        ...fetchedPost.post,
      });
      setHtmlValue(fetchedPost.post.body);
      setSelectedDefaultTags(fetchedPost.post.tagsIds);
    }
  }, [fetchedPost]);

  useEffect(() => {
    setTags(fetchedTags);
  }, [fetchedTags]);

  const updateData = () => {
    const postData = {
      ...formData,
      imageId:
        uploadedFiles?.filter((file) => file.type === 'IMAGE')[0]?.id
        || fetchedPost?.post?.imageId,
      previewImageId:
        uploadedFiles?.filter((file) => file.type === 'PREVIEW')[0]?.id
        || fetchedPost?.post?.previewImageId,
      body: htmlValue,
      tagsIds: selectedTags,
    };

    if (postId && (uploadedFiles.length === countOfNedeedUploads)) {
      dispatch(postActions.update(postId, postData));
      navigate('/posts');
    } else if (
      formData
      && htmlValue
      && selectedTags.length
      && image.length
      && imagePreview.length
      && (uploadedFiles.length === countOfNedeedUploads)
    ) {
      dispatch(postActions.create(postData));
      navigate('/posts');
    }
  };

  useEffect(() => {
    updateData();
  }, [uploadedFiles]);

  useEffect(() => {
    updateData();
  }, [formDataUpdated]);

  const onFinish = (data) => {
    if (postId) {
      const countOfNewUploads = 0;
      setFormData(data);

      if (image[0] && !('url' in image[0])) {
        setCountOfNedeedUploads(countOfNewUploads + 1);
        dispatch(fileActions.upload('IMAGE', image[0]));
      }
      if (imagePreview[0] && !('url' in imagePreview[0])) {
        setCountOfNedeedUploads(countOfNewUploads + 1);
        dispatch(fileActions.upload('PREVIEW', imagePreview[0]));
      }
      if (
        ((image[0] && ('url' in image[0]))
        && (imagePreview[0] && ('url' in imagePreview[0])))
      ) {
        setCountOfNedeedUploads(0);
      }

      setFormDataUpdated(true);
    } else if (
      data
      && htmlValue
      && selectedTags.length
      && image.length
      && imagePreview.length
    ) {
      setCountOfNedeedUploads(2);
      setFormData(data);

      dispatch(fileActions.upload('IMAGE', image[0]));
      dispatch(fileActions.upload('PREVIEW', imagePreview[0]));
    }
  };
  const PostFormData = (
    <PostForm
      htmlValue={htmlValue}
      formInitialValue={formInitialValue}
      setHtmlValue={setHtmlValue}
      image={image}
      setImage={setImage}
      imagePreview={imagePreview}
      setImagePreview={setImagePreview}
      tags={tags}
      selectedDefault={selectedDefaultTags}
      onSelect={setSelectedTags}
      onFinish={onFinish}
    />
  );

  return (
    <Layout>
      <div className={styles.wrapper}>
        {(fileError || postError) && <AlertError error={fileError || postError} />}
        {postId ? (Object.keys(formInitialValue).length !== 0 && (
          PostFormData
        )) : (
          PostFormData
        )}
      </div>
    </Layout>
  );
};
