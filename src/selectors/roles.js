import { createSelector } from 'reselect';

export const getRoles = state => state.roles;

export const getAllRoles = createSelector(
  getRoles,
  roles => roles.roles
);
