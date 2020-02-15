import { reducer, types, actions } from './roles';

describe('roles reducer', () => {
  const name = 'Luser';
  const roleId = 10000;
  const userId = 57;
  const active = true;
  const roleUsers = { roleUsers: [{ roleUser: true }] };
  const error = { message: 'Failed' };
  const pager = {
    count: 100,
    limit: 20,
    page: 1,
    pages: 5
  };

  const roles = { collection: { cache: [true], roles: [true] } };

  it('has REQUEST_ROLES action', () => {
    expect(actions.requestRoles(pager)).toEqual({
      type: types.REQUEST_ROLES,
      pager
    });
  });

  it('reduces REQUEST_ROLES action', () => {
    const action = actions.requestRoles(pager);

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_ROLES_SUCCESS action', () => {
    expect(actions.requestRolesSuccess(roles, pager)).toEqual({
      type: types.REQUEST_ROLES_SUCCESS,
      roles,
      pager
    });
  });

  it('reduces REQUEST_ROLES_SUCCESS action', () => {
    const action = actions.requestRolesSuccess(roles, pager);

    expect(reducer({}, action)).toEqual({
      collection: {
        cache: {
          collection: {
            cache: [true],
            roles: [true]
          }
        },
        pager: {
          count: 100,
          limit: 20,
          page: 1,
          pages: 5
        }
      }
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

  it('reduces CLEAR_COLLECTION action', () => {
    const action = actions.clearCollection();

    expect(reducer({}, action)).toEqual({
      collection: {
        cache: [],
        roles: [],
        pager: {
          count: null,
          limit: 100,
          page: 1,
          pages: null
        }
      }
    });
  });
});
