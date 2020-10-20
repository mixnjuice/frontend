import { render } from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';

import ToastDrawer from './ToastDrawer';
import { withProvider } from 'utils/testing';

describe('<ToastDrawer />', () => {
  const mockStore = configureStore();

  it('renders correctly', () => {
    const initialState = {
      toast: {
        queue: [
          {
            id: 'test',
            title: 'I am a toast',
            message: 'Ask me anything'
          }
        ]
      }
    };
    const store = mockStore(initialState);
    const ConnectedToastDrawer = withProvider(ToastDrawer, store);
    const { asFragment } = render(<ConnectedToastDrawer />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders null if empty', () => {
    const emptyState = { toast: { queue: [] } };
    const store = mockStore(emptyState);
    const ConnectedToastDrawer = withProvider(ToastDrawer, store);
    const { asFragment } = render(<ConnectedToastDrawer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
