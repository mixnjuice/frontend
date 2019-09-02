import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/dashboard';
import ConnectedHome from './Home';
import { withMemoryRouter } from 'utils';

describe('Dashboard <Home />', () => {
  const mockStore = configureStore();
  const store = mockStore({ dashboard: initialState });
  const RoutedHome = withMemoryRouter(ConnectedHome);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedHome />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
