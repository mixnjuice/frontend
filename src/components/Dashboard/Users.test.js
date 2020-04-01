import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/users';
import { initialState as dashboardInitialState } from 'reducers/dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ConnectedUsers, { Users } from './Users';
import { mockComponent, withMemoryRouter, withProvider } from 'utils/testing';

jest.mock('components/Pagination/Pagination', () => {
  const pagination = require('utils/testing').mockComponent('Pagination');
  const PagerInfo = require('utils/testing').mockComponent('PagerInfo');

  return {
    withPagination: () => () => pagination,
    pagination,
    PagerInfo
  };
});

describe('Dashboard <Users />', () => {
  const defaultLayoutOptions = {
    border: false,
    header: true,
    title: false,
    style: {}
  };
  const mockStore = configureStore();
  const store = mockStore({
    users: initialState,
    dashboard: dashboardInitialState
  });
  const MockPager = mockComponent('Pager');
  const props = {
    collection: [],
    pager: {},
    pagerNavigation: <MockPager />
  };

  const RoutedUsers = withMemoryRouter(ConnectedUsers);
  const DecoratedUsers = withProvider(RoutedUsers, store);

  it('renders correctly', () => {
    expect(
      renderer
        .create(<DecoratedUsers layoutOptions={defaultLayoutOptions} />)
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders getters', () => {
    const component = renderer.create(
      <Users {...props} layoutOptions={defaultLayoutOptions} />
    );
    const { instance } = component.root.findByType(Users);

    expect(instance).toBeDefined();
    expect(instance.yesIcon).toEqual(
      <FontAwesomeIcon icon="check" color="green" title="Yes" />
    );
    expect(instance.noIcon).toEqual(
      <FontAwesomeIcon icon="times" color="red" title="No" />
    );
  });
});
