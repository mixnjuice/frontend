import { buildActions } from 'utils';

export const types = buildActions('flavor', [
  'REQUEST_STASH',
  'REQUEST_STASH_SUCCESS',
  'ADD_STASH',
  'REMOVE_STASH',
  'UPDATE_STASH',
  'UPDATE_STASH_SUCCESS',
  'REQUEST_FAILURE'
]);

const requestStash = () => ({
  type: types.REQUEST_STASH
});

const requestStashSuccess = stash => ({
  type: types.REQUEST_STASH_SUCCESS,
  stash
});

const addStash = flavor => ({
  type: types.ADD_STASH,
  flavor
});

const removeStash = flavor => ({
  type: types.REMOVE_STASH,
  flavor
});

const updateStash = flavor => ({
  type: types.UPDATE_STASH,
  flavor
});

const updateStashSuccess = () => ({
  type: types.UPDATE_STASH_SUCCESS
});

const requestFailure = error => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestStash,
  requestStashSuccess,
  addStash,
  removeStash,
  updateStash,
  updateStashSuccess,
  requestFailure
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
    case types.UPDATE_STASH_SUCCESS:
      return {
        ...state,
        loaded: false
      };
    case types.REQUEST_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
