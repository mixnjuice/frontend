import { buildActions } from 'utils';

export const types = buildActions('users', [
  'REQUEST_USERS',
  'REQUEST_USERS_SUCCESS',
  'REQUEST_USERS_FAILURE'
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

export const actions = {
  requestUsers,
  requestUsersSuccess,
  requestUsersFailure
};

export const initialState = {
  users: []
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
    default:
      return state;
  }
};
