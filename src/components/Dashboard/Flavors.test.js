import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/flavors';
import ConnectedFlavors from './Flavors';
import { withMemoryRouter, withProvider } from 'utils/testing';

jest.mock('components/Pagination/Pagination', () => {
  const pagination = require('utils/testing').mockComponent('Pagination');

  return {
    withPagination: () => () => pagination,
    pagination
  };
});

describe('Dashboard <Flavors />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const mockStore = configureStore();
  const store = mockStore({ flavors: initialState, page: 1 });

  const RoutedFlavors = withMemoryRouter(ConnectedFlavors);
  const DecoratedFlavors = withProvider(RoutedFlavors, store);

  it('renders correctly', () => {
    expect(
      renderer
        .create(<DecoratedFlavors layoutOptions={defaultLayoutOptions} />)
        .toJSON()
    ).toMatchSnapshot();
  });
});
