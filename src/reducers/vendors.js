import { buildActions } from 'utils';

export const types = buildActions('vendors', [
  'REQUEST_VENDORS',
  'REQUEST_VENDORS_SUCCESS',
  'REQUEST_FAILURE'
]);

const requestVendors = (pager) => ({
  type: types.REQUEST_VENDORS,
  pager
});

const requestVendorsSuccess = (vendors, pager) => ({
  type: types.REQUEST_VENDORS_SUCCESS,
  vendors,
  pager
});

const requestFailure = (error) => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestVendors,
  requestVendorsSuccess,
  requestFailure
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
    case types.REQUEST_VENDORS_SUCCESS:
      return {
        ...state,
        cache: action.vendors,
        collection: action.vendors[action.pager.page],
        pager: {
          ...state.pager,
          ...action.pager
        }
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
