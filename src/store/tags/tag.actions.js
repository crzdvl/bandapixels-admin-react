import { tagConstants } from './tag.constants';
import { tagService } from '../../services/tag.service';

function getAll(skip, take) {
  function request() { return { type: tagConstants.GETALL_REQUEST }; }
  function success({ data, count }) { return { type: tagConstants.GETALL_SUCCESS, data, count }; }
  function failure(error) { return { type: tagConstants.GETALL_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tagService.getAll(skip, take)
      .then(
        (data) => {
          dispatch(success({
            data: data.tags,
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
  function request() { return { type: tagConstants.GETONE_REQUEST }; }
  function success(tag) { return { type: tagConstants.GETONE_SUCCESS, tag }; }
  function failure(error) { return { type: tagConstants.GETONE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tagService.getOne(id)
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

function create(name) {
  function request() { return { type: tagConstants.CREATE_REQUEST }; }
  function success(tag) { return { type: tagConstants.CREATE_SUCCESS, tag }; }
  function failure(error) { return { type: tagConstants.CREATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tagService.create(name)
      .then(
        (tag) => {
          dispatch(success(tag));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function update(id, name) {
  function request() { return { type: tagConstants.UPDATE_REQUEST }; }
  function success(tag) { return { type: tagConstants.UPDATE_SUCCESS, tag }; }
  function failure(error) { return { type: tagConstants.UPDATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tagService.update(id, name)
      .then(
        (tag) => {
          dispatch(success(tag));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function remove(id) {
  function request() { return { type: tagConstants.DELETE_REQUEST }; }
  function success(deletedTag) { return { type: tagConstants.DELETE_SUCCESS, deletedTag }; }
  function failure(error) { return { type: tagConstants.DELETE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tagService.remove(id)
      .then(
        (tag) => {
          dispatch(success(tag));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

export const tagActions = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
