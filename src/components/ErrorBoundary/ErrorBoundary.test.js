import React from 'react';
import renderer from 'react-test-renderer';

import ErrorBoundary from './ErrorBoundary';
import { mockComponent } from 'utils/testing';

describe('<ErrorBoundary />', () => {
  const TestComponent = mockComponent('Test');

  it('renders the page if there is no error', () => {
    const component = renderer.create(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(component.root.findByType(TestComponent)).toBeDefined();
  });

  it('renders an error page if there is an error', () => {
    const component = renderer.create(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );
    const instance = component.getInstance();

    // instance.state.hasError = true;
    instance.setState({ hasError: true });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
