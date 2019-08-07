import { createSelector } from 'reselect';

export const getDashboard = state => state.dashboard;

export const getMigrations = createSelector(
  getDashboard,
  dashboard => dashboard.migrations
);
