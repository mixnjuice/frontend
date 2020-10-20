import React from 'react';
import renderer from 'react-test-renderer';

import RecipeDetails from './RecipeDetails';

describe('<RecipeDetails />', () => {
  it('renders correctly', () => {
    const flavors = [
      {
        id: 1,
        name: 'Sturgeon Ripe',
        abbreviation: 'TPA',
        percent: 1,
        inStash: true
      }
    ];
    const component = renderer.create(
      <RecipeDetails
        maxVg={false}
        percentVg={75}
        shakeAndVape={false}
        steepDays={7}
        flavors={flavors}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
