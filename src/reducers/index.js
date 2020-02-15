import { combineReducers } from 'redux';

import {
  reducer as application,
  initialState as applicationState
} from './application';
import { reducer as profile, initialState as profileState } from './profile';
import { reducer as toast, initialState as toastState } from './toast';

export const initialState = {
  application: applicationState,
  profile: profileState,
  toast: toastState
};

export default combineReducers({
  application,
  profile,
  toast
});
