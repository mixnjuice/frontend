import { reducer, types, actions } from './flavors';

describe('flavors reducer', () => {
  const flavors = [true];
  const cache = [true];
  const pager = {
    count: 100,
    limit: 20,
    page: 1,
    pages: 5
  };
  const collection = undefined;
  const error = { message: 'Failed' };

  it('has REQUEST_FLAVORS action', () => {
    expect(actions.requestFlavors(pager)).toEqual({
      type: types.REQUEST_FLAVORS,
      pager
    });
  });

  it('reduces REQUEST_FLAVORS action', () => {
    const action = actions.requestFlavors(pager);

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_FLAVORS_SUCCESS action', () => {
    expect(actions.requestFlavorsSuccess(flavors, pager)).toEqual({
      type: types.REQUEST_FLAVORS_SUCCESS,
      flavors,
      pager
    });
  });

  it('reduces REQUEST_FLAVORS_SUCCESS action', () => {
    const action = actions.requestFlavorsSuccess(flavors, pager);

    expect(reducer({}, action)).toEqual({ cache, collection, pager });
  });

  it('has REQUEST_FLAVORS_FAILURE action', () => {
    expect(actions.requestFlavorsFailure(error)).toEqual({
      type: types.REQUEST_FLAVORS_FAILURE,
      error
    });
  });

  it('reduces REQUEST_FLAVORS_FAILURE action', () => {
    const action = actions.requestFlavorsFailure(error);

    expect(reducer({}, action)).toEqual({ error });
  });
});
