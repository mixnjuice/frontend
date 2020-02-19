import { combineReducers } from 'redux';

import {
  reducer as application,
  initialState as applicationState
} from './application';
import { reducer as profile, initialState as profileState } from './profile';
import { reducer as flavor, initialState as flavorState } from './flavor';
import { reducer as recipe, initialState as recipeState } from './recipe';
import { reducer as toast, initialState as toastState } from './toast';

export const initialState = {
  application: applicationState,
  profile: profileState,
  toast: toastState,
  flavor: flavorState,
  recipe: recipeState
};

export default combineReducers({
  application,
  profile,
  toast,
  flavor,
  recipe
});
