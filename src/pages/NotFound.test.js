import { render } from '@testing-library/react';
import React from 'react';

import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<NotFound />);

    expect(asFragment()).toMatchSnapshot();
  });
});
