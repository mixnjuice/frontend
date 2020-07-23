import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import ToastDrawer from './ToastDrawer';
import { withProvider } from 'utils/testing';

describe('<ToastDrawer />', () => {
  const queue = [
    {
      id: 'test',
      title: 'I am a toast',
      message: 'Ask me anything'
    }
  ];
  const initialState = { toast: { queue } };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('renders correctly', () => {
    const ConnectedToastDrawer = withProvider(ToastDrawer, store);
    const component = renderer.create(<ConnectedToastDrawer />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders null if empty', () => {
    const emptyState = { toast: { queue: [] } };
    const emptyStore = mockStore(emptyState);
    const ConnectedToastDrawer = withProvider(ToastDrawer, emptyStore);
    const component = renderer.create(<ConnectedToastDrawer />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
