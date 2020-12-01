import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import Login from './Login';
import { initialState, actions as appActions } from 'reducers/application';
import { withMemoryRouter, withProvider } from 'utils/testing';

jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => dispatch)
  };
});

describe('<Login />', () => {
  const mockStore = configureStore();
  const store = mockStore({ application: initialState });
  const RoutedLogin = withMemoryRouter(Login);
  const ConnectedLogin = withProvider(RoutedLogin, store);

  it('renders correctly', () => {
    const { asFragment } = render(<ConnectedLogin />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('can handleSubmit', async () => {
    const emailAddress = 'some@one.org';
    const password = 'testpass';
    const dispatch = useDispatch();
    const { getByTestId, getByLabelText } = render(<ConnectedLogin />);

    fireEvent.change(getByLabelText('Email address'), {
      target: { value: emailAddress }
    });
    fireEvent.change(getByLabelText('Password'), {
      target: { value: password }
    });
    fireEvent.submit(getByTestId('login-form'));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        appActions.loginUser(emailAddress, password)
      );
    });
  });
});
