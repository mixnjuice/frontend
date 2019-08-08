import { buildActions } from 'utils';

export const types = buildActions('dashboard', [
  'REQUEST_DASHBOARD',
  'SELECT_DASHBOARD',
  'REQUEST_MIGRATIONS',
  'REQUEST_MIGRATIONS_SUCCESS',
  'REQUEST_MIGRATIONS_FAILURE'
]);

const requestDashboard = dashboard => ({
  type: types.REQUEST_DASHBOARD,
  dashboard
});

const selectDashboard = dashboard => ({
  type: types.SELECT_DASHBOARD,
  dashboard
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
  selectDashboard,
  requestMigrations,
  requestMigrationsSuccess,
  requestMigrationsFailure
};

export const initialState = {
  dashboard: {
    component: 'Home',
    item: 'null'
  },
  migrations: []
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_DASHBOARD:
      return {
        ...state,
        dashboard: action.dashboard
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
