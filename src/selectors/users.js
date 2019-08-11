// import dayjs from 'dayjs';
import { createSelector } from 'reselect';

export const getUsers = state => state.users;

export const getAllUsers = createSelector(
  getUsers,
  users => users.users
);

export const getUser = createSelector(
  getUsers,
  users => users.user
);

export const getUserRoles = createSelector(
  getUsers,
  users => users.roles
);
