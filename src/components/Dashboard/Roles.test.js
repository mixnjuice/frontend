import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/roles';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedRoles, { Roles } from './Roles';
import { withMemoryRouter } from 'utils';

describe('Dashboard <Roles />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const mockStore = configureStore();
  const store = mockStore({
    roles: initialState,
    dashboard: dashboardInitialState
  });
  const actions = {
    requestRoles: jest.fn()
  };
  const page = {
    target: {
      value: 1
    }
  };
  const limit = {
    target: {
      value: 40
    }
  };
  const RoutedRoles = withMemoryRouter(ConnectedRoles);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedRoles layoutOptions={defaultLayoutOptions} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can changePage', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedRoles actions={actions} layoutOptions={defaultLayoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(Roles);

    expect(instance).toBeDefined();
    instance.changePage(page);
  });

  it('can changeLimit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedRoles actions={actions} layoutOptions={defaultLayoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(Roles);

    expect(instance).toBeDefined();
    instance.changeLimit(limit);
  });

  it('can updateLimit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedRoles actions={actions} layoutOptions={defaultLayoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(Roles);

    expect(instance).toBeDefined();
    instance.updateLimit();
  });
});
