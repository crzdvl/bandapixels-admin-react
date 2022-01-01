import { postConstants } from './post.constants';

const initialState = () => ({
  allPosts: {
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
        allPosts: action.allPosts,
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
        createdPost: action.createdPost,
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
    case postConstants.PUBLISH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case postConstants.PUBLISH_SUCCESS:
      return {
        ...state,
        publishedPost: action.publishedPost,
      };
    case postConstants.PUBLISH_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
