import { buildActions } from 'utils';

export const types = buildActions('flavors', [
  'REQUEST_FLAVORS',
  'REQUEST_FLAVORS_SUCCESS',
  'REQUEST_FLAVORS_FAILURE'
]);

const requestFlavors = () => ({
  type: types.REQUEST_FLAVORS
});

const requestFlavorsSuccess = flavors => ({
  type: types.REQUEST_FLAVORS_SUCCESS,
  flavors
});

const requestFlavorsFailure = error => ({
  type: types.REQUEST_FLAVORS_FAILURE,
  error
});

export const actions = {
  requestFlavors,
  requestFlavorsSuccess,
  requestFlavorsFailure
};

export const initialState = {
  flavors: []
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_FLAVORS_SUCCESS:
      return {
        ...state,
        flavors: action.flavors
      };
    case types.REQUEST_FLAVORS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
