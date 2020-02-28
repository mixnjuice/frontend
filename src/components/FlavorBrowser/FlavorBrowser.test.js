import React from 'react';
import renderer from 'react-test-renderer';

import { FlavorBrowser } from './FlavorBrowser';

describe('<FlavorBrowser />', () => {
  const actions = {
    requestStash: jest.fn(),
    setRecipeIngredients: jest.fn(),
    setRecipePercentages: jest.fn()
  };
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
  const props = {
    stashLoaded: true,
    actions,
    recipe,
    stash
  };

  beforeEach(() => {
    actions.requestStash.mockReset();
    actions.setRecipeIngredients.mockReset();
  });

  it('renders correctly', () => {
    const component = renderer.create(<FlavorBrowser {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('calls requestStash if stash is not loaded', () => {
    renderer.create(<FlavorBrowser actions={actions} stashLoaded={false} />);

    expect(actions.requestStash).toHaveBeenCalled();
  });
});
