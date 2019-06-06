import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import App from './App';
import { withMemoryRouter } from 'utils';

describe('<App />', () => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('renders correctly', () => {
    const RoutedApp = withMemoryRouter(App);
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
