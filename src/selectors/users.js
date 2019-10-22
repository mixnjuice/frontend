import { createSelector } from 'reselect';

export const getUsers = state => state.users;

export const getAllUsers = createSelector(
  getUsers,
  users => users.collection
);

export const getCachedUsers = createSelector(
  getUsers,
  users => users.cache
);

export const getUsersPager = createSelector(
  getUsers,
  users => users.pager
);

export const getUser = createSelector(
  getUsers,
  users => users.user
);

export const getUserRoles = createSelector(
  getUsers,
  users => users.roles
);
