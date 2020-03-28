import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/users';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedUserRoles from './Roles';
import { withMemoryRouter } from 'utils/testing';

describe('Dashboard <UserRoles />', () => {
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
  const userId = 22;
  const RoutedUserRoles = withMemoryRouter(ConnectedUserRoles);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedUserRoles
              layoutOptions={defaultLayoutOptions}
              userId={userId}
            />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
