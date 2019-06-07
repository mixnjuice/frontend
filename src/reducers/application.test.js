import { reducer, types, actions, initialState } from './application';

describe('application reducer', () => {
  it('has INIT_APP action', () => {
    expect(actions.initApp()).toEqual({
      type: types.INIT_APP
    });
  });

  it('reduces INIT_APP action', () => {
    const action = actions.initApp();

    expect(reducer({}, action)).toEqual({});
  });

  it('has LOGIN_USER action', () => {
    const emailAddress = 'test@test.org';
    const password = 'excellent';

    expect(actions.loginUser(emailAddress, password)).toEqual({
      type: types.LOGIN_USER,
      emailAddress,
      password
    });
  });

  it('reduces LOGIN_USER action', () => {
    const action = actions.loginUser();

    expect(reducer({}, action)).toEqual({ loggingIn: true });
  });

  it('has LOGIN_USER_SUCCESS action', () => {
    const user = { id: 123, name: 'Dave' };

    expect(actions.loginUserSuccess(user)).toEqual({
      type: types.LOGIN_USER_SUCCESS,
      user
    });
  });

  it('reduces LOGIN_USER_SUCCESS action', () => {
    const user = { id: 123, name: 'Dave' };
    const action = actions.loginUserSuccess(user);

    expect(reducer({}, action)).toEqual({
      loggingIn: false,
      user
    });
  });

  it('has LOGIN_USER_FAILURE action', () => {
    const error = { message: 'Nope' };

    expect(actions.loginUserFailure(error)).toEqual({
      type: types.LOGIN_USER_FAILURE,
      error
    });
  });

  it('reduces LOGIN_USER_FAILURE action', () => {
    const error = { message: 'Nope' };
    const action = actions.loginUserFailure(error);

    expect(reducer({}, action)).toEqual({
      loggingIn: false,
      loggingOut: false,
      error
    });
  });

  it('has LOGOUT_USER action', () => {
    expect(actions.logoutUser()).toEqual({
      type: types.LOGOUT_USER
    });
  });

  it('reduces LOGOUT_USER action', () => {
    const action = actions.logoutUser();

    expect(reducer({}, action)).toEqual({ loggingOut: true });
  });

  it('has LOGOUT_USER_SUCCESS action', () => {
    expect(actions.logoutUserSuccess()).toEqual({
      type: types.LOGOUT_USER_SUCCESS
    });
  });

  it('reduces LOGOUT_USER_SUCCESS action', () => {
    const action = actions.logoutUserSuccess();

    expect(reducer({ user: 1 }, action)).toEqual({
      loggingOut: false,
      user: null
    });
  });

  it('has LOGOUT_USER_FAILURE action', () => {
    const error = { message: 'Nope' };

    expect(actions.logoutUserFailure(error)).toEqual({
      type: types.LOGOUT_USER_FAILURE,
      error
    });
  });

  it('reduces LOGOUT_USER_FAILURE action', () => {
    const error = { message: 'Nope' };
    const action = actions.logoutUserFailure(error);

    expect(reducer({}, action)).toEqual({
      loggingIn: false,
      loggingOut: false,
      error
    });
  });

  it('has REGISTER_USER action', () => {
    const details = {
      name: 'Someone',
      emailAddress: 'test@test.org'
    };

    expect(actions.registerUser(details)).toEqual({
      type: types.REGISTER_USER,
      details
    });
  });

  it('reduces REGISTER_USER action', () => {
    const action = actions.registerUser();

    expect(reducer({}, action)).toEqual({
      registration: { registering: true }
    });
  });

  it('has REGISTER_USER_SUCCESS action', () => {
    expect(actions.registerUserSuccess()).toEqual({
      type: types.REGISTER_USER_SUCCESS
    });
  });

  it('reduces REGISTER_USER_SUCCESS action', () => {
    const action = actions.registerUserSuccess();

    expect(reducer({}, action)).toEqual({
      registration: { registering: false, complete: true, error: null }
    });
  });

  it('has REGISTER_USER_FAILURE action', () => {
    const error = { message: 'Nope' };

    expect(actions.registerUserFailure(error)).toEqual({
      type: types.REGISTER_USER_FAILURE,
      error
    });
  });

  it('reduces REGISTER_USER_FAILURE action', () => {
    const error = { message: 'Nope' };
    const action = actions.registerUserFailure(error);

    expect(reducer({}, action)).toEqual({
      registration: { registering: false, complete: true, error }
    });
  });

  it('handles default case', () => {
    const test = { value: 'something' };

    expect(reducer()).toEqual(initialState);
    expect(reducer(test)).toBe(test);
  });
});
