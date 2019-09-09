import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/roles';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedRoleDeleteUser, { RoleDeleteUser } from './DeleteUser';
import { withMemoryRouter } from 'utils';

describe('Dashboard <RoleDeleteUser />', () => {
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
    selectDashboard: jest.fn(),
    deleteRoleUser: jest.fn()
  };
  const userId = 200;
  const roleId = 1;
  const name = 'Administrator';
  const RoutedRoleDeleteUser = withMemoryRouter(ConnectedRoleDeleteUser);

  it('renders correctly', () => {
    const props = {
      layoutOptions: defaultLayoutOptions,
      userId,
      roleId,
      name
    };

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedRoleDeleteUser {...props} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const props = {
      actions,
      layoutOptions: defaultLayoutOptions,
      userId,
      roleId,
      name
    };
    const component = renderer.create(
      <Provider store={store}>
        <RoleDeleteUser {...props} />
      </Provider>
    );
    const { instance } = component.root.findByType(RoleDeleteUser);

    expect(instance).toBeDefined();
    instance.handleSubmit();
    expect(actions.deleteRoleUser).toHaveBeenCalledWith({
      userId,
      roleId,
      name
    });
    expect(actions.selectDashboard).toHaveBeenCalledWith({
      name: 'User/Roles',
      item: userId
    });
  });
});
