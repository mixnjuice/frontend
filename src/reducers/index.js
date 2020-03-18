import { combineReducers } from 'redux';
import {
  reducer as application,
  initialState as applicationState
} from './application';
import {
  reducer as dashboard,
  initialState as dashboardState
} from './dashboard';
import { reducer as flavor, initialState as flavorState } from './flavor';
import { reducer as flavors, initialState as flavorsState } from './flavors';
import { reducer as profile, initialState as profileState } from './profile';
import { reducer as recipe, initialState as recipeState } from './recipe';
import { reducer as roles, initialState as rolesState } from './roles';
import { reducer as toast, initialState as toastState } from './toast';
import { reducer as users, initialState as usersState } from './users';
import { reducer as theme, initialState as themeState } from './theme';

export const initialState = {
  application: applicationState,
  dashboard: dashboardState,
  flavor: flavorState,
  flavors: flavorsState,
  profile: profileState,
  recipe: recipeState,
  roles: rolesState,
  toast: toastState,
  users: usersState,
  theme: themeState
};

export default combineReducers({
  application,
  dashboard,
  flavor,
  flavors,
  profile,
  recipe,
  roles,
  toast,
  users,
  theme
});
