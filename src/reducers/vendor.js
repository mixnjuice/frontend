import { buildActions } from 'utils';

export const types = buildActions('vendor', [
  'REQUEST_VENDOR',
  'REQUEST_VENDOR_SUCCESS',
  'CREATE_VENDOR',
  'DELETE_VENDOR',
  'UPDATE_VENDOR',
  'REQUEST_FAILURE'
]);

const requestVendor = vendorId => ({
  type: types.REQUEST_VENDOR,
  vendorId
});

const requestVendorSuccess = vendor => ({
  type: types.REQUEST_VENDOR_SUCCESS,
  vendor
});

const createVendor = details => ({
  type: types.CREATE_VENDOR,
  details
});

const deleteVendor = ({ vendorId, name }) => ({
  type: types.DELETE_VENDOR,
  vendorId,
  name
});

const updateVendor = details => ({
  type: types.UPDATE_VENDOR,
  details
});

const requestFailure = error => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestVendor,
  requestVendorSuccess,
  createVendor,
  deleteVendor,
  updateVendor,
  requestFailure
};

export const initialState = {
  error: null,
  collection: {}
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_VENDOR_SUCCESS:
      return {
        ...state,
        collection: action.vendor
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
