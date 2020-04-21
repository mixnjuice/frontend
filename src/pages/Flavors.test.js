import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { initialState as appInitialState } from 'reducers/application';
import { initialState as flavorInitialState } from 'reducers/flavor';
import { initialState as flavorsInitialState } from 'reducers/flavors';
import ConnectedFlavors, { Flavors } from './Flavors';
import { withMemoryRouter } from 'utils/testing';

jest.mock('components/Pagination/Pagination', () => {
  const pagination = require('utils/testing').mockComponent('Pagination');
  const PagerInfo = require('utils/testing').mockComponent('PagerInfo');

  return {
    withPagination: () => () => pagination,
    pagination,
    PagerInfo
  };
});
jest.mock('components/ToggleButton/ToggleButton', () =>
  require('utils/testing').mockComponent('ToggleButton')
);

describe('Page <Flavors />', () => {
  const mockStore = configureStore();
  const actions = {
    requestStash: jest.fn(),
    requestFlavors: jest.fn(),
    addStash: jest.fn(),
    removeStash: jest.fn()
  };

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
  const store = mockStore({
    actions,
    application: appInitialState,
    flavor: flavorInitialState,
    flavors: flavorsInitialState
  });

  const pagerNavigation = <p></p>;

  const notLoggedInProps = {
    actions,
    collection,
    loggedIn: false,
    pager,
    pagerNavigation,
    stash,
    stashLoaded: false
  };

  const noStashProps = {
    actions,
    collection,
    loggedIn: true,
    pager,
    pagerNavigation,
    stash,
    stashLoaded: false
  };

  const props = {
    actions,
    collection,
    loggedIn: true,
    pager,
    pagerNavigation,
    stash,
    stashLoaded: true
  };

  const RoutedConnectedFlavors = withMemoryRouter(ConnectedFlavors);
  const RoutedFlavors = withMemoryRouter(Flavors);

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedConnectedFlavors />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders correctly when stash is not loaded', () => {
    expect(
      renderer.create(<RoutedFlavors {...noStashProps} />).toJSON()
    ).toMatchSnapshot();
  });

  it('renders correctly when user is not logged in', () => {
    expect(
      renderer.create(<RoutedFlavors {...notLoggedInProps} />).toJSON()
    ).toMatchSnapshot();
  });

  const component = renderer.create(<RoutedFlavors {...props} />);

  const { instance } = component.root.findByType(Flavors);

  it('renders current user flavors correctly', () => {
    const tree = renderer.create(<RoutedFlavors {...props} />).toJSON;

    expect(tree).toMatchSnapshot();
  });

  it('can handle stashToggle', () => {
    const event = {
      target: { name: 'stashToggle', checked: true }
    };

    expect(instance.handleStashToggle).toBeDefined();
    instance.handleStashToggle(event);
    expect(instance.state.holdings).toEqual({
      1: true,
      2: true,
      3: true,
      4: true
    });
    expect(instance.state.stashToggle).toEqual(true);
  });

  it('can handle addToStash', () => {
    const id = 5;

    expect(instance.addToStash).toBeDefined();
    instance.addToStash(id);
    expect(actions.addStash).toBeCalledWith({ id });
    expect(instance.state.holdings).toEqual({
      1: true,
      2: true,
      3: true,
      4: true,
      5: true
    });
  });

  it('can handle removeFromStash', () => {
    const id = 5;

    expect(instance.removeFromStash).toBeDefined();
    instance.removeFromStash(id);
    expect(actions.removeStash).toBeCalledWith({ id });
    expect(instance.state.holdings).toEqual({
      1: true,
      2: true,
      3: true,
      4: true,
      5: false
    });
  });
});
