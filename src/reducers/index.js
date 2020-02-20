import { combineReducers } from 'redux';
import {
  reducer as application,
  initialState as applicationState
} from './application';
import {
  reducer as dashboard,
  initialState as dashboardState
} from './dashboard';
import { reducer as flavors, initialState as flavorsState } from './flavors';
import { reducer as roles, initialState as rolesState } from './roles';
import { reducer as profile, initialState as profileState } from './profile';
import { reducer as flavor, initialState as flavorState } from './flavor';
import { reducer as recipe, initialState as recipeState } from './recipe';
import { reducer as toast, initialState as toastState } from './toast';
import { reducer as users, initialState as usersState } from './users';

export const initialState = {
  application: applicationState,
  dashboard: dashboardState,
  flavors: flavorsState,
  roles: rolesState,
  profile: profileState,
  toast: toastState,
  users: usersState,
  flavor: flavorState,
  recipe: recipeState
};

export default combineReducers({
  application,
  dashboard,
  flavors,
  roles,
  profile,
  toast,
  users,
  flavor,
  recipe
});
