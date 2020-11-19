import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import { initialState as appInitialState } from 'reducers/application';
import {
  initialState as flavorInitialState,
  actions as flavorActions
} from 'reducers/flavor';
import { initialState as flavorsInitialState } from 'reducers/flavors';

import { isLoggedIn } from 'selectors/application';
import { getStash, isLoaded } from 'selectors/flavor';

import { Flavors } from './Flavors';

jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => dispatch)
  };
});

jest.mock('selectors/application', () => {
  return {
    isLoggedIn: jest.fn()
  };
});

jest.mock('selectors/flavor', () => {
  return {
    getStash: jest.fn(),
    isLoaded: jest.fn()
  };
});

describe('Page <Flavors />', () => {
  const mockStore = configureStore();
  const store = mockStore({
    application: appInitialState,
    flavor: flavorInitialState,
    flavors: flavorsInitialState
  });
  const collection = [
    {
      id: '1',
      vendorId: 3,
      name: '27 Bears',
      slug: null,
      density: null,
      Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
    },
    {
      id: '2',
      vendorId: 3,
      name: '27 Fish',
      slug: null,
      density: null,
      Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
    },
    {
      id: '3',
      vendorId: 3,
      name: 'Acai',
      slug: null,
      density: null,
      Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
    },
    {
      id: '4',
      vendorId: 3,
      name: 'Amaretto',
      slug: null,
      density: null,
      Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
    },
    {
      id: '5',
      vendorId: 3,
      name: 'Anise',
      slug: null,
      density: null,
      Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
    }
  ];
  const stash = [
    {
      userId: '1',
      flavorId: '1',
      created: '2020-03-02T12:10:33.787Z',
      minMillipercent: null,
      maxMillipercent: null,
      UserId: '1',
      Flavor: {
        id: '1',
        vendorId: 3,
        name: '27 Bears',
        slug: null,
        density: null,
        Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
      }
    },
    {
      userId: '1',
      flavorId: '2',
      created: '2020-03-02T12:10:34.135Z',
      minMillipercent: null,
      maxMillipercent: null,
      UserId: '1',
      Flavor: {
        id: '2',
        vendorId: 3,
        name: '27 Fish',
        slug: null,
        density: null,
        Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
      }
    },
    {
      userId: '1',
      flavorId: '3',
      created: '2020-03-02T12:10:34.641Z',
      minMillipercent: null,
      maxMillipercent: null,
      UserId: '1',
      Flavor: {
        id: '3',
        vendorId: 3,
        name: 'Acai',
        slug: null,
        density: null,
        Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
      }
    },
    {
      userId: '1',
      flavorId: '4',
      created: '2020-03-02T12:10:36.265Z',
      minMillipercent: null,
      maxMillipercent: null,
      UserId: '1',
      Flavor: {
        id: '4',
        vendorId: 3,
        name: 'Amaretto',
        slug: null,
        density: null,
        Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
      }
    }
  ];

  const pager = { count: 5, limit: 20, page: 1, pages: 1 };
  const pagerNavigation = <p></p>;

  const props = {
    collection,
    pager,
    pagerNavigation
  };

  const ReduxConnectedFlavors = (flavorsProps) => (
    <Provider store={store}>
      <Flavors {...flavorsProps} />
    </Provider>
  );

  beforeEach(() => {
    useDispatch().mockClear();
    isLoggedIn.mockClear();
    getStash.mockClear();
    isLoaded.mockClear();
  });

  it('renders correctly when stash is not loaded', () => {
    isLoggedIn.mockReturnValue(true);
    getStash.mockReturnValue([]);
    isLoaded.mockReturnValue(false);

    const { asFragment } = render(<ReduxConnectedFlavors {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when user is not logged in', () => {
    isLoggedIn.mockReturnValue(false);
    getStash.mockReturnValue([]);
    isLoaded.mockReturnValue(false);

    const { asFragment } = render(<ReduxConnectedFlavors {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders current user flavors correctly', () => {
    isLoggedIn.mockReturnValue(true);
    getStash.mockReturnValue(stash);
    isLoaded.mockReturnValue(true);

    const { asFragment, getByTestId } = render(
      <ReduxConnectedFlavors {...props} />
    );

    fireEvent.click(getByTestId('stash-toggle'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('can handle stashToggle', () => {
    isLoggedIn.mockReturnValue(true);
    getStash.mockReturnValue(stash);
    isLoaded.mockReturnValue(true);

    const { asFragment, getByTestId } = render(
      <ReduxConnectedFlavors {...props} />
    );

    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(getByTestId('stash-toggle'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('can handle addToStash', () => {
    isLoggedIn.mockReturnValue(true);
    getStash.mockReturnValue([]);
    isLoaded.mockReturnValue(true);

    const { getByTestId } = render(<ReduxConnectedFlavors {...props} />);

    fireEvent.click(getByTestId('stash-toggle'));
    fireEvent.click(getByTestId(`stash-icon-2`));

    expect(useDispatch()).toHaveBeenLastCalledWith(
      flavorActions.addStash({ id: '2' })
    );
  });

  it('can handle removeFromStash', () => {
    isLoggedIn.mockReturnValue(true);
    getStash.mockReturnValue(stash);
    isLoaded.mockReturnValue(true);

    const { getByTestId } = render(<ReduxConnectedFlavors {...props} />);

    fireEvent.click(getByTestId('stash-toggle'));
    fireEvent.click(getByTestId(`stash-icon-2`));

    expect(useDispatch()).toHaveBeenLastCalledWith(
      flavorActions.removeStash({ id: '2' })
    );
  });
});
