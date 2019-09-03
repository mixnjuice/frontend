import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/flavors';
import ConnectedFlavors from './Flavors';
import { withMemoryRouter } from 'utils';

describe('Dashboard <Flavors />', () => {
  const defaultOpts = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const mockStore = configureStore();
  const store = mockStore({ flavors: initialState });
  const RoutedFlavors = withMemoryRouter(ConnectedFlavors);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedFlavors opt={defaultOpts} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
