import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/users';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConnectedUsers, { Users } from './Users';
import { withMemoryRouter } from 'utils';

describe('Dashboard <Users />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const mockStore = configureStore();
  const store = mockStore({
    users: initialState,
    dashboard: dashboardInitialState
  });

  const RoutedUsers = withMemoryRouter(ConnectedUsers);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedUsers layoutOptions={defaultLayoutOptions} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders getters', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedUsers layoutOptions={defaultLayoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(Users);

    expect(instance).toBeDefined();
    expect(instance.yesIcon).toEqual(
      <FontAwesomeIcon icon="check" color="green" title="Yes" />
    );
    expect(instance.noIcon).toEqual(
      <FontAwesomeIcon icon="times" color="red" title="No" />
    );
  });
});
