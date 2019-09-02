import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/users';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedUserRoles from './Roles';
import { withMemoryRouter } from 'utils';

describe('Dashboard <UserRoles />', () => {
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
  const userId = 22;
  const RoutedUserRoles = withMemoryRouter(ConnectedUserRoles);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedUserRoles opt={defaultOpts} userId={userId} />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
