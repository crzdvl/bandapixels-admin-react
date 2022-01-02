import { tagConstants } from './tag.constants';

const initialState = () => ({
  allTags: {
    data: [],
    count: 0,
  },
});

export function tags(state = initialState(), action) {
  switch (action.type) {
    case tagConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case tagConstants.GETALL_SUCCESS:
      return {
        ...state,
        allTags: action.allTags,
      };
    case tagConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case tagConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case tagConstants.CREATE_SUCCESS:
      return {
        ...state,
        createdTag: action.createdTag,
      };
    case tagConstants.CREATE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case tagConstants.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case tagConstants.DELETE_SUCCESS:
      return {
        ...state,
        deletedTag: action.deletedTag,
      };
    case tagConstants.DELETE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case tagConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case tagConstants.UPDATE_SUCCESS:
      return {
        ...state,
        tag: action.tags,
      };
    case tagConstants.UPDATE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
