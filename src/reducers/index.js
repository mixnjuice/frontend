import { combineReducers } from 'redux';

import {
  reducer as application,
  initialState as applicationState
} from './application';

import { reducer as users, initialState as usersState } from './users';

export const initialState = {
  application: applicationState,
  users: usersState
};

export default combineReducers({
  application,
  users
});
