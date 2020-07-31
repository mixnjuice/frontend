import { render } from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';

import Header from './Header';
import { withMemoryRouter, withProvider } from 'utils/testing';

// Prevent findDOMNode error in test from Dropdown component in react-bootstrap
jest.mock('react-dom', () => ({
  findDOMNode: () => ({})
}));

describe('<Header />', () => {
  const actions = {
    logoutUser: jest.fn(),
    requestCurrentUser: jest.fn()
  };
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const RoutedHeader = withMemoryRouter(Header);
  const ConnectedHeader = withProvider(RoutedHeader, store);

  it('renders logged out correctly', () => {
    const props = {
      actions,
      loggedIn: false
    };

    expect(
      render(<ConnectedHeader {...props} />).asFragment()
    ).toMatchSnapshot();
  });

  it('renders logged in correctly', () => {
    const props = {
      actions,
      loggedIn: true
    };

    expect(
      render(<ConnectedHeader {...props} />).asFragment()
    ).toMatchSnapshot();
  });

  it('can logoutUser', () => {
    const component = render(<ConnectedHeader actions={actions} loggedIn />);
    const { instance } = component.root.findByType(Header);

    expect(instance).toBeDefined();
    instance.logoutUser();
    expect(actions.logoutUser).toHaveBeenCalledWith();
  });

  it('can render gravatar', () => {
    const props = {
      actions,
      loggedIn: true,
      user: { id: 1, emailAddress: 'jest@mixnjuice.com' }
    };
    const component = renderer.create(<RoutedHeader {...props} />);
    const { instance } = component.root.findByType(Header);

    expect(instance).toBeDefined();
    expect(instance.gravatar).toEqual(
      'https://www.gravatar.com/avatar/6114a57951ce2eefc79a1b3d7918a6f5?s=50&d=mp'
    );
  });
});
