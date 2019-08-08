import { createSelector } from 'reselect';

export const getDashboard = state => state.dashboard;

export const getDashboardComponent = createSelector(
  getDashboard,
  dashboard => dashboard.dashboard
);

export const getMigrations = createSelector(
  getDashboard,
  dashboard => dashboard.migrations
);
