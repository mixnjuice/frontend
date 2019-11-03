import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/users';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedUsers, { Users } from './Users';
import { withMemoryRouter } from 'utils';

describe('Dashboard <Users />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const mockStore = configureStore();
  const store = mockStore({
    users: initialState,
    dashboard: dashboardInitialState
  });
  const actions = {
    requestUsers: jest.fn()
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
  const RoutedUsers = withMemoryRouter(ConnectedUsers);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedUsers layoutOptions={defaultLayoutOptions} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can changePage', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedUsers actions={actions} layoutOptions={defaultLayoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(Users);

    expect(instance).toBeDefined();
    instance.changePage(page);
  });

  it('can changeLimit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedUsers actions={actions} layoutOptions={defaultLayoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(Users);

    expect(instance).toBeDefined();
    instance.changeLimit(limit);
  });

  it('can updateLimit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedUsers actions={actions} layoutOptions={defaultLayoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(Users);

    expect(instance).toBeDefined();
    instance.updateLimit();
  });
});
