import { render } from '@testing-library/react';
import React from 'react';

import SplitSlider from './SplitSlider';

describe('<SplitSlider />', () => {
  it('renders component correctly', () => {
    const { asFragment } = render(
      <SplitSlider name="test" initialValue={50} onChange={jest.fn()} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
