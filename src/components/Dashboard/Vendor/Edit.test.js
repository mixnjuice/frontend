import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/vendor';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedVendorEdit, { VendorEdit } from './Edit';
import { withMemoryRouter } from 'utils/testing';

describe('Dashboard <VendorEdit />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const vendorId = 20;
  const name = 'Luser';
  const mockStore = configureStore();
  const collection = {
    id: vendorId,
    name: 'Yuckies',
    slug: 'yuckies',
    code: 'YUK'
  };
  const store = mockStore({
    vendor: { initialState, collection },
    dashboard: dashboardInitialState
  });
  const actions = {
    selectDashboard: jest.fn(),
    requestVendor: jest.fn(),
    updateVendor: jest.fn()
  };
  const vendor = { vendorId, name, slug: 'yuckies', code: 'YUK' };
  const RoutedVendorEdit = withMemoryRouter(ConnectedVendorEdit);

  it('renders correctly', () => {
    const props = {
      layoutOptions: defaultLayoutOptions,
      vendorId,
      name
    };

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedVendorEdit {...props} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const props = {
      actions,
      layoutOptions: defaultLayoutOptions,
      vendorId,
      vendor,
      name,
      collection
    };
    const component = renderer.create(
      <Provider store={store}>
        <VendorEdit {...props} />
      </Provider>
    );
    const { instance } = component.root.findByType(VendorEdit);

    expect(instance).toBeDefined();
    instance.handleSubmit({ name: 'Yummies', slug: 'yummies', code: 'YUM' });
    expect(actions.updateVendor).toHaveBeenCalledWith({
      vendorId,
      name: 'Yummies',
      slug: 'yummies',
      code: 'YUM'
    });
    expect(actions.selectDashboard).toHaveBeenCalledWith({
      name: 'Vendors'
    });
  });
});
