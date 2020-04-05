import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/dashboard';
import ConnectedDashboard from './Dashboard';
import { withMemoryRouter } from 'utils/testing';

describe('<Dashboard />', () => {
  const mockStore = configureStore();
  const store = mockStore({ dashboard: initialState });
  const RoutedDashboard = withMemoryRouter(ConnectedDashboard);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedDashboard />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
