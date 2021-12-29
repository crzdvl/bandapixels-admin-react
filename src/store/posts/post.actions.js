import { postConstants } from './post.constants';
import { postService } from '../../services/post.service';

function getAll(skip, take) {
  function request() { return { type: postConstants.GETALL_REQUEST }; }
  function success({ data, count }) { return { type: postConstants.GETALL_SUCCESS, data, count }; }
  function failure(error) { return { type: postConstants.GETALL_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    postService.getAll(skip, take)
      .then(
        (data) => {
          dispatch(success({
            data: data.posts,
            count: data.totalCount,
          }));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function getOne(id) {
  function request() { return { type: postConstants.GETONE_REQUEST }; }
  function success(post) { return { type: postConstants.GETONE_SUCCESS, post }; }
  function failure(error) { return { type: postConstants.GETONE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request({ id }));

    postService.getOne(id)
      .then(
        (post) => {
          dispatch(success(post), {
            payload: post,
          });
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function create(data) {
  function request() { return { type: postConstants.CREATE_REQUEST }; }
  function success(data) { return { type: postConstants.CREATE_SUCCESS, data }; }
  function failure(error) { return { type: postConstants.CREATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    postService.create(data)
      .then(
        (post) => {
          dispatch(success(post));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function publish(id, publish) {
  function request() { return { type: postConstants.PUBLISH_REQUEST }; }
  function success(data) { return { type: postConstants.PUBLISH_SUCCESS, data }; }
  function failure(error) { return { type: postConstants.PUBLISH_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    postService.publish(id, publish)
      .then(
        (post) => {
          dispatch(success(post), {
            payload: post,
          });
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function update(id, data) {
  function request() { return { type: postConstants.UPDATE_REQUEST }; }
  function success(tag) { return { type: postConstants.UPDATE_SUCCESS, tag }; }
  function failure(error) { return { type: postConstants.UPDATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    postService.update(id, data)
      .then(
        (post) => {
          dispatch(success(post));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function remove(id) {
  function request() { return { type: postConstants.DELETE_REQUEST }; }
  function success(deletedTag) { return { type: postConstants.DELETE_SUCCESS, deletedTag }; }
  function failure(error) { return { type: postConstants.DELETE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    postService.remove(id)
      .then(
        (tag) => {
          dispatch(success(tag), {
            payload: tag,
          });
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

export const postActions = {
  getAll,
  getOne,
  create,
  update,
  remove,
  publish,
};
