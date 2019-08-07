import { combineReducers } from 'redux';

import {
  reducer as application,
  initialState as applicationState
} from './application';

import { reducer as flavors, initialState as flavorsState } from './flavors';

import { reducer as roles, initialState as rolesState } from './roles';

import { reducer as users, initialState as usersState } from './users';

export const initialState = {
  application: applicationState,
  flavors: flavorsState,
  roles: rolesState,
  users: usersState
};

export default combineReducers({
  application,
  flavors,
  roles,
  users
});
