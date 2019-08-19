import { reducer, types, actions } from './dashboard';

describe('dashboard reducer', () => {
  const dashboardComponent = {
    name: 'Home',
    item: null
  };
  const name = 'Home';
  const item = null;
  const migrations = [{ db: true }];
  const stats = [{ users: true }];
  const error = { message: 'Failed' };
  /* const toast = {
    id: 'test123',
    title: 'Testing',
    icon: 'heart',
    message: 'This is a test.'
  };*/

  it('has REQUEST_DASHBOARD action', () => {
    expect(actions.requestDashboard()).toEqual({
      type: types.REQUEST_DASHBOARD
    });
  });

  it('reduces REQUEST_DASHBOARD action', () => {
    const action = actions.requestDashboard();

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_DASHBOARD_SUCCESS action', () => {
    expect(actions.requestDashboardSuccess(dashboardComponent)).toEqual({
      type: types.REQUEST_DASHBOARD_SUCCESS,
      dashboardComponent
    });
  });

  it('reduces REQUEST_DASHBOARD_SUCCESS action', () => {
    const action = actions.requestDashboardSuccess(dashboardComponent);

    expect(reducer({}, action)).toEqual({ dashboardComponent });
  });

  it('has SELECT_DASHBOARD action', () => {
    expect(actions.selectDashboard({ name, item })).toEqual({
      type: types.SELECT_DASHBOARD,
      name,
      item
    });
  });

  it('reduces SELECT_DASHBOARD action', () => {
    const action = actions.selectDashboard({ name, item });

    expect(reducer({}, action)).toEqual({});
  });

  it('has SELECT_DASHBOARD_SUCCESS action', () => {
    expect(actions.selectDashboardSuccess(dashboardComponent)).toEqual({
      type: types.SELECT_DASHBOARD_SUCCESS,
      dashboardComponent
    });
  });

  it('reduces SELECT_DASHBOARD_SUCCESS action', () => {
    const action = actions.selectDashboardSuccess(dashboardComponent);

    expect(reducer({}, action)).toEqual({ dashboardComponent });
  });

  it('has REQUEST_MIGRATIONS action', () => {
    expect(actions.requestMigrations()).toEqual({
      type: types.REQUEST_MIGRATIONS
    });
  });

  it('reduces REQUEST_MIGRATIONS action', () => {
    const action = actions.requestMigrations();

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_MIGRATIONS_SUCCESS action', () => {
    expect(actions.requestMigrationsSuccess(migrations)).toEqual({
      type: types.REQUEST_MIGRATIONS_SUCCESS,
      migrations
    });
  });

  it('reduces REQUEST_MIGRATIONS_SUCCESS action', () => {
    const action = actions.requestMigrationsSuccess(migrations);

    expect(reducer({}, action)).toEqual({ migrations });
  });

  it('has REQUEST_MIGRATIONS_FAILURE action', () => {
    expect(actions.requestMigrationsFailure(error)).toEqual({
      type: types.REQUEST_MIGRATIONS_FAILURE,
      error
    });
  });

  it('has REQUEST_STATS action', () => {
    expect(actions.requestStats()).toEqual({
      type: types.REQUEST_STATS
    });
  });

  it('reduces REQUEST_STATS action', () => {
    const action = actions.requestStats();

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_STATS_SUCCESS action', () => {
    expect(actions.requestStatsSuccess(stats)).toEqual({
      type: types.REQUEST_STATS_SUCCESS,
      stats
    });
  });

  it('reduces REQUEST_STATS_SUCCESS action', () => {
    const action = actions.requestStatsSuccess(stats);

    expect(reducer({}, action)).toEqual({ stats });
  });

  it('has REQUEST_STATS_FAILURE action', () => {
    expect(actions.requestStatsFailure(error)).toEqual({
      type: types.REQUEST_STATS_FAILURE,
      error
    });
  });
});
