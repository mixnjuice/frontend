import React from 'react';
import renderer from 'react-test-renderer';

import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('renders correctly', () => {
    const component = renderer.create(<NotFound />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
