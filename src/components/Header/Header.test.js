import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { Header } from './Header';
import { initialState } from 'reducers/application';
import { withMemoryRouter } from 'utils';
// Prevent findDOMNode error in test from Dropdown component in react-bootstrap
jest.mock('react-dom', () => ({
  findDOMNode: () => ({})
}));

describe('<Header />', () => {
  const actions = {
    logoutUser: jest.fn()
  };
  const mockStore = configureStore();
  const store = mockStore({ application: initialState });
  const RoutedHeader = withMemoryRouter(Header);

  it('renders logged out correctly', () => {
    const props = {
      loggedIn: false
    };

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedHeader actions={actions} {...props} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders logged in correctly', () => {
    const props = {
      loggedIn: true
    };

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedHeader actions={actions} {...props} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can logoutUser', () => {
    const props = {
      loggedIn: true
    };
    const component = renderer.create(
      <Provider store={store}>
        <RoutedHeader actions={actions} {...props} />
      </Provider>
    );
    const { instance } = component.root.findByType(Header);

    expect(instance).toBeDefined();
    instance.logoutUser();
    expect(actions.logoutUser).toHaveBeenCalledWith();
  });
});
