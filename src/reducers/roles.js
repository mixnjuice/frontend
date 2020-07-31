import { buildActions } from 'utils';

export const types = buildActions('roles', [
  'REQUEST_ROLES',
  'REQUEST_ROLES_SUCCESS',
  'CREATE_ROLE',
  'UPDATE_ROLE',
  'DELETE_ROLE',
  'REQUEST_ROLE_USERS',
  'REQUEST_ROLE_USERS_SUCCESS',
  'CREATE_ROLE_USER',
  'DELETE_ROLE_USER',
  'REQUEST_FAILURE',
  'CLEAR_COLLECTION'
]);

const requestRoles = (pager) => ({
  type: types.REQUEST_ROLES,
  pager
});

const requestRolesSuccess = (roles, pager) => ({
  type: types.REQUEST_ROLES_SUCCESS,
  roles,
  pager
});

const createRole = ({ name }) => ({
  type: types.CREATE_ROLE,
  name
});

const updateRole = ({ roleId, name }) => ({
  type: types.UPDATE_ROLE,
  roleId,
  name
});

const deleteRole = ({ roleId, name }) => ({
  type: types.DELETE_ROLE,
  roleId,
  name
});

const requestRoleUsers = ({ roleId }) => ({
  type: types.REQUEST_ROLE_USERS,
  roleId
});

const requestRoleUsersSuccess = (roleUsers) => ({
  type: types.REQUEST_ROLE_USERS_SUCCESS,
  roleUsers
});

const createRoleUser = ({ userId, roleId, active }) => ({
  type: types.CREATE_ROLE_USER,
  userId,
  roleId,
  active
});

const deleteRoleUser = ({ userId, roleId, name }) => ({
  type: types.DELETE_ROLE_USER,
  userId,
  roleId,
  name
});

const requestFailure = (error) => ({
  type: types.REQUEST_FAILURE,
  error
});

const clearCollection = () => ({
  type: types.CLEAR_COLLECTION
});

export const actions = {
  requestRoles,
  requestRolesSuccess,
  createRole,
  updateRole,
  deleteRole,
  requestRoleUsers,
  requestRoleUsersSuccess,
  createRoleUser,
  deleteRoleUser,
  requestFailure,
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
    case types.REQUEST_ROLE_USERS_SUCCESS:
      return {
        ...state,
        roleUsers: action.roleUsers
      };
    case types.REQUEST_FAILURE:
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
