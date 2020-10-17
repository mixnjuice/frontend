import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import React from 'react';
import configureStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';

import Header from './Header';
import { actions as appActions } from 'reducers/application';
import { withMemoryRouter, withProvider } from 'utils/testing';

jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => dispatch)
  };
});

describe('<Header />', () => {
  const loggedInState = {
    application: {
      authorization: {
        accessToken: '1234',
        expiration: dayjs().add(1, 'hour')
      },
      user: {
        emailAddress: 'jest@mixnjuice.com'
      }
    }
  };
  const loggedOutState = {
    application: {
      authorization: {},
      user: null
    }
  };
  const mockStore = configureStore();
  const loggedInStore = mockStore(loggedInState);
  const loggedOutStore = mockStore(loggedOutState);
  const RoutedHeader = withMemoryRouter(Header);
  const LoggedInHeader = withProvider(RoutedHeader, loggedInStore);
  const LoggedOutHeader = withProvider(RoutedHeader, loggedOutStore);

  it('renders logged out correctly', () => {
    expect(render(<LoggedOutHeader />).asFragment()).toMatchSnapshot();
  });

  it('renders logged in correctly', () => {
    expect(render(<LoggedInHeader />).asFragment()).toMatchSnapshot();
  });

  it('can logoutUser', async () => {
    const dispatch = useDispatch();
    const { getByText, getByAltText } = render(<LoggedInHeader />);
    const userBadge = getByAltText('User');

    expect(userBadge).toBeInTheDocument();

    userEvent.click(userBadge);

    await waitFor(() => getByText('Logout'));
    getByText('Logout').click();

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(appActions.logoutUser());
    });
  });

  it('can render gravatar', () => {
    const { getByAltText, asFragment } = render(<LoggedInHeader />);
    const gravatar = getByAltText('User');

    expect(gravatar).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
