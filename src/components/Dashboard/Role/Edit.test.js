import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/roles';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedRoleEdit, { RoleEdit } from './Edit';
import { withMemoryRouter } from 'utils/testing';

describe('Dashboard <RoleEdit />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const roleId = 20;
  const name = 'Luser';
  const mockStore = configureStore();
  const store = mockStore({
    roles: initialState,
    dashboard: dashboardInitialState
  });
  const actions = {
    selectDashboard: jest.fn(),
    updateRole: jest.fn()
  };
  const RoutedRoleEdit = withMemoryRouter(ConnectedRoleEdit);

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
            <RoutedRoleEdit {...props} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const props = {
      actions,
      layoutOptions: defaultLayoutOptions,
      roleId,
      name
    };
    const component = renderer.create(
      <Provider store={store}>
        <RoleEdit {...props} />
      </Provider>
    );
    const { instance } = component.root.findByType(RoleEdit);

    expect(instance).toBeDefined();
    instance.handleSubmit({ name });
    expect(actions.updateRole).toHaveBeenCalledWith({
      roleId,
      name
    });
    expect(actions.selectDashboard).toHaveBeenCalledWith({
      name: 'Roles'
    });
  });
});
