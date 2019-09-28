import { createSelector } from 'reselect';

export const getRoles = state => state.roles;

export const getAllRoles = createSelector(
  getRoles,
  roles => roles.roles
);

export const getRoleUsers = createSelector(
  getRoles,
  roles => roles.roleUsers
);

export const isLoaded = createSelector(
  getRoles,
  roles => roles.loaded
);
