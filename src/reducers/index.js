import { combineReducers } from 'redux';

import {
  reducer as application,
  initialState as applicationState
} from './application';

export const initialState = {
  application: applicationState
};

export default combineReducers({
  application
});
