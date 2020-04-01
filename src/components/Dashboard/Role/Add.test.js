import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/roles';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedRoleAdd, { RoleAdd } from './Add';
import { withMemoryRouter } from 'utils/testing';

describe('Dashboard <RoleAdd />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const name = 'Super';
  const mockStore = configureStore();
  const store = mockStore({
    roles: initialState,
    dashboard: dashboardInitialState
  });
  const actions = {
    selectDashboard: jest.fn(),
    createRole: jest.fn()
  };
  const RoutedRoleAdd = withMemoryRouter(ConnectedRoleAdd);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedRoleAdd layoutOptions={defaultLayoutOptions} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoleAdd actions={actions} layoutOptions={defaultLayoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(RoleAdd);

    expect(instance).toBeDefined();
    instance.handleSubmit({ name });
    expect(actions.createRole).toHaveBeenCalledWith({ name });
    expect(actions.selectDashboard).toHaveBeenCalledWith({ name: 'Roles' });
  });
});
