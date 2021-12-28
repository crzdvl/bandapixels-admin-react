import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';

import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageUploader', ImageUploader);

const CustomEditor = ({ htmlValue, setHtmlValue }) => {
  const onEditorChange = (value, delta, source, editor) => {
    setHtmlValue(editor.getHTML());
  };

  return (
    <ReactQuill
      theme="snow"
      value={htmlValue}
      modules={{
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['link', 'image'],
        ],
      }}
      onChange={onEditorChange}
    />
  );
};

export { CustomEditor };
