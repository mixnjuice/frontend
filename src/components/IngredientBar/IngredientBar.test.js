import React from 'react';
import renderer from 'react-test-renderer';

import IngredientBar from './IngredientBar';

describe('<IngredientBar />', () => {
  const props = {
    nicotine: 20,
    flavor: 10,
    vg: 60,
    pg: 10
  };

  it('renders correctly', () => {
    const component = renderer.create(<IngredientBar {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
