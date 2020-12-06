import { reducer, types, actions } from './flavors';

describe('flavors reducer', () => {
  const collection = [];
  const filter = 'test';
  const error = { message: 'Failed' };

  it('has REQUEST_FLAVORS action', () => {
    expect(actions.requestFlavors(filter)).toEqual({
      type: types.REQUEST_FLAVORS,
      payload: {
        filter
      }
    });
  });

  it('reduces REQUEST_FLAVORS action', () => {
    const action = actions.requestFlavors(filter);

    expect(reducer({}, action)).toEqual({
      filter,
      loading: true,
      loaded: false
    });
  });

  it('has REQUEST_FLAVORS_SUCCESS action', () => {
    expect(actions.requestFlavorsSuccess(collection)).toEqual({
      type: types.REQUEST_FLAVORS_SUCCESS,
      payload: {
        collection
      }
    });
  });

  it('reduces REQUEST_FLAVORS_SUCCESS action', () => {
    const action = actions.requestFlavorsSuccess(collection);

    expect(reducer({}, action)).toEqual({
      loaded: true,
      loading: false,
      collection
    });
  });

  it('has REQUEST_FLAVORS_FAILURE action', () => {
    expect(actions.requestFlavorsFailure(error)).toEqual({
      type: types.REQUEST_FLAVORS_FAILURE,
      payload: {
        error
      }
    });
  });

  it('reduces REQUEST_FLAVORS_FAILURE action', () => {
    const action = actions.requestFlavorsFailure(error);

    expect(reducer({}, action)).toEqual({
      loaded: true,
      loading: false,
      error
    });
  });
});
