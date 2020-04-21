import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/roles';
import ConnectedRoleDelete, { RoleDelete } from './Delete';
import { withMemoryRouter } from 'utils/testing';

describe('Dashboard <RoleDelete />', () => {
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
    roles: initialState,
    dashboard: {
      dashboardComponent: {
        name: 'Role/Delete',
        item: {
          roleId: 3,
          name: 'Tester'
        }
      }
    }
  });
  const actions = {
    selectDashboard: jest.fn(),
    deleteRole: jest.fn()
  };
  const RoutedRoleDelete = withMemoryRouter(ConnectedRoleDelete);

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
            <RoutedRoleDelete {...props} />
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
        <RoleDelete {...props} />
      </Provider>
    );
    const { instance } = component.root.findByType(RoleDelete);

    expect(instance).toBeDefined();
    instance.handleSubmit();
    expect(actions.deleteRole).toHaveBeenCalledWith({ roleId, name });
    expect(actions.selectDashboard).toHaveBeenCalledWith({ name: 'Roles' });
  });
});
