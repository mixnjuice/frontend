import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/roles';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import { initialState as usersInitialState } from 'reducers/users';
import ConnectedRoleAddUser, { RoleAddUser } from './AddUser';
import { withMemoryRouter } from 'utils';

describe('Dashboard <RoleAddUser />', () => {
  const defaultLayoutOptions = {
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
  const actions = {
    requestUserRoles: jest.fn(),
    createRoleUser: jest.fn(),
    selectDashboard: jest.fn()
  };
  const e = {
    target: {
      value: 'test'
    },
    preventDefault: jest.fn()
  };

  const RoutedRoleAddUser = withMemoryRouter(ConnectedRoleAddUser);

  it('renders correctly', () => {
    const props = {
      layoutOptions: defaultLayoutOptions,
      roleId,
      name
    };

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedRoleAddUser {...props} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can handleChange', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedRoleAddUser
          actions={actions}
          layoutOptions={defaultLayoutOptions}
        />
      </Provider>
    );
    const { instance } = component.root.findByType(RoleAddUser);

    expect(instance).toBeDefined();
    instance.handleChange(e);
  });

  it('can handleSubmit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedRoleAddUser
          actions={actions}
          layoutOptions={defaultLayoutOptions}
        />
      </Provider>
    );
    const { instance } = component.root.findByType(RoleAddUser);

    expect(instance).toBeDefined();
    instance.handleSubmit(e);
  });
});
