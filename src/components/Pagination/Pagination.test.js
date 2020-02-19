import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/flavors';
import ConnectedPagination, { withPagination } from './Pagination';
import { withMemoryRouter } from 'utils';

describe('Pagination', () => {
  const mockStore = configureStore();
  const store = mockStore({ flavors: initialState, page: 1 });
  const actions = {
    requestFlavors: jest.fn()
  };

  const page = {
    target: {
      value: 1
    }
  };

  const limit = {
    target: {
      value: 40
    }
  };

  const RoutedPagination = withMemoryRouter(ConnectedPagination);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedPagination />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can changePage', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedPagination actions={actions} />
      </Provider>
    );
    const { instance } = component.root.findByType(RoutedPagination);

    expect(instance).toBeDefined();
    instance.changePage(page);
  });

  it('can changeLimit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedPagination actions={actions} />
      </Provider>
    );
    const { instance } = component.root.findByType(withPagination);

    expect(instance).toBeDefined();
    instance.changeLimit(limit);
  });

  it('can updateLimit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedPagination actions={actions} />
      </Provider>
    );
    const { instance } = component.root.findByType(withPagination);

    expect(instance).toBeDefined();
    instance.updateLimit();
  });
});
