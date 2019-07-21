import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import App from './App';
import { withMemoryRouter } from 'utils';

jest.mock('components/Header/Header', () =>
  require('utils').mockComponent('Header')
);
jest.mock('pages/NotFound', () => require('utils').mockComponent('NotFound'));
jest.mock('pages/Home', () => require('utils').mockComponent('Home'));
jest.mock('pages/Login', () => require('utils').mockComponent('Login'));
jest.mock('pages/Register', () => require('utils').mockComponent('Register'));
jest.mock('pages/user/Profile', () =>
  require('utils').mockComponent('Profile')
);
jest.mock('pages/user/Recipes', () =>
  require('utils').mockComponent('Recipes')
);
jest.mock('pages/user/Favorites', () =>
  require('utils').mockComponent('Favorites')
);
jest.mock('pages/user/FlavorStash', () =>
  require('utils').mockComponent('FlavorStash')
);
jest.mock('pages/user/Settings', () =>
  require('utils').mockComponent('Settings')
);
jest.mock('pages/user/ShoppingList', () =>
  require('utils').mockComponent('ShoppingList')
);
jest.mock('pages/Calculator', () =>
  require('utils').mockComponent('Calculator')
);
jest.mock('pages/Flavors', () => require('utils').mockComponent('Flavors'));
jest.mock('pages/Recipe', () => require('utils').mockComponent('Recipe'));

describe('<App />', () => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('renders home by default', () => {
    const RoutedApp = withMemoryRouter(App);
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders login page', () => {
    const RoutedApp = withMemoryRouter(App, { initialEntries: ['/login'] });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders register page', () => {
    const RoutedApp = withMemoryRouter(App, { initialEntries: ['/register'] });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders profile page', () => {
    const RoutedApp = withMemoryRouter(App, { initialEntries: ['/profile'] });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders user recipes page', () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/user-recipes']
    });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders favorites page', () => {
    const RoutedApp = withMemoryRouter(App, { initialEntries: ['/favorites'] });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders flavor stash page', () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/flavor-stash']
    });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders user settings page', () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/userSettings']
    });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders shopping list page', () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/shopping-list']
    });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders calculator page', () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/calculator']
    });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders flavors page', () => {
    const RoutedApp = withMemoryRouter(App, { initialEntries: ['/flavors'] });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders recipe page', () => {
    const RoutedApp = withMemoryRouter(App, { initialEntries: ['/recipe'] });
    const component = renderer.create(
      <Provider store={store}>
        <RoutedApp />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
