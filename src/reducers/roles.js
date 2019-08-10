import { buildActions } from 'utils';

export const types = buildActions('roles', [
  'REQUEST_ROLES',
  'REQUEST_ROLES_SUCCESS',
  'REQUEST_ROLES_FAILURE',
  'ADD_ROLE',
  'ADD_ROLE_FAILURE',
  'REQUEST_ROLE_USERS',
  'REQUEST_ROLE_USERS_SUCCESS',
  'REQUEST_ROLE_USERS_FAILURE',
  'ADD_ROLE_USER',
  'ADD_ROLE_USER_FAILURE'
]);

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

const addRole = ({ name }) => ({
  type: types.ADD_ROLE,
  name
});

const addRoleFailure = error => ({
  type: types.ADD_ROLE_FAILURE,
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

const addRoleUser = ({ userId, roleId, active }) => ({
  type: types.ADD_ROLE_USER,
  userId,
  roleId,
  active
});

const addRoleUserFailure = error => ({
  type: types.ADD_ROLE_USER_FAILURE,
  error
});

export const actions = {
  requestRoles,
  requestRolesSuccess,
  requestRolesFailure,
  addRole,
  addRoleFailure,
  requestRoleUsers,
  requestRoleUsersSuccess,
  requestRoleUsersFailure,
  addRoleUser,
  addRoleUserFailure
};

export const initialState = {
  error: null,
  roles: [],
  roleUsers: []
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.roles
      };
    case types.REQUEST_ROLES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.ADD_ROLE_FAILURE:
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
    case types.ADD_ROLE_USER_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
