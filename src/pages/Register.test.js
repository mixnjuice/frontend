import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Register from './Register';
import { withMemoryRouter } from 'utils';

describe('<Register />', () => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('renders correctly', () => {
    const RoutedRegister = withMemoryRouter(Register);
    const component = renderer.create(
      <Provider store={store}>
        <RoutedRegister />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
