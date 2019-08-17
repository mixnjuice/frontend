import React from 'react';
import renderer from 'react-test-renderer';

import { Recipes } from './Recipes';

describe('<Recipes />', () => {
  const actions = {
    registerUser: jest.fn(),
    popToast: jest.fn()
  };

  it('renders correctly', () => {
    const component = renderer.create(<Recipes appActions={actions} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('handles favorite clicks', () => {
    const component = renderer.create(<Recipes appActions={actions} />);

    const { instance } = component.root.findByType(Recipes);

    expect(instance).toBeDefined();
    instance.handleFavoriteClick(0);
    expect(instance.state.recipes[0]).toBeDefined();
    expect(instance.state.recipes[0]).toEqual({
      favorited: true,
      favoriteIcon: ['fas', 'heart']
    });

    instance.handleFavoriteClick(0);
    expect(instance.state.recipes[0]).toEqual({
      favorited: false,
      favoriteIcon: ['far', 'heart']
    });
  });
});
