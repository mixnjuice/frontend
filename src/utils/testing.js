import React, { createElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

/**
 * Creates a mock component which takes a set of props specified at runtime.
 *
 * @param {string} name The component/element name (in PascalCase)
 * @param {object} props An object containing props to setup
 * @return {object} Mock component with specified name and props
 */
export const mockComponent = (name, props = {}) => () =>
  createElement(name, props, props.children);

/**
 * Creates a mock component which will expose its props for snapshot testing purposes
 * @param {*} name The component/element name (in PascalCase)
 */
export const mockComponentWithProps = (name) => (props) =>
  createElement(name, props, props.children);

/**
 * Wraps a React component in a <MemoryRouter> suitable for testing.
 *
 * @param {Component} WrappedComponent React component to wrap
 */
export const withMemoryRouter = (WrappedComponent, routerProps = {}) => (
  props
) => (
  <MemoryRouter {...routerProps}>
    <WrappedComponent {...props} />
  </MemoryRouter>
);

/**
 * Wraps a React component in a <Provider> suitable for testing.
 *
 * @param {Component} WrappedComponent React component to wrap
 * @param {object} store Mock store
 */
export const withProvider = (WrappedComponent, store) => (props) => (
  <Provider store={store}>
    <WrappedComponent {...props} />
  </Provider>
);
