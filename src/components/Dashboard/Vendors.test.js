import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/vendors';
import { initialState as dashboardInitialState } from 'reducers/dashboard';

import ConnectedVendors, { Vendors } from './Vendors';
import { mockComponent, withMemoryRouter, withProvider } from 'utils/testing';

jest.mock('components/Pagination/Pagination', () => {
  const pagination = require('utils/testing').mockComponent('Pagination');
  const PagerInfo = require('utils/testing').mockComponent('PagerInfo');

  return {
    withPagination: () => () => pagination,
    pagination,
    PagerInfo
  };
});

describe('Dashboard <Vendors />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const mockStore = configureStore();
  const store = mockStore({
    vendors: initialState,
    dashboard: dashboardInitialState
  });
  const MockPager = mockComponent('Pager');
  const props = {
    collection: [],
    pager: {},
    pagerNavigation: <MockPager />
  };

  const RoutedVendors = withMemoryRouter(ConnectedVendors);
  const DecoratedVendors = withProvider(RoutedVendors, store);

  it('renders correctly', () => {
    expect(
      renderer
        .create(<DecoratedVendors layoutOptions={defaultLayoutOptions} />)
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders instance correctly', () => {
    const component = renderer.create(
      <Vendors {...props} layoutOptions={defaultLayoutOptions} />
    );
    const { instance } = component.root.findByType(Vendors);

    expect(instance).toBeDefined();
  });
});
