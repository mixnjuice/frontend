import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/vendors';
import ConnectedVendorDelete, { VendorDelete } from './Delete';
import { withMemoryRouter } from 'utils/testing';

describe('Dashboard <VendorDelete />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const vendorId = 3;
  const name = 'Tester';
  const mockStore = configureStore();
  const store = mockStore({
    vendors: initialState,
    dashboard: {
      dashboardComponent: {
        name: 'Vendor/Delete',
        item: {
          vendorId: 3,
          name: 'Tester'
        }
      }
    }
  });
  const actions = {
    selectDashboard: jest.fn(),
    deleteVendor: jest.fn()
  };
  const RoutedVendorDelete = withMemoryRouter(ConnectedVendorDelete);

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
            <RoutedVendorDelete {...props} />
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
      name
    };
    const component = renderer.create(
      <Provider store={store}>
        <VendorDelete {...props} />
      </Provider>
    );
    const { instance } = component.root.findByType(VendorDelete);

    expect(instance).toBeDefined();
    instance.handleSubmit();
    expect(actions.deleteVendor).toHaveBeenCalledWith({ vendorId, name });
    expect(actions.selectDashboard).toHaveBeenCalledWith({ name: 'Vendors' });
  });
});
