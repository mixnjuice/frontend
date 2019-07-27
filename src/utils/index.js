import dayjs from 'dayjs';
import React, { createElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

/* eslint-disable react/display-name, react/prop-types */

/**
 * Creates an object containing action constants namespaced under the specified reducer.
 *
 * @param {string} reducer The name of the reducer or module
 * @param {string[]} actions A list of action names
 * @return {object} Object with action name keys and full action string values
 */
export function buildActions(reducer, actions) {
  const result = {};

  for (const action of actions) {
    result[action] = `${reducer}/${action}`;
  }

  return result;
}

/**
 * Creates a mock component which will expose its props for snapshot testing purposes.
 *
 * @param {string} name The component/element name (e.g. "MyComponent")
 * @param {object} props An object containing props to setup
 * @return {object} Mock component with specified name and props
 */
export const mockComponent = (name, props = {}) => () =>
  createElement(name, props, props.children);

/**
 * Wraps a React component in a <MemoryRouter> suitable for testing
 *
 * @param {Component} WrappedComponent React component to wrap
 */
export const withMemoryRouter = (
  WrappedComponent,
  routerProps = {}
) => props => (
  <MemoryRouter {...routerProps}>
    <WrappedComponent {...props} />
  </MemoryRouter>
);

/**
 * Interpolate strings from the `params` object into the `url`.
 *
 * @param {object} endpoint Object with `url` and optional `params` object
 */
export const buildUrl = endpoint => {
  // this is defined by webpack.DefinePlugin
  const baseUrl = API_URL;
  const { url, params } = endpoint;

  if (!params) {
    return `${baseUrl}${url}`;
  }

  return Object.entries(params).reduce((resultUrl, entry) => {
    const [key, value] = entry;

    return resultUrl.replace(`{${key}}`, value);
  }, `${baseUrl}${url}`);
};

export const getInitialState = () => {
  try {
    const [accessToken, expiration] = [
      localStorage.getItem('accessToken'),
      localStorage.getItem('expiration')
    ];

    if (!accessToken) {
      return {};
    }

    const expirationDate = dayjs(JSON.parse(expiration));

    if (!expirationDate.isValid() || expirationDate.isBefore(dayjs())) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expiration');
      return {};
    }

    return {
      application: {
        authorization: {
          accessToken: JSON.parse(accessToken),
          expiration: expirationDate
        }
      }
    };
  } catch {
    return {};
  }
};
