import { reducer, types, actions } from './roles';

describe('roles reducer', () => {
  const roles = [{ role: true }];
  const name = 'Luser';
  const roleId = 10000;
  const userId = 57;
  const active = true;
  const roleUsers = { roleUsers: [{ roleUser: true }] };
  const error = { message: 'Failed' };

  it('has REQUEST_ROLES action', () => {
    expect(actions.requestRoles()).toEqual({
      type: types.REQUEST_ROLES
    });
  });

  it('reduces REQUEST_ROLES action', () => {
    const action = actions.requestRoles();

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_ROLES_SUCCESS action', () => {
    expect(actions.requestRolesSuccess(roles)).toEqual({
      type: types.REQUEST_ROLES_SUCCESS,
      roles
    });
  });

  it('reduces REQUEST_ROLES_SUCCESS action', () => {
    const action = actions.requestRolesSuccess(roles);

    expect(reducer({}, action)).toEqual({ roles });
  });

  it('has REQUEST_ROLES_FAILURE action', () => {
    expect(actions.requestRolesFailure(error)).toEqual({
      type: types.REQUEST_ROLES_FAILURE,
      error
    });
  });

  it('has CREATE_ROLE action', () => {
    expect(actions.createRole({ name })).toEqual({
      type: types.CREATE_ROLE,
      name
    });
  });

  it('reduces CREATE_ROLE action', () => {
    const action = actions.createRole({ name });

    expect(reducer({}, action)).toEqual({});
  });

  it('has CREATE_ROLE_FAILURE action', () => {
    expect(actions.createRoleFailure(error)).toEqual({
      type: types.CREATE_ROLE_FAILURE,
      error
    });
  });

  it('has UPDATE_ROLE action', () => {
    expect(actions.updateRole({ roleId, name })).toEqual({
      type: types.UPDATE_ROLE,
      roleId,
      name
    });
  });

  it('reduces UPDATE_ROLE action', () => {
    const action = actions.updateRole({ roleId, name });

    expect(reducer({}, action)).toEqual({});
  });

  it('has UPDATE_ROLE_FAILURE action', () => {
    expect(actions.updateRoleFailure(error)).toEqual({
      type: types.UPDATE_ROLE_FAILURE,
      error
    });
  });

  it('has DELETE_ROLE action', () => {
    expect(actions.deleteRole({ roleId, name })).toEqual({
      type: types.DELETE_ROLE,
      roleId,
      name
    });
  });

  it('reduces DELETE_ROLE action', () => {
    const action = actions.deleteRole({});

    expect(reducer({}, action)).toEqual({});
  });

  it('has DELETE_ROLE_FAILURE action', () => {
    expect(actions.deleteRoleFailure(error)).toEqual({
      type: types.DELETE_ROLE_FAILURE,
      error
    });
  });

  it('has REQUEST_ROLE_USERS action', () => {
    expect(actions.requestRoleUsers({ roleId })).toEqual({
      type: types.REQUEST_ROLE_USERS,
      roleId
    });
  });

  it('reduces REQUEST_ROLE_USERS action', () => {
    const action = actions.requestRoleUsers({ roleId });

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_ROLE_USERS_SUCCESS action', () => {
    expect(actions.requestRoleUsersSuccess(roleUsers)).toEqual({
      type: types.REQUEST_ROLE_USERS_SUCCESS,
      roleUsers
    });
  });

  it('reduces REQUEST_ROLE_USERS_SUCCESS action', () => {
    const action = actions.requestRoleUsersSuccess(roleUsers);

    expect(reducer({}, action)).toEqual({ roleUsers });
  });

  it('has REQUEST_ROLE_USERS_FAILURE action', () => {
    expect(actions.requestRoleUsersFailure(error)).toEqual({
      type: types.REQUEST_ROLE_USERS_FAILURE,
      error
    });
  });

  it('has CREATE_ROLE_USER action', () => {
    expect(actions.createRoleUser({ userId, roleId, active })).toEqual({
      type: types.CREATE_ROLE_USER,
      userId,
      roleId,
      active
    });
  });

  it('reduces CREATE_ROLE_USER action', () => {
    const action = actions.createRoleUser({ userId, roleId, active });

    expect(reducer({}, action)).toEqual({});
  });

  it('has CREATE_ROLE_USER_FAILURE action', () => {
    expect(actions.createRoleUserFailure(error)).toEqual({
      type: types.CREATE_ROLE_USER_FAILURE,
      error
    });
  });

  it('has DELETE_ROLE_USER action', () => {
    expect(actions.deleteRoleUser({ userId, roleId, name })).toEqual({
      type: types.DELETE_ROLE_USER,
      userId,
      roleId,
      name
    });
  });

  it('reduces DELETE_ROLE_USER action', () => {
    const action = actions.deleteRoleUser({ userId, roleId, name });

    expect(reducer({}, action)).toEqual({});
  });

  it('has DELETE_ROLE_USER_FAILURE action', () => {
    expect(actions.deleteRoleUserFailure(error)).toEqual({
      type: types.DELETE_ROLE_USER_FAILURE,
      error
    });
  });
});
