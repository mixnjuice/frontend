import React from 'react';
import renderer from 'react-test-renderer';

import SplitSlider from './SplitSlider';

describe('<SplitSlider />', () => {
  it('renders component correctly', () => {
    const tree = renderer
      .create(
        <SplitSlider name="test" initialValue={50} onChange={jest.fn()} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
