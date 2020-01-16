import React from 'react';
import renderer from 'react-test-renderer';

import LazyLoaderFallback from './LazyLoaderFallback';
import { withMemoryRouter } from 'utils';

describe('<LazyLoaderFallback />', () => {
  it('renders correctly', () => {
    const RoutedFallback = withMemoryRouter(LazyLoaderFallback);
    const component = renderer.create(<RoutedFallback />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
