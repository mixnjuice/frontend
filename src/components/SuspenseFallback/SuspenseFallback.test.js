import React from 'react';
import renderer from 'react-test-renderer';

import SuspenseFallback from './SuspenseFallback';
import { withMemoryRouter } from 'utils';
jest.mock('components/Header/Header', () =>
  require('utils').mockComponent('Header')
);

describe('<SuspenseFallback />', () => {
  it('renders correctly', () => {
    const RoutedFallback = withMemoryRouter(SuspenseFallback);
    const component = renderer.create(<RoutedFallback />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
