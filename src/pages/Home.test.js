import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Home from './Home';
import { withMemoryRouter } from 'utils';

describe('<Home />', () => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('renders correctly', () => {
    const RoutedHome = withMemoryRouter(Home);
    const component = renderer.create(
      <Provider store={store}>
        <RoutedHome />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
