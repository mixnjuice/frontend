import React from 'react';
import renderer from 'react-test-renderer';

import Recipes from './Recipes';

describe('<Recipes />', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Recipes />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
