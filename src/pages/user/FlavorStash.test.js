import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import FlavorStash from './FlavorStash';
import { actions as flavorActions } from 'reducers/flavor';
import { withMemoryRouter, withProvider } from 'utils/testing';
import { initialState } from 'reducers';

jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => dispatch)
  };
});

describe('<FlavorStash />', () => {
  const mockStore = configureStore();
  const emptyStore = mockStore(initialState);
  const stashStore = mockStore({
    ...initialState,
    flavor: {
      ...initialState.flavor,
      stash: [
        {
          created: '2020-01-01T00:00:00',
          Flavor: {
            id: 1,
            name: 'Sweet Cream',
            Vendor: { code: 'CAP' }
          }
        },
        {
          created: '2020-01-01T00:00:00',
          Flavor: {
            id: 2,
            name: 'Tatanka',
            Vendor: { code: 'FLV' }
          }
        }
      ]
    }
  });

  it('can render', () => {
    const ConnectedStash = withProvider(FlavorStash, stashStore);
    const { asFragment } = render(<ConnectedStash />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('can render with an empty stash', async () => {
    const dispatch = useDispatch();
    const ConnectedStash = withMemoryRouter(
      withProvider(FlavorStash, emptyStore)
    );
    const { asFragment } = render(<ConnectedStash />);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(flavorActions.requestStash());
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
