import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import ConnectedRegister, { Register } from './Register';
import { withMemoryRouter } from 'utils';

describe('<Register />', () => {
  const actions = {
    registerUser: jest.fn()
  };
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const RoutedRegister = withMemoryRouter(ConnectedRegister);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedRegister />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const formData = { test: 'value' };
    const component = renderer.create(<Register actions={actions} />);
    const { instance } = component.root.findByType(Register);

    expect(instance).toBeDefined();
    instance.handleSubmit(formData);
    expect(actions.registerUser).toHaveBeenCalledWith(formData);
  });
});
