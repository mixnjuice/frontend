import React from 'react';
import renderer from 'react-test-renderer';

import Recipe from './Recipe';
import recipes from '../data/recipes.json';

describe('<Recipe />', () => {
  const actions = {
    registerUser: jest.fn()
  };
  const props = search => ({
    location: {
      search
    }
  });

  it('renders correctly', () => {
    const component = renderer.create(<Recipe {...props('?id=1')} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can findRecipe', () => {
    const component = renderer.create(
      <Recipe actions={actions} {...props('?id=1')} />
    );
    const { instance } = component.root.findByType(Recipe);

    expect(instance).toBeDefined();
    instance.findRecipe();
    expect(instance.state).toEqual({ ...recipes[0], flavorTotal: 9 });
  });
});
