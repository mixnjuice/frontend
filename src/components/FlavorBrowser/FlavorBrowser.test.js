import React from 'react';
import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import FlavorBrowser from './FlavorBrowser';
import { actions as flavorActions } from 'reducers/flavor';
import { withProvider } from 'utils/testing';

jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => dispatch)
  };
});

describe('<FlavorBrowser />', () => {
  const stash = [
    {
      Flavor: {
        name: 'Test',
        id: '123',
        Vendor: { code: 'CAP', name: 'Capella' }
      }
    },
    {
      Flavor: {
        name: 'Another',
        id: '456',
        Vendor: { code: 'FLV', name: 'Flavorah' }
      }
    }
  ];
  const recipe = {
    ingredients: []
  };
  const mockStore = configureStore();

  it('renders correctly', () => {
    const initialState = {
      flavor: {
        loaded: true,
        stash
      },
      recipe: {
        activeRecipe: recipe
      }
    };
    const store = mockStore(initialState);
    const ConnectedFlavorBrowser = withProvider(FlavorBrowser, store);
    const { asFragment } = render(<ConnectedFlavorBrowser />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('loads stash if necessary', async () => {
    const unloadedState = {
      flavor: {
        loaded: false,
        stash: []
      },
      recipe: {
        activeRecipe: recipe
      }
    };
    const unloadedStore = mockStore(unloadedState);
    const ConnectedFlavorBrowser = withProvider(FlavorBrowser, unloadedStore);
    const dispatch = useDispatch();

    render(<ConnectedFlavorBrowser />);

    expect(dispatch).toHaveBeenCalledWith(flavorActions.requestStash());
  });
});
