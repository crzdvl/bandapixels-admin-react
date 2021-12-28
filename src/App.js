import React from 'react';
import {
  Route, Routes, BrowserRouter,
} from 'react-router-dom';

import { LoginPage } from './pages/login/LoginPage';
import { TagsPage } from './pages/tags/TagsPage';
import { CreatePostPage } from './pages/createPost/CreatePostPage';
import { PostsPage } from './pages/posts/PostsPage';
import { IsAuth, IsNotAuth } from './helpers/isAuth';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={(
          <IsNotAuth>
            <LoginPage />
          </IsNotAuth>
        )}
      />
      <Route
        path="/tags"
        element={(
          <IsAuth>
            <TagsPage />
          </IsAuth>
        )}
      />
      <Route
        path="/posts"
        element={(
          <IsAuth>
            <PostsPage />
          </IsAuth>
        )}
      />
      <Route
        path="/createPost"
        element={(
          <IsAuth>
            <CreatePostPage />
          </IsAuth>
        )}
      />
    </Routes>
  </BrowserRouter>
);

export { App };
