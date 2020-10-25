import { render } from '@testing-library/react';
import React from 'react';

import IngredientBar from './IngredientBar';

describe('<IngredientBar />', () => {
  const props = {
    nicotine: 20,
    flavor: 10,
    vg: 60,
    pg: 10
  };

  it('renders correctly', () => {
    const { asFragment } = render(<IngredientBar {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
