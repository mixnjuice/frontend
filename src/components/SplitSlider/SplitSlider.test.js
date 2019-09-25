import React from 'react';
import renderer from 'react-test-renderer';

import SplitSlider from './SplitSlider';

describe('<SplitSlider />', () => {
  it('renders component correctly', () => {
    const tree = renderer.create(<SplitSlider initialValue={50} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
