import { buildActions } from 'utils';

export const types = buildActions('dashboard', [
  'REQUEST_DASHBOARD',
  'REQUEST_DASHBOARD_SUCCESS',
  'SELECT_DASHBOARD',
  'SELECT_DASHBOARD_SUCCESS',
  'REQUEST_MIGRATIONS',
  'REQUEST_MIGRATIONS_SUCCESS',
  'REQUEST_MIGRATIONS_FAILURE'
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

export const actions = {
  requestDashboard,
  requestDashboardSuccess,
  selectDashboard,
  selectDashboardSuccess,
  requestMigrations,
  requestMigrationsSuccess,
  requestMigrationsFailure
};

export const initialState = {
  dashboardComponent: {
    name: 'Home',
    item: null
  },
  migrations: []
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
    default:
      return state;
  }
};
