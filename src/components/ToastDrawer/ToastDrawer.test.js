import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import ConnectedToastDrawer, { ToastDrawer } from './ToastDrawer';

describe('<ToastDrawer />', () => {
  const queue = [
    {
      id: 'test',
      title: 'I am a toast',
      message: 'Ask me anything'
    }
  ];

  it('renders correctly', () => {
    const props = { toasts: queue };
    const component = renderer.create(<ToastDrawer {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders null if empty', () => {
    const props = { toasts: [] };
    const component = renderer.create(<ToastDrawer {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders connected component correctly', () => {
    const initialState = { toast: { queue } };
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const component = renderer.create(
      <Provider store={store}>
        <ConnectedToastDrawer />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
