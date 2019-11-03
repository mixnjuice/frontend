import { reducer, types, actions } from './users';

describe('users reducer', () => {
  const roles = { role: true };
  const user = [true];
  const userId = 63;
  const error = { message: 'Failed' };
  const pager = {
    count: 100,
    limit: 20,
    page: 1,
    pages: 5
  };
  const users = [];
  const cache = [];

  it('has REQUEST_USERS action', () => {
    expect(actions.requestUsers(pager)).toEqual({
      type: types.REQUEST_USERS,
      pager
    });
  });

  it('reduces REQUEST_USERS action', () => {
    const action = actions.requestUsers(pager);

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_USERS_SUCCESS action', () => {
    expect(actions.requestUsersSuccess(users, pager)).toEqual({
      type: types.REQUEST_USERS_SUCCESS,
      users,
      pager
    });
  });

  it('reduces REQUEST_USERS_SUCCESS action', () => {
    const action = actions.requestUsersSuccess(users, pager);
    const mockState = {
      cache: [],
      pager
    };

    expect(reducer(mockState, action)).toEqual({
      cache,
      pager
    });
  });

  it('has REQUEST_USERS_FAILURE action', () => {
    expect(actions.requestUsersFailure(error)).toEqual({
      type: types.REQUEST_USERS_FAILURE,
      error
    });
  });

  it('reduces REQUEST_USERS_FAILURE action', () => {
    const action = actions.requestUsersFailure(error);

    expect(reducer({}, action)).toEqual({
      error
    });
  });

  it('has REQUEST_USER action', () => {
    expect(actions.requestUser({ userId })).toEqual({
      type: types.REQUEST_USER,
      userId
    });
  });

  it('reduces REQUEST_USER action', () => {
    const action = actions.requestUser({ userId });

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_USER_SUCCESS action', () => {
    expect(actions.requestUserSuccess(user)).toEqual({
      type: types.REQUEST_USER_SUCCESS,
      user
    });
  });

  it('reduces REQUEST_USER_SUCCESS action', () => {
    const action = actions.requestUserSuccess(user);

    expect(reducer({}, action)).toEqual({ user });
  });

  it('has REQUEST_USER_FAILURE action', () => {
    expect(actions.requestUserFailure(error)).toEqual({
      type: types.REQUEST_USER_FAILURE,
      error
    });
  });

  it('reduces REQUEST_USER_FAILURE action', () => {
    const action = actions.requestUserFailure(error);

    expect(reducer({}, action)).toEqual({
      error
    });
  });

  it('has REQUEST_USER_ROLES action', () => {
    expect(actions.requestUserRoles({ userId })).toEqual({
      type: types.REQUEST_USER_ROLES,
      userId
    });
  });

  it('reduces REQUEST_USER_ROLES action', () => {
    const action = actions.requestUserRoles({ userId });

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_USER_ROLES_SUCCESS action', () => {
    expect(actions.requestUserRolesSuccess(roles)).toEqual({
      type: types.REQUEST_USER_ROLES_SUCCESS,
      roles
    });
  });

  it('reduces REQUEST_USER_ROLES_SUCCESS action', () => {
    const action = actions.requestUserRolesSuccess(roles);

    expect(reducer({}, action)).toEqual({ roles });
  });

  it('has REQUEST_USER_ROLES_FAILURE action', () => {
    expect(actions.requestUserRolesFailure(error)).toEqual({
      type: types.REQUEST_USER_ROLES_FAILURE,
      error
    });
  });

  it('reduces REQUEST_USER_ROLES_FAILURE action', () => {
    const action = actions.requestUserRolesFailure(error);

    expect(reducer({}, action)).toEqual({
      error
    });
  });
});
