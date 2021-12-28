import { fileConstants } from './file.constants';
import { fileService } from '../../services';

function upload(type, file) {
  function request() { return { type: fileConstants.UPLOAD_REQUEST }; }
  function success(files) { return { type: fileConstants.UPLOAD_SUCCESS, files }; }
  function failure(error) { return { type: fileConstants.UPLOAD_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    fileService.upload(type, file)
      .then(
        (result) => {
          dispatch(success(result), {
            payload: result,
          });
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

export const fileActions = {
  upload,
};
