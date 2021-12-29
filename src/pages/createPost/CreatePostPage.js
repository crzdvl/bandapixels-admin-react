import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSearchParams, useNavigate } from 'react-router-dom';
import { fileActions } from '../../store/files/file.actions';
import { Header } from '../../components/Header/Header';
import { PostForm } from '../../components/PostForm/PostForm';
import { getFetchedTags } from '../../store/tags/tag.selectors';
import { postActions } from '../../store/posts/post.actions';
import { tagActions } from '../../store/tags/tag.actions';
import { getLastAddedPost } from '../../store/posts/post.selectors';
import { getUploadedFiles } from '../../store/files/file.selectors';

export const CreatePostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchedTags = useSelector(getFetchedTags);
  const fetchedPost = useSelector(getLastAddedPost);
  const uploadedFiles = useSelector(getUploadedFiles);

  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState();
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
    dispatch(tagActions.getAll(0, 100));

    if (postId) {
      dispatch(postActions.getOne(postId));
    }
  }, []);

  useEffect(() => {
    if (postId && fetchedPost && Object.keys(fetchedPost.post).length !== 0) {
      setImage([
        ...image,
        {
          status: 'done',
          url: `http://localhost:3000/api/admin/files/${fetchedPost.post.imageId}`,
        },
      ]);
      setImagePreview([
        ...image,
        {
          status: 'done',
          url: `http://localhost:3000/api/admin/files/${fetchedPost.post.previewImageId}`,
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

  useEffect(() => {
    if (postId && (uploadedFiles.files.length === countOfNedeedUploads)) {
      const postData = {
        ...formData,
        imageId:
          uploadedFiles?.files?.filter((file) => file.type === 'IMAGE')[0]?.id
          || fetchedPost?.post?.imageId,
        previewImageId:
          uploadedFiles?.files?.filter((file) => file.type === 'PREVIEW')[0]?.id
          || fetchedPost?.post?.previewImageId,
        body: htmlValue,
        tagsIds: selectedTags,
      };
      dispatch(postActions.update(postId, postData));
      navigate('/posts');
    } else if (
      formData
      && htmlValue
      && selectedTags.length
      && image.length
      && imagePreview.length
      && (uploadedFiles.files.length === countOfNedeedUploads)
    ) {
      const postData = {
        ...formData,
        imageId:
          uploadedFiles?.files?.filter((file) => file.type === 'IMAGE')[0]?.id
          || fetchedPost?.post?.imageId,
        previewImageId:
          uploadedFiles?.files?.filter((file) => file.type === 'PREVIEW')[0]?.id
          || fetchedPost?.post?.previewImageId,
        body: htmlValue,
        tagsIds: selectedTags,
      };
      dispatch(postActions.create(postData));
      navigate('/posts');
    }
  }, [uploadedFiles]);

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
    <div>
      <Header />
      {postId ? (Object.keys(formInitialValue).length !== 0 && (
        PostFormData
      )) : (
        PostFormData
      )}
    </div>
  );
};
