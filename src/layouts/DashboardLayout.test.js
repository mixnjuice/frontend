import React from 'react';
import renderer from 'react-test-renderer';

import Layout from './DashboardLayout';

describe('Dashboad <Layout />', () => {
  const opt = {
    border: false,
    header: true,
    title: false,
    style: {}
  };

  it('renders correctly', () => {
    const component = renderer.create(
      <Layout pageTitle="Not Found" header="Not Found :(" options={opt}>
        Children go here
      </Layout>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
