import { render, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import Register from './Register';
import { initialState, actions as appActions } from 'reducers/application';
import { withMemoryRouter, withProvider } from 'utils/testing';

jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => dispatch)
  };
});

describe('<Register />', () => {
  const mockStore = configureStore();
  const store = mockStore({ application: initialState });
  const RoutedRegister = withMemoryRouter(Register);
  const ConnectedRegister = withProvider(RoutedRegister, store);

  it('renders correctly', () => {
    const { asFragment } = render(<ConnectedRegister />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('can handleSubmit', async () => {
    const dispatch = useDispatch();
    const username = 'jestuser';
    const emailAddress = 'jest@mixnjuice.com';
    const password = 'testpass';
    const { getByTestId, getByLabelText } = render(<ConnectedRegister />);

    fireEvent.change(getByLabelText('Username'), {
      target: { value: username }
    });
    fireEvent.change(getByLabelText('Email Address'), {
      target: { value: emailAddress }
    });
    fireEvent.change(getByLabelText('Confirm Email Address'), {
      target: { value: emailAddress }
    });
    fireEvent.change(getByLabelText('Password'), {
      target: { value: password }
    });
    fireEvent.change(getByLabelText('Confirm Password'), {
      target: { value: password }
    });
    fireEvent.click(getByTestId('terms-checkbox'));
    fireEvent.submit(getByTestId('register-form'));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        appActions.registerUser({
          emailAddress: emailAddress,
          emailAddressConfirm: emailAddress,
          password: password,
          passwordConfirm: password,
          termsAgreed: true,
          username
        })
      );
    });
  });
});
