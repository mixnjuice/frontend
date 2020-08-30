import React from 'react';
import renderer from 'react-test-renderer';
import Breadcrumbs from './Breadcrumbs';
import { withMemoryRouter } from 'utils/testing';
// Prevent findDOMNode error in test from Dropdown component in react-bootstrap
jest.mock('react-dom', () => ({
  findDOMNode: () => ({})
}));

describe('<Breadcrumbs />', () => {
  const RoutedBreadcrumbs = withMemoryRouter(Breadcrumbs);

  it('renders home correctly', () => {
    const props = {
      base: 'home',
      active: 'User Stuff'
    };

    expect(
      renderer.create(<RoutedBreadcrumbs {...props} />).toJSON()
    ).toMatchSnapshot();
  });

  it('renders admin correctly', () => {
    const props = {
      base: 'admin',
      links: [{ name: 'Admin Page', url: '/admin/stuff' }],
      active: 'Admin Stuff'
    };

    expect(
      renderer.create(<RoutedBreadcrumbs {...props} />).toJSON()
    ).toMatchSnapshot();
  });
});
