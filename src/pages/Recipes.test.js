import { render } from '@testing-library/react';
import React from 'react';

import Recipes from './Recipes';

describe('<Recipes />', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Recipes />);

    expect(asFragment()).toMatchSnapshot();
  });
});
