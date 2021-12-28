import { combineReducers } from 'redux';

import { auth } from './auth/auth.reducer';
import { tags } from './tags/tags.reducer';
import { file } from './files/file.reducer';
import { posts } from './posts/post.reducer';

const rootReducer = combineReducers({
  auth,
  tags,
  file,
  posts,
});

export default rootReducer;
