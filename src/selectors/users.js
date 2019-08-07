// import dayjs from 'dayjs';
import { createSelector } from 'reselect';

export const getUsers = state => state.users;

export const getAllUsers = createSelector(
  getUsers,
  users => users.users
);
