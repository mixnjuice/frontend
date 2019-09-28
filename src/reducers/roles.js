import { buildActions } from 'utils';

export const types = buildActions('roles', [
  'RESET_LOADED',
  'REQUEST_ROLES',
  'REQUEST_ROLES_SUCCESS',
  'REQUEST_ROLES_FAILURE',
  'CREATE_ROLE',
  'CREATE_ROLE_FAILURE',
  'UPDATE_ROLE',
  'UPDATE_ROLE_FAILURE',
  'DELETE_ROLE',
  'DELETE_ROLE_FAILURE',
  'REQUEST_ROLE_USERS',
  'REQUEST_ROLE_USERS_SUCCESS',
  'REQUEST_ROLE_USERS_FAILURE',
  'CREATE_ROLE_USER',
  'CREATE_ROLE_USER_FAILURE',
  'DELETE_ROLE_USER',
  'DELETE_ROLE_USER_FAILURE'
]);

const resetLoaded = unload => ({
  type: types.RESET_LOADED,
  unload
});

const requestRoles = () => ({
  type: types.REQUEST_ROLES
});

const requestRolesSuccess = roles => ({
  type: types.REQUEST_ROLES_SUCCESS,
  roles
});

const requestRolesFailure = error => ({
  type: types.REQUEST_ROLES_FAILURE,
  error
});

const createRole = ({ name }) => ({
  type: types.CREATE_ROLE,
  name
});

const createRoleFailure = error => ({
  type: types.CREATE_ROLE_FAILURE,
  error
});

const updateRole = ({ roleId, name }) => ({
  type: types.UPDATE_ROLE,
  roleId,
  name
});

const updateRoleFailure = error => ({
  type: types.UPDATE_ROLE_FAILURE,
  error
});

const deleteRole = ({ roleId, name }) => ({
  type: types.DELETE_ROLE,
  roleId,
  name
});

const deleteRoleFailure = error => ({
  type: types.DELETE_ROLE_FAILURE,
  error
});

const requestRoleUsers = ({ roleId }) => ({
  type: types.REQUEST_ROLE_USERS,
  roleId
});

const requestRoleUsersSuccess = roleUsers => ({
  type: types.REQUEST_ROLE_USERS_SUCCESS,
  roleUsers
});

const requestRoleUsersFailure = error => ({
  type: types.REQUEST_ROLE_USERS_FAILURE,
  error
});

const createRoleUser = ({ userId, roleId, active }) => ({
  type: types.CREATE_ROLE_USER,
  userId,
  roleId,
  active
});

const createRoleUserFailure = error => ({
  type: types.CREATE_ROLE_USER_FAILURE,
  error
});

const deleteRoleUser = ({ userId, roleId, name }) => ({
  type: types.DELETE_ROLE_USER,
  userId,
  roleId,
  name
});

const deleteRoleUserFailure = error => ({
  type: types.DELETE_ROLE_USER_FAILURE,
  error
});

export const actions = {
  resetLoaded,
  requestRoles,
  requestRolesSuccess,
  requestRolesFailure,
  createRole,
  createRoleFailure,
  updateRole,
  updateRoleFailure,
  deleteRole,
  deleteRoleFailure,
  requestRoleUsers,
  requestRoleUsersSuccess,
  requestRoleUsersFailure,
  createRoleUser,
  createRoleUserFailure,
  deleteRoleUser,
  deleteRoleUserFailure
};

export const initialState = {
  error: null,
  roles: [],
  roleUsers: [],
  loaded: {
    roles: false,
    users: false,
    role: {},
    user: {}
  }
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.RESET_LOADED:
      if (action.unload === 'roles') {
        return {
          ...state,
          loaded: {
            ...state.loaded,
            roles: false
          }
        };
      }
      // unload == 'users'
      return {
        ...state,
        loaded: {
          ...state.loaded,
          users: false
        }
      };
    case types.REQUEST_ROLES_SUCCESS:
      if (state.loaded.roles) {
        return {
          ...state,
          roles: state.roles
        };
      }
      return {
        ...state,
        roles: action.roles,
        loaded: {
          ...state.loaded,
          roles: true
        }
      };
    case types.REQUEST_ROLES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.CREATE_ROLE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.UPDATE_ROLE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.DELETE_ROLE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.REQUEST_ROLE_USERS_SUCCESS:
      return {
        ...state,
        roleUsers: action.roleUsers
      };
    case types.REQUEST_ROLE_USERS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.CREATE_ROLE_USER_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.DELETE_ROLE_USER_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
