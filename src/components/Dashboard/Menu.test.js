import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/dashboard';
import ConnectedMenu from './Menu';
import { withMemoryRouter } from 'utils';

describe('Dashboard <Menu />', () => {
  const mockStore = configureStore();
  const store = mockStore({ dashboard: initialState });
  const RoutedMenu = withMemoryRouter(ConnectedMenu);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedMenu />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
