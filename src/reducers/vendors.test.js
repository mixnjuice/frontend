import { reducer, types, actions } from './vendors';

describe('vendors reducer', () => {
  const error = { message: 'Failed' };
  const pager = {
    count: 100,
    limit: 20,
    page: 1,
    pages: 5
  };

  const vendors = [
    { id: 1, name: 'Baker Flavors', slug: 'baker-flavors', code: 'BF' },
    { id: 20, name: 'Flavorah', slug: 'flavorah', code: 'FLV' }
  ];

  const collection = {
    id: 20,
    name: 'Flavorah',
    slug: 'flavorah',
    code: 'FLV'
  };

  it('has REQUEST_VENDORS action', () => {
    expect(actions.requestVendors(pager)).toEqual({
      type: types.REQUEST_VENDORS,
      pager
    });
  });

  it('reduces REQUEST_VENDORS action', () => {
    const action = actions.requestVendors(pager);

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_VENDORS_SUCCESS action', () => {
    expect(actions.requestVendorsSuccess(vendors, pager)).toEqual({
      type: types.REQUEST_VENDORS_SUCCESS,
      vendors,
      pager
    });
  });

  it('reduces REQUEST_VENDORS_SUCCESS action', () => {
    const action = actions.requestVendorsSuccess(vendors, pager);

    expect(reducer({}, action)).toEqual({
      cache: vendors,
      collection,
      pager
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
});
