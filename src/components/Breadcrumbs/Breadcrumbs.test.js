import { render } from '@testing-library/react';
import React from 'react';

import Breadcrumbs from './Breadcrumbs';
import { withMemoryRouter } from 'utils/testing';

describe('<Breadcrumbs />', () => {
  const RoutedBreadcrumbs = withMemoryRouter(Breadcrumbs);

  it('renders home correctly', () => {
    const props = {
      base: 'home',
      active: 'User Stuff'
    };

    const { asFragment } = render(<RoutedBreadcrumbs {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders admin correctly', () => {
    const props = {
      base: 'admin',
      links: [{ name: 'Admin Page', url: '/admin/stuff' }],
      active: 'Admin Stuff'
    };

    const { asFragment } = render(<RoutedBreadcrumbs {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
