import { reducer, types, actions } from './flavors';

describe('flavors reducer', () => {
  const flavors = [{ flavor: true }];
  const error = { message: 'Failed' };

  it('has REQUEST_FLAVORS action', () => {
    expect(actions.requestFlavors()).toEqual({
      type: types.REQUEST_FLAVORS
    });
  });

  it('reduces REQUEST_FLAVORS action', () => {
    const action = actions.requestFlavors();

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_FLAVORS_SUCCESS action', () => {
    expect(actions.requestFlavorsSuccess(flavors)).toEqual({
      type: types.REQUEST_FLAVORS_SUCCESS,
      flavors
    });
  });

  it('reduces REQUEST_FLAVORS_SUCCESS action', () => {
    const action = actions.requestFlavorsSuccess(flavors);

    expect(reducer({}, action)).toEqual({ flavors });
  });

  it('has REQUEST_FLAVORS_FAILURE action', () => {
    expect(actions.requestFlavorsFailure(error)).toEqual({
      type: types.REQUEST_FLAVORS_FAILURE,
      error
    });
  });
});
