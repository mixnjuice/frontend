import { buildActions } from 'utils';

export const types = buildActions('flavors', [
  'RESET_LOADED',
  'REQUEST_FLAVORS',
  'REQUEST_FLAVORS_SUCCESS',
  'REQUEST_FLAVORS_FAILURE'
]);

const resetLoaded = unload => ({
  type: types.RESET_LOADED,
  unload
});

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
  resetLoaded,
  requestFlavors,
  requestFlavorsSuccess,
  requestFlavorsFailure
};

export const initialState = {
  flavors: [],
  loaded: {
    flavors: false
  }
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.RESET_LOADED:
      return {
        ...state,
        loaded: {
          ...state.loaded,
          flavors: false
        }
      };
    case types.REQUEST_FLAVORS_SUCCESS:
      if (state.loaded.flavors) {
        return {
          ...state,
          flavors: state.flavors
        };
      }
      return {
        ...state,
        flavors: action.flavors,
        loaded: {
          ...state.loaded,
          flavors: true
        }
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
