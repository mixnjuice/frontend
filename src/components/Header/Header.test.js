import React from 'react';
import renderer from 'react-test-renderer';
import { Header } from './Header';
import { withMemoryRouter } from 'utils/testing';
// Prevent findDOMNode error in test from Dropdown component in react-bootstrap
jest.mock('react-dom', () => ({
  findDOMNode: () => ({})
}));

describe('<Header />', () => {
  const actions = {
    logoutUser: jest.fn()
  };
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
      <RoutedHeader actions={actions} loggedIn />
    );
    const { instance } = component.root.findByType(Header);

    expect(instance).toBeDefined();
    instance.logoutUser();
    expect(actions.logoutUser).toHaveBeenCalledWith();
  });
});
