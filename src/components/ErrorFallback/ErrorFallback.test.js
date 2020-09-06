import { render, waitFor } from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';

import ErrorFallback from './ErrorFallback';
import { actions as appActions } from 'reducers/application';
import { withProvider } from 'utils/testing';

jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => dispatch)
  };
});

describe('<ErrorFallback />', () => {
  const resetErrorBoundary = jest.fn();
  const props = { resetErrorBoundary };
  const mockStore = configureStore();
  const store = mockStore({});
  const ConnectedFallback = withProvider(ErrorFallback, store);

  it('renders correctly', () => {
    const { getByText } = render(<ConnectedFallback {...props} />);

    expect(getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('calls resetErrorBoundary', async () => {
    const { getByText } = render(<ConnectedFallback {...props} />);
    const dispatch = useDispatch();

    expect(getByText('Reload')).toBeInTheDocument();
    getByText('Reload').click();

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(appActions.initApp());
    });
  });
});
