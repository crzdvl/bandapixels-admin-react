import { combineReducers } from 'redux';

import { auth } from './auth/auth.reducer';
import { tags } from './tags/tags.reducer';

const rootReducer = combineReducers({
  auth,
  tags,
});

export default rootReducer;
