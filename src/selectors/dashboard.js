import { createSelector } from 'reselect';

export const getDashboard = (state) => state.dashboard;

export const getDashboardComponent = createSelector(
  getDashboard,
  (dashboard) => dashboard.dashboardComponent
);

export const getMigrations = createSelector(
  getDashboard,
  (dashboard) => dashboard.migrations
);

export const getStats = createSelector(
  getDashboard,
  (dashboard) => dashboard.stats
);
