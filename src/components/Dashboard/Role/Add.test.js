import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/roles';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedRoleAdd from './Add';
import { withMemoryRouter } from 'utils';

describe('Dashboard <RoleAdd />', () => {
  const defaultOpts = {
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
  const RoutedRoleAdd = withMemoryRouter(ConnectedRoleAdd);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedRoleAdd opt={defaultOpts} />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
