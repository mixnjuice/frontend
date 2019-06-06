import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Login from './Login';
import { withMemoryRouter } from 'utils';

describe('<Login />', () => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('renders correctly', () => {
    const RoutedLogin = withMemoryRouter(Login);
    const component = renderer.create(
      <Provider store={store}>
        <RoutedLogin />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
