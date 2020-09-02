import { reducer, types, actions } from './vendor';

describe('vendors reducer', () => {
  const name = 'Yummies';
  const vendorId = 10000;
  const slug = 'yummies';
  const code = 'YUK';
  const error = { message: 'Failed' };
  const vendor = {
    id: vendorId,
    name,
    slug,
    code
  };
  const details = vendor;

  const vendors = { ...vendor };

  it('has REQUEST_VENDOR action', () => {
    expect(actions.requestVendor(vendorId)).toEqual({
      type: types.REQUEST_VENDOR,
      vendorId
    });
  });

  it('reduces REQUEST_VENDOR action', () => {
    const action = actions.requestVendor(vendorId);

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_VENDOR_SUCCESS action', () => {
    expect(actions.requestVendorSuccess(vendor)).toEqual({
      type: types.REQUEST_VENDOR_SUCCESS,
      vendor
    });
  });

  it('reduces REQUEST_VENDOR_SUCCESS action', () => {
    const action = actions.requestVendorSuccess(vendors);

    expect(reducer({}, action)).toEqual({
      collection: {
        ...vendor
      }
    });
  });
  it('has REQUEST_FAILURE action', () => {
    expect(actions.requestFailure(error)).toEqual({
      type: types.REQUEST_FAILURE,
      error
    });
  });

  it('reduces REQUEST_FAILURE action', () => {
    const action = actions.requestFailure(error);

    expect(reducer({}, action)).toEqual({
      error
    });
  });

  it('has CREATE_VENDOR action', () => {
    expect(actions.createVendor(details)).toEqual({
      type: types.CREATE_VENDOR,
      details
    });
  });

  it('reduces CREATE_VENDOR action', () => {
    const action = actions.createVendor(details);

    expect(reducer({}, action)).toEqual({});
  });

  it('has UPDATE_VENDOR action', () => {
    expect(actions.updateVendor(details)).toEqual({
      type: types.UPDATE_VENDOR,
      details
    });
  });

  it('reduces UPDATE_VENDOR action', () => {
    const action = actions.updateVendor(details);

    expect(reducer({}, action)).toEqual({});
  });

  it('has DELETE_VENDOR action', () => {
    expect(actions.deleteVendor({ vendorId, name })).toEqual({
      type: types.DELETE_VENDOR,
      vendorId,
      name
    });
  });

  it('reduces DELETE_VENDOR action', () => {
    const action = actions.deleteVendor({});

    expect(reducer({}, action)).toEqual({});
  });
});
