import { combineReducers } from 'redux';

import {
  reducer as application,
  initialState as applicationState
} from './application';
import { reducer as recipe, initialState as recipeState } from './recipe';
import { reducer as toast, initialState as toastState } from './toast';

export const initialState = {
  application: applicationState,
  toast: toastState,
  recipe: recipeState
};

export default combineReducers({
  application,
  toast,
  recipe
});
