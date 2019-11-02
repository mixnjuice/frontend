import { buildActions } from 'utils';

export const types = buildActions('roles', [
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
  'DELETE_ROLE_USER_FAILURE',
  'CLEAR_COLLECTION'
]);

const requestRoles = pager => ({
  type: types.REQUEST_ROLES,
  pager
});

const requestRolesSuccess = (roles, pager) => ({
  type: types.REQUEST_ROLES_SUCCESS,
  roles,
  pager
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

const clearCollection = () => ({
  type: types.CLEAR_COLLECTION
});

export const actions = {
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
  deleteRoleUserFailure,
  clearCollection
};

export const initialState = {
  error: null,
  collection: {
    cache: [],
    roles: [],
    pager: {
      count: null,
      limit: 100,
      page: 1,
      pages: null
    }
  },
  roleUsers: []
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_ROLES_SUCCESS:
      return {
        ...state,
        collection: {
          cache: action.roles,
          roles: action.roles[action.pager.page],
          pager: {
            ...state.pager,
            ...action.pager
          }
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
    case types.CLEAR_COLLECTION:
      return {
        ...state,
        collection: {
          ...initialState.collection
        }
      };
    default:
      return state;
  }
};
