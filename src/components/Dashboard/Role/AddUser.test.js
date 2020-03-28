import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/roles';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedRoleAddUser, { RoleAddUser } from './AddUser';
import { withMemoryRouter } from 'utils/testing';

describe('Dashboard <RoleAddUser />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const roleId = 1;
  const name = 'Administrator';
  const actions = {
    requestUsers: jest.fn(),
    requestUserRoles: jest.fn(),
    createRoleUser: jest.fn(),
    selectDashboard: jest.fn()
  };
  const users = {
    collection: [
      {
        id: '1',
        emailAddress: 'david@fake-gmail.com',
        created: '2019-12-24T06:48:45.073Z',
        activationCode: null,
        UserProfile: {
          userId: '1',
          name: 'david',
          location: 'ABQ, NM',
          bio: 'AKA Al Vapone. USAF',
          url: 'daviddyess.com'
        }
      },
      {
        id: '2',
        emailAddress: 'al@fake-mixnjuice.com',
        created: '2020-02-20T00:34:39.885Z',
        activationCode: null,
        UserProfile: {
          userId: '2',
          name: 'alvapone',
          location: 'lol',
          bio: 'me :)',
          url: 'tangant'
        }
      }
    ]
  };
  const mockStore = configureStore();
  const store = mockStore({
    roles: initialState,
    dashboard: dashboardInitialState,
    users
  });
  const e = {
    target: {
      value: 3
    },
    preventDefault: jest.fn()
  };

  const RoutedConnectedRoleAddUser = withMemoryRouter(ConnectedRoleAddUser);
  const RoutedRoleAddUser = withMemoryRouter(RoleAddUser);
  const props = {
    layoutOptions: defaultLayoutOptions,
    roleId,
    name,
    actions,
    collection: users.collection
  };

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedConnectedRoleAddUser {...props} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  const component = renderer.create(
    <Provider store={store}>
      <RoutedRoleAddUser {...props} />
    </Provider>
  );
  const { instance } = component.root.findByType(RoleAddUser);

  it('can handleChange', () => {
    expect(instance).toBeDefined();
    instance.handleChange({
      target: {
        value: 3
      }
    });
    expect(actions.requestUserRoles).toHaveBeenCalledWith({
      userId: 3
    });
  });

  it('can handleSubmit', () => {
    expect(instance).toBeDefined();
    instance.handleSubmit(e);
    expect(actions.createRoleUser).toHaveBeenCalledWith({
      roleId,
      userId: 3,
      active: true
    });
    expect(actions.selectDashboard).toHaveBeenCalledWith({ name: 'Roles' });
  });
});
