import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/dashboard';
import ConnectedLink from './Link';
import { withMemoryRouter } from 'utils';

describe('Dashboard <Link />', () => {
  const mockStore = configureStore();
  const store = mockStore({ dashboard: initialState });
  const RoutedLink = withMemoryRouter(ConnectedLink);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedLink to="#home" name="Home">
          Dashboard
        </RoutedLink>
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
