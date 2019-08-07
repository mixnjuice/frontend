import { buildActions } from 'utils';

export const types = buildActions('roles', [
  'REQUEST_ROLES',
  'REQUEST_ROLES_SUCCESS',
  'REQUEST_ROLES_FAILURE'
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

export const actions = {
  requestRoles,
  requestRolesSuccess,
  requestRolesFailure
};

export const initialState = {
  roles: []
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
    default:
      return state;
  }
};
