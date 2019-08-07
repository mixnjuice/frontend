import { buildActions } from 'utils';

export const types = buildActions('dashboard', [
  'REQUEST_MIGRATIONS',
  'REQUEST_MIGRATIONS_SUCCESS',
  'REQUEST_MIGRATIONS_FAILURE'
]);

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
  requestMigrations,
  requestMigrationsSuccess,
  requestMigrationsFailure
};

export const initialState = {
  migrations: []
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
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
