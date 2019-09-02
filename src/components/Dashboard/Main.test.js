import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/dashboard';
import ConnectedMain from './Main';
import { withMemoryRouter } from 'utils';

describe('Dashboard <Main />', () => {
  const mockStore = configureStore();
  const store = mockStore({ dashboard: initialState });
  const RoutedMain = withMemoryRouter(ConnectedMain);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedMain />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
