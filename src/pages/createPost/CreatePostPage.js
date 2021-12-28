import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSearchParams } from 'react-router-dom';
import { fileActions } from '../../store/files/file.actions';
import { Header } from '../../components/Header/Header';
import { PostForm } from '../../components/PostForm/PostForm';
import { getFetchedTags } from '../../store/tags/tag.selectors';
import { postActions } from '../../store/posts/post.actions';
import { tagActions } from '../../store/tags/tag.actions';

export const CreatePostPage = () => {
  const dispatch = useDispatch();
  const [countOfNedeedUploads, setCountOfNedeedUploads] = useState(0);
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('id');
  const [formInitialValue, setFormInitialValue] = useState({});
  const [selectedDefaultTags, setSelectedDefaultTags] = useState([]);

  const uploadedFiles = useSelector((state) => state.file);
  const fetchedTags = useSelector(getFetchedTags);

  const fetchedPost = useSelector((state) => state.posts.post);

  const [formData, setFormData] = useState();
  const [image, setImage] = useState([]);
  const [tags, setTags] = useState(fetchedTags);
  const [htmlValue, setHtmlValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [imagePreview, setImagePreview] = useState([{
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'http://localhost:3000/api/admin/files/59',
  }]);

  useEffect(() => {
    dispatch(tagActions.getAll(0, 100));

    if (postId) {
      dispatch(postActions.getOne(postId));
    }
  }, []);

  useEffect(() => {
    if (fetchedPost && Object.keys(fetchedPost.post).length !== 0) {
      setImage([
        ...image,
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: `http://localhost:3000/api/admin/files/${fetchedPost.post.imageId}`,
        },
      ]);
      setImagePreview([
        ...image,
        {
          uid: '-1',
          name: 'image.png',
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
    }
    if (
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
    }
  }, [uploadedFiles]);

  const onFinish = (data) => {
    if (postId) {
      setFormData(data);

      if (image[0] && !('url' in image[0])) {
        setCountOfNedeedUploads(countOfNedeedUploads + 1);
        dispatch(fileActions.upload('IMAGE', image[0]));
      }
      if (imagePreview[0] && !('url' in imagePreview[0])) {
        setCountOfNedeedUploads(countOfNedeedUploads + 1);
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

  return (
    <div>
      <Header />
      {postId ? (Object.keys(formInitialValue).length !== 0 && (
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
      )) : (
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
      )}
    </div>
  );
};
