import React from 'react';
import renderer from 'react-test-renderer';

import SuspenseFallback from './SuspenseFallback';
import { withMemoryRouter } from 'utils/testing';
jest.mock('components/Header/Header', () =>
  require('utils/testing').mockComponent('Header')
);

describe('<SuspenseFallback />', () => {
  it('renders correctly', () => {
    const RoutedFallback = withMemoryRouter(SuspenseFallback);
    const component = renderer.create(<RoutedFallback />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
