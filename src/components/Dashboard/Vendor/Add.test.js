import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/vendors';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import ConnectedVendorAdd, { VendorAdd } from './Add';
import { withMemoryRouter } from 'utils/testing';

describe('Dashboard <VendorAdd />', () => {
  const layoutOptions = {
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
  const actions = {
    selectDashboard: jest.fn(),
    createVendor: jest.fn()
  };
  const props = {
    layoutOptions,
    actions
  };
  const RoutedVendorAdd = withMemoryRouter(ConnectedVendorAdd);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedVendorAdd {...props} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can handleSubmit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <VendorAdd actions={actions} layoutOptions={layoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(VendorAdd);

    expect(instance).toBeDefined();
    instance.handleSubmit({ name: 'Yummies', slug: 'yummies', code: 'YUM' });
    expect(actions.createVendor).toHaveBeenCalledWith({
      name: 'Yummies',
      slug: 'yummies',
      code: 'YUM'
    });
    expect(actions.selectDashboard).toHaveBeenCalledWith({ name: 'Vendors' });
  });
});
