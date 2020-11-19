import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions as flavorActions } from 'reducers/flavor';

import PaginatedFlavors, { Flavors } from './Flavors';

jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => dispatch),
    useSelector: jest.fn()
  };
});

jest.mock('components/Pagination/Pagination', () => {
  const pagination = () => <div>Pagination</div>;
  const PagerInfo = () => <div>PagerInfo</div>;

  return {
    withPagination: () => () => pagination,
    pagination,
    PagerInfo
  };
});

describe('Page <Flavors />', () => {
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

  beforeEach(() => {
    useDispatch().mockClear();
    useSelector.mockClear();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<PaginatedFlavors />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when stash is not loaded', () => {
    useSelector
      .mockReturnValueOnce(true)
      .mockReturnValueOnce([])
      .mockReturnValueOnce(false);

    const { asFragment } = render(<Flavors {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when user is not logged in', () => {
    useSelector.mockReturnValueOnce(false).mockReturnValue(null);

    const { asFragment } = render(<Flavors {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders current user flavors correctly', () => {
    useSelector
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(stash)
      .mockReturnValueOnce(true);

    const { asFragment } = render(<Flavors {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('can handle stashToggle', () => {
    useSelector
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(stash)
      .mockReturnValueOnce(true);

    const { asFragment, getByTestId } = render(<Flavors {...props} />);

    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(getByTestId('stash-toggle'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('can handle addToStash', () => {
    useSelector
      .mockReturnValueOnce(true)
      .mockReturnValueOnce([])
      .mockReturnValueOnce(true);

    const { getByTestId } = render(<Flavors {...props} />);

    fireEvent.click(getByTestId('stash-toggle'));
    fireEvent.click(getByTestId(`stash-icon-2`));

    expect(useDispatch()).toHaveBeenLastCalledWith(
      flavorActions.addStash({ id: '2' })
    );
  });

  it('can handle removeFromStash', () => {
    useSelector
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(stash)
      .mockReturnValueOnce(true);

    const { getByTestId } = render(<Flavors {...props} />);

    fireEvent.click(getByTestId('stash-toggle'));
    fireEvent.click(getByTestId(`stash-icon-2`));

    expect(useDispatch()).toHaveBeenLastCalledWith(
      flavorActions.removeStash({ id: '2' })
    );
  });
});
