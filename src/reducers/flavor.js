import { buildActions } from 'utils';

export const types = buildActions('flavor', [
  'REQUEST_STASH',
  'REQUEST_STASH_SUCCESS',
  'REQUEST_STASH_FAILURE',
  'ADD_TO_STASH',
  'ADD_TO_STASH_SUCCESS',
  'ADD_TO_STASH_FAILURE',
  'REMOVE_FROM_STASH',
  'REMOVE_FROM_STASH_SUCCESS',
  'REMOVE_FROM_STASH_FAILURE',
  'UPDATE_STASH',
  'UPDATE_STASH_SUCCESS',
  'UPDATE_STASH_FAILURE'
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

const addStash = flavor => ({
  type: types.ADD_TO_STASH,
  flavor
});

const addStashSuccess = () => ({
  type: types.ADD_TO_STASH_SUCCESS
});

const addStashFailure = error => ({
  type: types.ADD_TO_STASH_FAILURE,
  error
});

const removeStash = flavor => ({
  type: types.REMOVE_FROM_STASH,
  flavor
});

const removeStashSuccess = () => ({
  type: types.REMOVE_FROM_STASH_SUCCESS
});

const removeStashFailure = error => ({
  type: types.REMOVE_FROM_STASH_FAILURE,
  error
});

const updateStash = flavor => ({
  type: types.UPDATE_STASH,
  flavor
});

const updateStashSuccess = () => ({
  type: types.UPDATE_STASH_SUCCESS
});

const updateStashFailure = error => ({
  type: types.UPDATE_STASH_FAILURE,
  error
});

export const actions = {
  requestStash,
  requestStashSuccess,
  requestStashFailure,
  addStash,
  addStashSuccess,
  addStashFailure,
  removeStash,
  removeStashSuccess,
  removeStashFailure,
  updateStash,
  updateStashSuccess,
  updateStashFailure
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
    case types.ADD_TO_STASH_SUCCESS:
      return {
        ...state,
        loaded: false
      };
    case types.ADD_TO_STASH_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.REMOVE_FROM_STASH_SUCCESS:
      return {
        ...state,
        loaded: false
      };
    case types.REMOVE_FROM_STASH_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.UPDATE_STASH_SUCCESS:
      return {
        ...state,
        loaded: false
      };
    case types.UPDATE_STASH_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
