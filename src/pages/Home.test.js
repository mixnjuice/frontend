import { render } from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';

import Home from './Home';
import { withMemoryRouter, withProvider } from 'utils/testing';

describe('<Home />', () => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('renders correctly', () => {
    const RoutedHome = withMemoryRouter(Home);
    const ConnectedHome = withProvider(RoutedHome, store);
    const { getByText } = render(<ConnectedHome />);

    expect(getByText('Welcome to MixNJuice!')).toBeInTheDocument();
  });
});
