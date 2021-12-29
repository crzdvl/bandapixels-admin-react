import { postConstants } from './post.constants';

const initialState = () => ({
  posts: {
    data: [],
    count: 0,
  },
});

export function posts(state = initialState(), action) {
  switch (action.type) {
    case postConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case postConstants.GETALL_SUCCESS:
      return {
        ...state,
        posts: {
          count: action.count,
          data: action.data,
        },
      };
    case postConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case postConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case postConstants.CREATE_SUCCESS:
      return {
        ...state,
        post: action.post,
      };
    case postConstants.CREATE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case postConstants.GETONE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case postConstants.GETONE_SUCCESS:
      return {
        ...state,
        post: action,
      };
    case postConstants.GETONE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

/*
[postConstants.GETALL_REQUEST]: {
...state,
    loading: true,
},
[postConstants.GETALL_SUCCESS]: {
...state,
    posts: {
    count: action.count,
      data: action.data,
  },
},
})[action.type] ?? state;
} */
