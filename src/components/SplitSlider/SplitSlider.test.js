import React from 'react';
import renderer from 'react-test-renderer';

import SplitSlider from './SplitSlider';

describe('<SplitSlider />', () => {
  it('renders component correctly', () => {
    const tree = renderer.create(<SplitSlider />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
