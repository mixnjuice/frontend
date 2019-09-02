import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/roles';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedRoleUsers from './Users';
import { withMemoryRouter } from 'utils';

describe('Dashboard <RoleUsers />', () => {
  const defaultOpts = {
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
  const RoutedRoleUsers = withMemoryRouter(ConnectedRoleUsers);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedRoleUsers opt={defaultOpts} roleId={roleId} name={name} />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
