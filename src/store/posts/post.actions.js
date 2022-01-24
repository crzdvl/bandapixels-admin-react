import { postConstants } from './post.constants';
import { postService } from '../../services/post.service';

function getAll(skip, take) {
  return (dispatch) => {
    dispatch({ type: postConstants.GETALL_REQUEST });

    postService.getAll(skip, take)
      .then(
        (data) => {
          dispatch({
            type: postConstants.GETALL_SUCCESS,
            posts: data,
          });
        },
        (error) => {
          dispatch({ type: postConstants.GETALL_FAILURE, error });
        },
      );
  };
}

function getOne(id) {
  return (dispatch) => {
    dispatch({ type: postConstants.GETONE_REQUEST });

    postService.getOne(id)
      .then(
        (post) => {
          dispatch({ type: postConstants.GETONE_SUCCESS, post });
        },
        (error) => {
          dispatch({ type: postConstants.GETONE_FAILURE, error });
        },
      );
  };
}

function getCountOfPosts() {
  return (dispatch) => {
    dispatch({ type: postConstants.GETCOUNT_REQUEST });

    postService.getCountOfPosts()
      .then(
        (post) => {
          dispatch({ type: postConstants.GETCOUNT_SUCCESS, count: post.totalCount });
        },
        (error) => {
          dispatch({ type: postConstants.GETCOUNT_FAILURE, error });
        },
      );
  };
}

function create(data) {
  return (dispatch) => {
    dispatch({ type: postConstants.CREATE_REQUEST });

    postService.create(data)
      .then(
        (post) => {
          dispatch({ type: postConstants.CREATE_SUCCESS, createdPost: post });
        },
        (error) => {
          dispatch({ type: postConstants.CREATE_FAILURE, error });
        },
      );
  };
}

function publish(id, publish) {
  return (dispatch) => {
    dispatch({ type: postConstants.PUBLISH_REQUEST });

    postService.publish(id, publish)
      .then(
        (post) => {
          dispatch({
            type: postConstants.PUBLISH_SUCCESS,
            publishedPost: {
              ...post,
              timestamp: Date.now(),
            },
          });
        },
        (error) => {
          dispatch({ type: postConstants.PUBLISH_FAILURE, error });
        },
      );
  };
}

function update(id, data) {
  function failure(error) { return { type: postConstants.UPDATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch({ type: postConstants.UPDATE_REQUEST });

    postService.update(id, data)
      .then(
        (post) => {
          dispatch({ type: postConstants.UPDATE_SUCCESS, updatedPost: post });
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function remove(id) {
  return (dispatch) => {
    dispatch({ type: postConstants.DELETE_REQUEST });

    postService.remove(id)
      .then(
        (post) => {
          dispatch({ type: postConstants.DELETE_SUCCESS, deletedPost: post });
        },
        (error) => {
          dispatch({ type: postConstants.DELETE_FAILURE, error });
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
  getCountOfPosts,
};
