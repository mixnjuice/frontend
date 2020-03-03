import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import ConnectedRoleUsers, { RoleUsers } from './Users';
import { withMemoryRouter } from 'utils';

describe('Dashboard <RoleUsers />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const roleId = 3;
  const name = 'Tester';
  const mockStore = configureStore();
  const store = mockStore({
    roles: { roleUsers: null },
    dashboard: {
      name: 'Role/Users',
      item: {
        roleId: 3,
        name: 'Tester'
      }
    }
  });
  const actions = {
    requestRoles: jest.fn(),
    requestRoleUsers: jest.fn()
  };
  const RoutedRoleUsers = withMemoryRouter(ConnectedRoleUsers);

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
            <RoutedRoleUsers {...props} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can updateRoleId', () => {
    const props = {
      actions,
      layoutOptions: defaultLayoutOptions,
      roleId,
      name
    };
    const component = renderer.create(
      <Provider store={store}>
        <RoleUsers {...props} />
      </Provider>
    );
    const { instance } = component.root.findByType(RoleUsers);

    expect(instance).toBeDefined();
    instance.updateRoleId(roleId);
    expect(actions.requestRoleUsers).toHaveBeenCalledWith({ roleId });
  });
});
