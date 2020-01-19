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
      actions,
      loggedIn: false
    };

    expect(
      renderer.create(<RoutedHeader {...props} />).toJSON()
    ).toMatchSnapshot();
  });

  it('renders logged in correctly', () => {
    const props = {
      actions,
      loggedIn: true
    };

    expect(
      renderer.create(<RoutedHeader {...props} />).toJSON()
    ).toMatchSnapshot();
  });

  it('can logoutUser', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedHeader actions={actions} loggedIn={true} />
      </Provider>
    );
    const { instance } = component.root.findByType(Header);

    expect(instance).toBeDefined();
    instance.logoutUser();
    expect(actions.logoutUser).toHaveBeenCalledWith();
  });
});
