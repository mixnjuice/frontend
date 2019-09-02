import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/users';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedUsers from './Users';
import { withMemoryRouter } from 'utils';

describe('Dashboard <Users />', () => {
  const defaultOpts = {
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
  const RoutedUsers = withMemoryRouter(ConnectedUsers);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedUsers opt={defaultOpts} />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
