import { render } from '@testing-library/react';
import React from 'react';

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
    const { asFragment } = render(
      <RecipeDetails
        maxVg={false}
        percentVg={75}
        shakeAndVape={false}
        steepDays={7}
        flavors={flavors}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
