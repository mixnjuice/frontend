import dayjs from 'dayjs';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import ConnectedApp, { App } from './App';
import { withMemoryRouter } from 'utils/testing';
import { initialState } from 'reducers/application';

jest.mock('components/Footer/Footer', () =>
  require('utils/testing').mockComponent('Footer')
);
jest.mock('components/Header/Header', () =>
  require('utils/testing').mockComponent('Header')
);
jest.mock('components/ToastDrawer/ToastDrawer', () =>
  require('utils/testing').mockComponent('ToastDrawer')
);
jest.mock('pages', () => {
  const { mockComponent } = require('utils/testing');

  return {
    Dashboard: mockComponent('Dashboard'),
    Favorites: mockComponent('Favorites'),
    Flavors: mockComponent('Flavors'),
    FlavorStash: mockComponent('FlavorStash'),
    Home: mockComponent('Home'),
    Login: mockComponent('Login'),
    NotFound: mockComponent('NotFound'),
    Profile: mockComponent('Profile'),
    Recipe: mockComponent('Recipe'),
    RecipeEditor: mockComponent('RecipeEditor'),
    Recipes: mockComponent('Recipes'),
    Register: mockComponent('Register'),
    ShoppingList: mockComponent('ShoppingList'),
    UserRecipes: mockComponent('UserRecipes'),
    UserSettings: mockComponent('UserSettings')
  };
});

describe('<App />', () => {
  const actions = {
    initApp: jest.fn()
  };
  const mockStore = configureStore();
  const store = mockStore({ application: initialState });
  const authedStore = mockStore({
    application: {
      ...initialState,
      authorization: {
        accessToken: '1234',
        expiration: dayjs().add(60, 'minutes')
      },
      user: {
        id: 123,
        name: 'Doe'
      }
    }
  });

  afterEach(() => {
    actions.initApp.mockReset();
  });

  it('calls initApp', () => {
    const RoutedApp = withMemoryRouter(App);

    renderer.create(
      <Provider store={store}>
        <RoutedApp actions={actions} />
      </Provider>
    );

    expect(actions.initApp).toHaveBeenCalled();
  });

  it('renders home by default', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp);
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders login page', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/login']
    });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders register page', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/register']
    });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders profile page', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/user/profile']
    });
    const component = renderer.create(
      <Provider store={authedStore}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders user recipes page', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/user/recipes']
    });
    const component = renderer.create(
      <Provider store={authedStore}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders favorites page', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/user/favorites']
    });
    const component = renderer.create(
      <Provider store={authedStore}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders flavor stash page', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/user/flavor-stash']
    });
    const component = renderer.create(
      <Provider store={authedStore}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders user settings page', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/user/settings']
    });
    const component = renderer.create(
      <Provider store={authedStore}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders shopping list page', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/user/shopping-list']
    });
    const component = renderer.create(
      <Provider store={authedStore}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders recipe editor page', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/recipe/editor']
    });
    const component = renderer.create(
      <Provider store={authedStore}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders dashboard page', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/dashboard']
    });
    const component = renderer.create(
      <Provider store={authedStore}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders flavors page', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/flavors']
    });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders recipe page', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/recipe']
    });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('redirects to login for private route', () => {
    const RoutedApp = withMemoryRouter(ConnectedApp, {
      initialEntries: ['/user/recipes']
    });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
