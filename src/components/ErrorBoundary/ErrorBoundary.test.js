import { render } from '@testing-library/react';
import React from 'react';

import ErrorBoundary from './ErrorBoundary';

describe('<ErrorBoundary />', () => {
  const TestComponent = () => <p>Test</p>;
  const TestErrorComponent = (props) => props.bogus.something;

  it('renders the page if there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('renders an error page if there is an error', () => {
    window.addEventListener('error', (event) => {
      // suppress console message about this error
      event.preventDefault();
    });

    const { asFragment } = render(
      <ErrorBoundary>
        <TestErrorComponent />
      </ErrorBoundary>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
