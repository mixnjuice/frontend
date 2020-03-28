import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/dashboard';
import ConnectedLink, { DashboardLink } from './Link';
import { withMemoryRouter } from 'utils/testing';

jest.mock('components/Pagination/Pagination', () => {
  const pagination = require('utils/testing').mockComponent('Pagination');

  return {
    withPagination: () => () => pagination,
    pagination
  };
});

describe('Dashboard <Link />', () => {
  const mockStore = configureStore();
  const store = mockStore({ dashboard: initialState });
  const RoutedLink = withMemoryRouter(ConnectedLink);
  const actions = {
    selectDashboard: jest.fn()
  };

  it('renders correctly', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedLink to="#home" name="Home">
              Dashboard
            </RoutedLink>
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('can select', () => {
    const component = renderer.create(
      <DashboardLink actions={actions} to="#home" name="Home">
        Link
      </DashboardLink>
    );
    const { instance } = component.root.findByType(DashboardLink);

    expect(instance).toBeDefined();
    instance.select('Home');
    expect(actions.selectDashboard).toHaveBeenCalledWith({
      item: null,
      name: 'Home'
    });
  });
});
