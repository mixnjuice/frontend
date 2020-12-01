import { buildActions } from 'utils';

export const types = buildActions('flavors', [
  'REQUEST_FLAVORS',
  'REQUEST_FLAVORS_SUCCESS',
  'REQUEST_FLAVORS_FAILURE'
]);

const requestFlavors = (filter) => ({
  type: types.REQUEST_FLAVORS,
  payload: {
    filter
  }
});

const requestFlavorsSuccess = (collection) => ({
  type: types.REQUEST_FLAVORS_SUCCESS,
  payload: {
    collection
  }
});

const requestFlavorsFailure = (error) => ({
  type: types.REQUEST_FLAVORS_FAILURE,
  payload: {
    error
  }
});

export const actions = {
  requestFlavors,
  requestFlavorsSuccess,
  requestFlavorsFailure
};

export const initialState = {
  collection: [],
  loading: false,
  loaded: false,
  filter: ''
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_FLAVORS:
      return {
        ...state,
        ...action.payload,
        loading: true,
        loaded: false
      };
    case types.REQUEST_FLAVORS_FAILURE:
    case types.REQUEST_FLAVORS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        loaded: true
      };
    default:
      return state;
  }
};
