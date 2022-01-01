import { tagConstants } from './tag.constants';
import { tagService } from '../../services/tag.service';

function getAll(skip, take) {
  return (dispatch) => {
    dispatch({ type: tagConstants.GETALL_REQUEST });

    tagService.getAll(skip, take)
      .then(
        (data) => {
          dispatch({
            type: tagConstants.GETALL_SUCCESS,
            allTags: {
              data: data.tags,
              count: data.totalCount,
            },
          });
        },
        (error) => {
          dispatch({ type: tagConstants.GETALL_FAILURE, error });
        },
      );
  };
}

function getOne(id) {
  return (dispatch) => {
    dispatch({ type: tagConstants.GETONE_REQUEST });

    tagService.getOne(id)
      .then(
        (tag) => {
          dispatch({ type: tagConstants.GETONE_SUCCESS, tag });
        },
        (error) => {
          dispatch({ type: tagConstants.GETONE_FAILURE, error });
        },
      );
  };
}

function create(name) {
  return (dispatch) => {
    dispatch({ type: tagConstants.CREATE_REQUEST });

    tagService.create(name)
      .then(
        (createdTag) => {
          dispatch({ type: tagConstants.CREATE_SUCCESS, createdTag });
        },
        (error) => {
          dispatch({ type: tagConstants.CREATE_FAILURE, error });
        },
      );
  };
}

function update(id, name) {
  return (dispatch) => {
    dispatch({ type: tagConstants.UPDATE_REQUEST });

    tagService.update(id, name)
      .then(
        (tag) => {
          dispatch({ type: tagConstants.UPDATE_SUCCESS, tag });
        },
        (error) => {
          dispatch({ type: tagConstants.UPDATE_FAILURE, error });
        },
      );
  };
}

function remove(id) {
  return (dispatch) => {
    dispatch({ type: tagConstants.DELETE_REQUEST });

    tagService.remove(id)
      .then(
        (tag) => {
          dispatch({ type: tagConstants.DELETE_SUCCESS, deletedTag: tag });
        },
        (error) => {
          dispatch({ type: tagConstants.DELETE_FAILURE, error });
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
