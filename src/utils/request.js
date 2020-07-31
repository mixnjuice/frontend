import axios from 'axios';
import dayjs from 'dayjs';
import { buildUrl } from 'utils';
import { call, race, delay, select, take } from 'redux-saga/effects';

import { types } from 'reducers/application';
import { getAuthorization } from 'selectors/application';

/**
 * Creates a response object indicating successful response from the server.
 *
 * @param {object} response The response body
 */
const successResponse = (response) => ({
  success: true,
  response
});

/**
 * Creates a response object indicating failure with one specific error message.
 *
 * @param {string} message A string indicating the error message.
 */
const failureMessage = (message) => ({
  success: false,
  error: {
    message
  }
});

/**
 * Creates a response object indicating failure with an Error or error object.
 *
 * @param {Error|object} error An object describing the error
 */
const failureResponse = (error) => ({
  success: false,
  error
});

/**
 * Make an XMLHttpRequest to the specified endpoint with the specified request data.
 *
 * @param {object} endpoint An object with `url` and `method` keys
 * @param {object} data An object to use as the request body
 */
class Request {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  /**
   * Return an access token if available.
   */
  *getAccessToken() {
    const authInfo = yield select(getAuthorization);

    if (!authInfo) {
      return null;
    }

    const { accessToken, expiration } = authInfo;
    const validToken = accessToken && dayjs().isBefore(expiration);

    return validToken ? accessToken : null;
  }

  /**
   * Wait for an access token to be successfully requested.
   *
   * @param {number} timeout Number of milliseconds to wait for user to login
   */
  *waitForAccessToken(timeout) {
    try {
      const { authorization } = yield race({
        authorization: take(types.REQUEST_TOKEN_SUCCESS),
        timeout: delay(timeout)
      });

      if (authorization) {
        return authorization.accessToken;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  *makeRequest(url, method, data, headers, timeout) {
    // start a race between the request and a timer, cancel the loser
    const { response } = yield race({
      response: call(axios, {
        url,
        method,
        data,
        headers
      }),
      timeout: delay(timeout)
    });

    if (!response) {
      return { message: 'Request timed out!' };
    }

    return response;
  }

  *execute({ endpoint, data, headers = {}, options = {} }) {
    try {
      // ensure the endpoint was supplied
      if (!endpoint) {
        return failureMessage('No endpoint provided!');
      }

      // ensure properties required by axios are present
      const { url, method } = endpoint;

      if (!url) {
        return failureMessage('Endpoint is missing URL!');
      }

      if (!method) {
        return failureMessage('Endpoint is missing method!');
      }

      // default request timeout of 10 seconds
      const { timeout = 10000 } = options;

      // build the request URL
      const requestUrl = yield call(buildUrl, endpoint);

      let accessToken = yield* this.getAccessToken();

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      let response = yield* this.makeRequest(
        requestUrl,
        method,
        data,
        headers,
        timeout
      );

      if (!accessToken && response.status === 403) {
        accessToken = yield* this.waitForAccessToken(timeout);

        if (!accessToken) {
          return failureMessage('Unable to obtain required token!');
        } else {
          headers.Authorization = `Bearer ${accessToken}`;
          response = yield* this.makeRequest(
            requestUrl,
            method,
            data,
            headers,
            timeout
          );
        }
      }

      const { status } = response;
      const success = status >= 200 && status < 400;

      return success ? successResponse(response) : failureResponse(response);
    } catch (error) {
      return failureResponse(error);
    }
  }
}

const instance = new Request();

export default instance;
