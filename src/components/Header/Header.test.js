import React from 'react';
import renderer from 'react-test-renderer';

import Header from './Header';
import { withMemoryRouter } from 'utils';
// Prevent findDOMNode error in test from Dropdown component in react-bootstrap
jest.mock('react-dom', () => ({
  findDOMNode: () => ({})
}));

describe('<Header />', () => {
  it('renders correctly', () => {
    const RoutedHeader = withMemoryRouter(Header);
    const component = renderer.create(<RoutedHeader />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
