import { render } from '@testing-library/react';
import React from 'react';

import Layout from './DashboardLayout';

describe('Dashboad <Layout />', () => {
  const layoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };

  it('renders correctly', () => {
    const { asFragment } = render(
      <Layout
        pageTitle="Not Found"
        header="Not Found :("
        options={layoutOptions}
      >
        Children go here
      </Layout>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
