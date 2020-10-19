import { render, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import { useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './App';
import { withMemoryRouter, withProvider } from 'utils/testing';
import { actions as appActions } from 'reducers/application';
import { initialState } from 'reducers';

jest.mock('components/ToastDrawer/ToastDrawer', () =>
  require('utils/testing').mockComponent('toast-drawer')
);
jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => dispatch)
  };
});

describe('<App />', () => {
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const authedStore = mockStore({
    ...initialState,
    application: {
      ...initialState.application,
      authorization: {
        accessToken: '1234',
        expiration: dayjs().add(60, 'minutes')
      },
      user: {
        id: 123,
        name: 'Doe',
        emailAddress: 'jest@mixnjuice.com'
      }
    }
  });

  it('calls initApp', () => {
    const dispatch = useDispatch();
    const RoutedApp = withMemoryRouter(App);
    const ConnectedApp = withProvider(RoutedApp, store);

    render(<ConnectedApp />);

    expect(dispatch).toHaveBeenCalledWith(appActions.initApp());
  });

  it('renders home by default', () => {
    const RoutedApp = withMemoryRouter(App);
    const ConnectedApp = withProvider(RoutedApp, store);
    const { getByText } = render(<ConnectedApp />);

    expect(getByText('Welcome to MixNJuice!')).toBeInTheDocument();
  });

  it('renders login page', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/login']
    });
    const ConnectedApp = withProvider(RoutedApp, store);
    const { getAllByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(getAllByText('Login')[0]).toBeInTheDocument();
    });
  });

  it('renders register page', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/register']
    });
    const ConnectedApp = withProvider(RoutedApp, store);
    const { getByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(getByText('User Registration')).toBeInTheDocument();
    });
  });

  it('renders profile page', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/user/profile']
    });
    const ConnectedApp = withProvider(RoutedApp, authedStore);
    const { getByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(
        getByText(
          'This is what other users see when they look at your profile.'
        )
      ).toBeInTheDocument();
    });
  });

  it('renders user recipes page', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/user/recipes']
    });
    const ConnectedApp = withProvider(RoutedApp, authedStore);
    const { getByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(getByText('Recipes')).toBeInTheDocument();
    });
  });

  it('renders favorites page', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/user/favorites']
    });
    const ConnectedApp = withProvider(RoutedApp, authedStore);
    const { getByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(getByText('User Favorites')).toBeInTheDocument();
    });
  });

  it('renders flavor stash page', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/user/flavor-stash']
    });
    const ConnectedApp = withProvider(RoutedApp, authedStore);
    const { getByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(getByText('No flavors in stash.')).toBeInTheDocument();
    });
  });

  it('renders user settings page', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/user/settings']
    });
    const ConnectedApp = withProvider(RoutedApp, authedStore);
    const { getByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(getByText('User Settings')).toBeInTheDocument();
    });
  });

  it('renders shopping list page', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/user/shopping-list']
    });
    const ConnectedApp = withProvider(RoutedApp, authedStore);
    const { getByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(getByText('Shopping List')).toBeInTheDocument();
    });
  });

  it('renders recipe editor page', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/recipe/editor']
    });
    const ConnectedApp = withProvider(RoutedApp, authedStore);
    const { getByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(getByText('Recipe Editor')).toBeInTheDocument();
    });
  });

  it('renders dashboard page', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/dashboard']
    });
    const ConnectedApp = withProvider(RoutedApp, authedStore);
    const { getAllByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(getAllByText('Dashboard')[1]).toBeInTheDocument();
    });
  });

  it('renders flavors page', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/flavors']
    });
    const ConnectedApp = withProvider(RoutedApp, store);
    const { getAllByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(getAllByText('Flavors')[1]).toBeInTheDocument();
    });
  });

  it('renders recipe page', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/recipe/1']
    });
    const ConnectedApp = withProvider(RoutedApp, store);
    const { getByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(getByText('Not Found')).toBeInTheDocument();
    });
  });

  it('redirects to login for private route', async () => {
    const RoutedApp = withMemoryRouter(App, {
      initialEntries: ['/user/recipes']
    });
    const ConnectedApp = withProvider(RoutedApp, store);
    const { getByText } = render(<ConnectedApp />);

    await waitFor(() => {
      expect(getByText('Email address')).toBeInTheDocument();
    });
  });
});
