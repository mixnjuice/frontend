import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/application';
import ConnectedLogin, { Login } from './Login';
import { withMemoryRouter } from 'utils/testing';

describe('<Login />', () => {
  const actions = {
    loginUser: jest.fn()
  };
  const mockStore = configureStore();
  const store = mockStore({ application: initialState });
  const RoutedLogin = withMemoryRouter(ConnectedLogin);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedLogin />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const emailAddress = 'some@one.org';
    const password = 'testing';
    const component = renderer.create(
      <Login actions={actions} loggingIn={false} loggedIn={false} />
    );
    const { instance } = component.root.findByType(Login);

    expect(instance).toBeDefined();
    instance.handleSubmit({ emailAddress, password });
    expect(actions.loginUser).toHaveBeenCalledWith(emailAddress, password);
  });
});
