import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/flavors';
import ConnectedFlavors, { Flavors } from './Flavors';
import { withMemoryRouter } from 'utils';

describe('Dashboard <Flavors />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
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

  const RoutedFlavors = withMemoryRouter(ConnectedFlavors);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedFlavors layoutOptions={defaultLayoutOptions} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can changePage', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedFlavors actions={actions} layoutOptions={defaultLayoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(Flavors);

    expect(instance).toBeDefined();
    instance.changePage(page);
  });

  it('can changeLimit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedFlavors actions={actions} layoutOptions={defaultLayoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(Flavors);

    expect(instance).toBeDefined();
    instance.changeLimit(limit);
  });

  it('can updateLimit', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedFlavors actions={actions} layoutOptions={defaultLayoutOptions} />
      </Provider>
    );
    const { instance } = component.root.findByType(Flavors);

    expect(instance).toBeDefined();
    instance.updateLimit();
  });
});
