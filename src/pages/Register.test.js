import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import ConnectedRegister, { Register } from './Register';
import { initialState } from 'reducers/application';
import { withMemoryRouter } from 'utils';

describe('<Register />', () => {
  const actions = {
    registerUser: jest.fn()
  };
  const props = {
    registering: false
  };
  const mockStore = configureStore();
  const store = mockStore({ application: initialState });
  const RoutedRegister = withMemoryRouter(ConnectedRegister);

  it('renders correctly', () => {
    const component = renderer.create(<Register {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders connected component correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedRegister />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const formData = { test: 'value' };
    const component = renderer.create(
      <Register actions={actions} {...props} />
    );
    const { instance } = component.root.findByType(Register);

    expect(instance).toBeDefined();
    instance.handleSubmit(formData);
    expect(actions.registerUser).toHaveBeenCalledWith(formData);
  });
});
