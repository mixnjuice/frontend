import { render } from '@testing-library/react';
import React from 'react';

import SuspenseFallback from './SuspenseFallback';
import { withMemoryRouter } from 'utils/testing';

jest.mock('components/Header/Header', () =>
  require('utils/testing').mockComponent('header')
);

describe('<SuspenseFallback />', () => {
  it('renders correctly', () => {
    const RoutedFallback = withMemoryRouter(SuspenseFallback);
    const { asFragment } = render(<RoutedFallback />);

    expect(asFragment()).toMatchSnapshot();
  });
});
