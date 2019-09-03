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
  /* const actions = {
    selectDashboard: jest.fn(),
    requestUsers: jest.fn(),
    requestUserRoles: jest.fn(),
    createRoleUser: jest.fn()
  };
  const event = {
    preventDefault: jest.fn()
  }; */
  const roleId = 1;
  const name = 'Administrator';
  /* const users = [
    {
      activationCode: null,
      created: '20190805T04:16:38.930Z',
      emailAddress: 'blah@blah.com',
      id: 1,
      password: 'secret'
    },
    {
      activationCode: null,
      created: '20190805T04:16:38.930Z',
      emailAddress: 'blah2@blah.com',
      id: 2,
      password: 'secret'
    }
  ];
  const userId = 2; */
  const RoutedRoleAddUser = withMemoryRouter(ConnectedRoleAddUser);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedRoleAddUser opt={defaultOpts} roleId={roleId} name={name} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
