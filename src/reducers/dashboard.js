import { buildActions } from 'utils';

export const types = buildActions('dashboard', [
  'REQUEST_DASHBOARD',
  'REQUEST_DASHBOARD_SUCCESS',
  'SELECT_DASHBOARD',
  'SELECT_DASHBOARD_SUCCESS',
  'REQUEST_MIGRATIONS',
  'REQUEST_MIGRATIONS_SUCCESS',
  'REQUEST_MIGRATIONS_FAILURE',
  'REQUEST_STATS',
  'REQUEST_STATS_SUCCESS',
  'REQUEST_STATS_FAILURE'
]);

const requestDashboard = () => ({
  type: types.REQUEST_DASHBOARD
});

const requestDashboardSuccess = dashboardComponent => ({
  type: types.REQUEST_DASHBOARD_SUCCESS,
  dashboardComponent
});

const selectDashboard = ({ name, item }) => ({
  type: types.SELECT_DASHBOARD,
  name,
  item
});

const selectDashboardSuccess = dashboardComponent => ({
  type: types.SELECT_DASHBOARD_SUCCESS,
  dashboardComponent
});

const requestMigrations = () => ({
  type: types.REQUEST_MIGRATIONS
});

const requestMigrationsSuccess = migrations => ({
  type: types.REQUEST_MIGRATIONS_SUCCESS,
  migrations
});

const requestMigrationsFailure = error => ({
  type: types.REQUEST_MIGRATIONS_FAILURE,
  error
});

const requestStats = () => ({
  type: types.REQUEST_STATS
});

const requestStatsSuccess = stats => ({
  type: types.REQUEST_STATS_SUCCESS,
  stats
});

const requestStatsFailure = error => ({
  type: types.REQUEST_STATS_FAILURE,
  error
});

export const actions = {
  requestDashboard,
  requestDashboardSuccess,
  selectDashboard,
  selectDashboardSuccess,
  requestMigrations,
  requestMigrationsSuccess,
  requestMigrationsFailure,
  requestStats,
  requestStatsSuccess,
  requestStatsFailure
};

export const initialState = {
  dashboardComponent: {
    name: 'Home',
    item: null
  },
  migrations: [],
  stats: {}
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboardComponent: action.dashboardComponent
      };
    case types.SELECT_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboardComponent: action.dashboardComponent
      };
    case types.REQUEST_MIGRATIONS_SUCCESS:
      return {
        ...state,
        migrations: action.migrations
      };
    case types.REQUEST_MIGRATIONS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.REQUEST_STATS_SUCCESS:
      return {
        ...state,
        stats: action.stats
      };
    case types.REQUEST_STATS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
