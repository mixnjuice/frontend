import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/roles';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import { initialState as usersInitialState } from 'reducers/users';
import ConnectedRoleAddUser from './AddUser';
import { withMemoryRouter } from 'utils';

describe('Dashboard <RoleAddUser />', () => {
  const defaultOpts = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const mockStore = configureStore();
  const store = mockStore({
    roles: initialState,
    dashboard: dashboardInitialState,
    users: usersInitialState
  });
  const roleId = 1;
  const name = 'Administrator';
  const RoutedRoleAddUser = withMemoryRouter(ConnectedRoleAddUser);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedRoleAddUser opt={defaultOpts} roleId={roleId} name={name} />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
