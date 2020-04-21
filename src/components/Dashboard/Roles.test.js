import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import ConnectedRoles from './Roles';
import { initialState } from 'reducers/roles';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import { withMemoryRouter, withProvider } from 'utils/testing';

jest.mock('components/Pagination/Pagination', () => {
  const pagination = require('utils/testing').mockComponent('Pagination');

  return {
    withPagination: () => () => pagination,
    pagination
  };
});

describe('Dashboard <Roles />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const mockStore = configureStore();
  const store = mockStore({
    roles: initialState,
    dashboard: dashboardInitialState
  });

  const RoutedRoles = withMemoryRouter(ConnectedRoles);
  const ConnectedRoutedRoles = withProvider(RoutedRoles, store);

  it('renders correctly', () => {
    expect(
      renderer
        .create(<ConnectedRoutedRoles layoutOptions={defaultLayoutOptions} />)
        .toJSON()
    ).toMatchSnapshot();
  });
});
