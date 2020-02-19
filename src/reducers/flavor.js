import { buildActions } from 'utils';

export const types = buildActions('flavor', [
  'REQUEST_STASH',
  'REQUEST_STASH_SUCCESS',
  'REQUEST_STASH_FAILURE'
]);

const requestStash = () => ({
  type: types.REQUEST_STASH
});

const requestStashSuccess = stash => ({
  type: types.REQUEST_STASH_SUCCESS,
  stash
});

const requestStashFailure = error => ({
  type: types.REQUEST_STASH_FAILURE,
  error
});

export const actions = {
  requestStash,
  requestStashSuccess,
  requestStashFailure
};

export const initialState = {
  loaded: false,
  error: null,
  stash: []
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_STASH_SUCCESS:
      return {
        ...state,
        stash: action.stash,
        loaded: true
      };
    case types.REQUEST_STASH_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
