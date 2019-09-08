import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/dashboard';
import ConnectedNotFound from './NotFound';
import { withMemoryRouter } from 'utils';

describe('Dashboard <NotFound />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const name = 'Roles/Abusers';
  const mockStore = configureStore();
  const store = mockStore({ dashboard: initialState });
  const RoutedNotFound = withMemoryRouter(ConnectedNotFound);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedNotFound layoutOptions={defaultLayoutOptions} name={name} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
