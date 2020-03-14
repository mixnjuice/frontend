import { buildActions } from 'utils';

export const types = buildActions('flavors', [
  'REQUEST_FLAVORS',
  'REQUEST_FLAVORS_SUCCESS',
  'REQUEST_FLAVORS_FAILURE'
]);

const requestFlavors = pager => ({
  type: types.REQUEST_FLAVORS,
  pager
});

const requestFlavorsSuccess = (flavors, pager) => ({
  type: types.REQUEST_FLAVORS_SUCCESS,
  flavors,
  pager
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
  cache: [],
  collection: [],
  pager: {
    count: null,
    limit: 100,
    page: 1,
    pages: null
  }
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_FLAVORS_SUCCESS:
      return {
        ...state,
        cache: action.flavors,
        collection: action.flavors[action.pager.page],
        pager: {
          ...state.pager,
          ...action.pager
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
