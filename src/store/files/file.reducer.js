import { fileConstants } from './file.constants';

const initialState = () => ({
  files: [],
});

export function file(state = initialState(), action) {
  switch (action.type) {
    case fileConstants.UPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case fileConstants.UPLOAD_SUCCESS:
      return {
        ...state,
        files: [...state.files, action.files],
      };
    case fileConstants.UPLOAD_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case fileConstants.RESET:
      return initialState();
    default:
      return state;
  }
}
