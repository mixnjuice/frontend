import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import ConnectedHome, { DashboardHome } from './Home';
import { withMemoryRouter } from 'utils';

describe('Dashboard <Home />', () => {
  const stats = {
    activatedUsers: 1991,
    flavorTags: 90,
    flavors: 8617,
    recipeTags: 55,
    recipes: 42,
    tags: 115,
    userTokens: 300,
    users: 2000,
    vendors: 98
  };
  const mockStore = configureStore();
  const store = mockStore({
    dashboard: { stats }
  });
  const actions = {
    requestStats: jest.fn()
  };
  const RoutedHome = withMemoryRouter(ConnectedHome);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedHome />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can refresh', () => {
    const component = renderer.create(
      <Provider store={store}>
        <DashboardHome actions={actions} stats={stats} />
      </Provider>
    );
    const { instance } = component.root.findByType(DashboardHome);

    expect(instance).toBeDefined();
    instance.refresh();
    expect(actions.requestStats).toHaveBeenCalledWith();
  });
});
