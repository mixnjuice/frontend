import { reducer, types, actions } from './users';

describe('roles reducer', () => {
  const roles = { role: true };
  const userId = 63;
  const user = { user: true };
  const users = { user: true };
  const error = { message: 'Failed' };

  it('has REQUEST_USERS action', () => {
    expect(actions.requestUsers()).toEqual({
      type: types.REQUEST_USERS
    });
  });

  it('reduces REQUEST_USERS action', () => {
    const action = actions.requestUsers();

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_USERS_SUCCESS action', () => {
    expect(actions.requestUsersSuccess(users)).toEqual({
      type: types.REQUEST_USERS_SUCCESS,
      users
    });
  });

  it('reduces REQUEST_USERS_SUCCESS action', () => {
    const action = actions.requestUsersSuccess(users);

    expect(reducer({}, action)).toEqual({ users });
  });

  it('has REQUEST_USERS_FAILURE action', () => {
    expect(actions.requestUsersFailure(error)).toEqual({
      type: types.REQUEST_USERS_FAILURE,
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
});
