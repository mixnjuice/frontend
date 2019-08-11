import { buildActions } from 'utils';

export const types = buildActions('users', [
  'REQUEST_USERS',
  'REQUEST_USERS_SUCCESS',
  'REQUEST_USERS_FAILURE',
  'REQUEST_USER',
  'REQUEST_USER_SUCCESS',
  'REQUEST_USER_FAILURE',
  'REQUEST_USER_ROLES',
  'REQUEST_USER_ROLES_SUCCESS',
  'REQUEST_USER_ROLES_FAILURE'
]);

const requestUsers = () => ({
  type: types.REQUEST_USERS
});

const requestUsersSuccess = users => ({
  type: types.REQUEST_USERS_SUCCESS,
  users
});

const requestUsersFailure = error => ({
  type: types.REQUEST_USERS_FAILURE,
  error
});

const requestUser = ({ userId }) => ({
  type: types.REQUEST_USER,
  userId
});

const requestUserSuccess = user => ({
  type: types.REQUEST_USER_SUCCESS,
  user
});

const requestUserFailure = error => ({
  type: types.REQUEST_USER_FAILURE,
  error
});

const requestUserRoles = ({ userId }) => ({
  type: types.REQUEST_USER_ROLES,
  userId
});

const requestUserRolesSuccess = roles => ({
  type: types.REQUEST_USER_ROLES_SUCCESS,
  roles
});

const requestUserRolesFailure = error => ({
  type: types.REQUEST_USER_ROLES_FAILURE,
  error
});

export const actions = {
  requestUsers,
  requestUsersSuccess,
  requestUsersFailure,
  requestUser,
  requestUserSuccess,
  requestUserFailure,
  requestUserRoles,
  requestUserRolesSuccess,
  requestUserRolesFailure
};

export const initialState = {
  users: [],
  roles: []
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_USERS_SUCCESS:
      return {
        ...state,
        users: action.users
      };
    case types.REQUEST_USERS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.REQUEST_USER_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case types.REQUEST_USER_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.REQUEST_USER_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.roles
      };
    case types.REQUEST_USER_ROLES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
