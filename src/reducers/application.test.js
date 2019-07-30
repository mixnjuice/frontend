import dayjs from 'dayjs';
import { reducer, types, actions, initialState } from './application';

describe('application reducer', () => {
  const user = { id: 123, name: 'Dave' };
  const emailAddress = 'test@test.org';
  const password = 'excellent';
  const token = 'testing';
  const expiration = dayjs();
  const error = { message: 'Failed' };
  const toast = {
    id: 'test123',
    title: 'Testing',
    icon: 'heart',
    message: 'This is a test.'
  };

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

  it('has REQUEST_TOKEN action', () => {
    expect(actions.requestToken(emailAddress, password)).toEqual({
      type: types.REQUEST_TOKEN,
      emailAddress,
      password
    });
  });

  it('reduces REQUEST_TOKEN action', () => {
    const action = actions.requestToken();

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_TOKEN_SUCCESS action', () => {
    expect(actions.requestTokenSuccess({ token, expiration })).toEqual({
      type: types.REQUEST_TOKEN_SUCCESS,
      expiration,
      token
    });
  });

  it('reduces REQUEST_TOKEN_SUCCESS action', () => {
    const action = actions.requestTokenSuccess({ token, expiration });

    expect(reducer({}, action)).toEqual({
      authorization: {
        accessToken: token,
        expiration
      }
    });
  });

  it('has REQUEST_TOKEN_FAILURE action', () => {
    expect(actions.requestTokenFailure(error)).toEqual({
      type: types.REQUEST_TOKEN_FAILURE,
      error
    });
  });

  it('reduces REQUEST_TOKEN_FAILURE action', () => {
    const action = actions.requestTokenFailure(error);

    expect(reducer({}, action)).toEqual({
      authorization: {
        error
      }
    });
  });

  it('has REQUEST_CURRENT_USER action', () => {
    expect(actions.requestCurrentUser()).toEqual({
      type: types.REQUEST_CURRENT_USER
    });
  });

  it('reduces REQUEST_CURRENT_USER action', () => {
    const action = actions.requestCurrentUser();

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_CURRENT_USER_SUCCESS action', () => {
    expect(actions.requestCurrentUserSuccess(user)).toEqual({
      type: types.REQUEST_CURRENT_USER_SUCCESS,
      user
    });
  });

  it('reduces REQUEST_CURRENT_USER_SUCCESS action', () => {
    const action = actions.requestCurrentUserSuccess(user);

    expect(reducer({}, action)).toEqual({ user });
  });

  it('has REQUEST_CURRENT_USER_FAILURE action', () => {
    expect(actions.requestCurrentUserFailure(error)).toEqual({
      type: types.REQUEST_CURRENT_USER_FAILURE,
      error
    });
  });

  it('has LOGIN_USER_SUCCESS action', () => {
    expect(actions.loginUserSuccess(user)).toEqual({
      type: types.LOGIN_USER_SUCCESS,
      user
    });
  });

  it('reduces LOGIN_USER_SUCCESS action', () => {
    const action = actions.loginUserSuccess({ id: 123, name: 'Dave' });

    expect(reducer({}, action)).toEqual({
      loggingIn: false
    });
  });

  it('has LOGIN_USER_FAILURE action', () => {
    expect(actions.loginUserFailure(error)).toEqual({
      type: types.LOGIN_USER_FAILURE,
      error
    });
  });

  it('reduces LOGIN_USER_FAILURE action', () => {
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
    const mockState = {
      user: 1,
      authorization: {
        accessToken: 'testing'
      }
    };

    expect(reducer(mockState, action)).toEqual({
      loggingOut: false,
      user: null,
      authorization: initialState.authorization
    });
  });

  it('has LOGOUT_USER_FAILURE action', () => {
    expect(actions.logoutUserFailure(error)).toEqual({
      type: types.LOGOUT_USER_FAILURE,
      error
    });
  });

  it('reduces LOGOUT_USER_FAILURE action', () => {
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
    expect(actions.registerUserFailure(error)).toEqual({
      type: types.REGISTER_USER_FAILURE,
      error
    });
  });

  it('reduces REGISTER_USER_FAILURE action', () => {
    const action = actions.registerUserFailure(error);

    expect(reducer({}, action)).toEqual({
      registration: { registering: false, complete: true, error }
    });
  });

  it('has POP_TOAST action', () => {
    const action = actions.popToast(toast);

    expect(action).toEqual({
      type: types.POP_TOAST,
      toast
    });
  });

  it('has ADD_TOAST action', () => {
    const action = actions.addToast(toast);

    expect(action).toEqual({
      type: types.ADD_TOAST,
      toast
    });
  });

  it('reduces ADD_TOAST action', () => {
    const action = actions.addToast(toast);

    expect(reducer({ toasts: [] }, action)).toEqual({
      toasts: [toast]
    });
  });

  it('has REMOVE_TOAST action', () => {
    const { id } = toast;
    const action = actions.removeToast(id);

    expect(action).toEqual({
      type: types.REMOVE_TOAST,
      id
    });
  });

  it('reduces REMOVE_TOAST action', () => {
    const action = actions.removeToast(toast.id);

    expect(reducer({ toasts: [toast] }, action)).toEqual({
      toasts: []
    });
  });

  it('has HIDE_TOAST action', () => {
    const { id } = toast;
    const action = actions.hideToast(id);

    expect(action).toEqual({
      type: types.HIDE_TOAST,
      id
    });
  });

  it('reduces HIDE_TOAST action', () => {
    const action = actions.hideToast(toast.id);

    expect(reducer({ toasts: [toast] }, action)).toEqual({
      toasts: [{ ...toast, show: false }]
    });

    expect(reducer({ toasts: [] }, action)).toEqual({
      toasts: []
    });
  });

  it('handles default case', () => {
    const test = { value: 'something' };

    expect(reducer()).toEqual(initialState);
    expect(reducer(test)).toBe(test);
  });
});
