import { render } from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/dashboard';
import Dashboard from './Dashboard';
import { withMemoryRouter, withProvider } from 'utils/testing';

describe('<Dashboard />', () => {
  const mockStore = configureStore();
  const store = mockStore({ dashboard: initialState });
  const RoutedDashboard = withMemoryRouter(Dashboard);
  const ConnectedDashboard = withProvider(RoutedDashboard, store);

  it('renders correctly', () => {
    const { asFragment } = render(<ConnectedDashboard />);

    expect(asFragment()).toMatchSnapshot();
  });
});
