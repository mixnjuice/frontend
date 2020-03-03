import { initialState } from 'reducers/dashboard';
import {
  getDashboard,
  getDashboardComponent,
  getMigrations,
  getStats
} from './dashboard';

describe('dashboard selectors', () => {
  const state = { dashboard: initialState };

  it('can getDashboard', () => {
    expect(getDashboard(state)).toBe(state.dashboard);
  });

  it('can getDashboardComponent', () => {
    expect(getDashboardComponent(state)).toBe(initialState.dashboardComponent);
  });

  it('can getMigrations', () => {
    expect(getMigrations(state)).toBe(initialState.migrations);
  });

  it('can getStats', () => {
    expect(getStats(state)).toBe(initialState.stats);
  });
});
