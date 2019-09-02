import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/roles';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedRoleDelete from './Delete';
import { withMemoryRouter } from 'utils';

describe('Dashboard <RoleDelete />', () => {
  const defaultOpts = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const roleId = 1;
  const name = 'Administrator';
  const mockStore = configureStore();
  const store = mockStore({
    roles: initialState,
    dashboard: dashboardInitialState
  });
  const RoutedRoleDelete = withMemoryRouter(ConnectedRoleDelete);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedRoleDelete opt={defaultOpts} roleId={roleId} name={name} />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
