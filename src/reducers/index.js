import { combineReducers } from 'redux';

import {
  reducer as application,
  initialState as applicationState
} from './application';
import { reducer as toast, initialState as toastState } from './toast';

export const initialState = {
  application: applicationState,
  toast: toastState
};

export default combineReducers({
  application,
  toast
});
