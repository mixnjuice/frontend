import { createSelector } from 'reselect';

export const getRoles = (state) => state.roles;

export const getAllRoles = createSelector(
  getRoles,
  (roles) => roles.collection.roles
);

export const getCachedRoles = createSelector(
  getRoles,
  (roles) => roles.collection.cache
);

export const getRolesPager = createSelector(
  getRoles,
  (roles) => roles.collection.pager
);

export const getRoleUsers = createSelector(
  getRoles,
  (roles) => roles.roleUsers
);
