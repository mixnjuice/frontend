import axios from 'axios';
import { buildUrl } from 'utils';
import { call, race, delay } from 'redux-saga/effects';

/**
 * Make an XMLHttpRequest to the specified endpoint with the specified request data.
 *
 * @param {object} endpoint An object with `url` and `method` keys
 * @param {object} data An object to use as the request body
 */
class Request {
  *execute({ endpoint, data, options = {} }) {
    try {
      // ensure the endpoint was supplied
      if (!endpoint) {
        throw new Error('No endpoint provided!');
      }

      // ensure properties required by axios are present
      const { url, method } = endpoint;

      if (!url) {
        throw new Error('Endpoint is missing URL!');
      }

      if (!method) {
        throw new Error('Endpoint is missing method!');
      }

      // default timeout of 30 seconds
      const { timeout = 30000 } = options;
      const requestUrl = yield call(buildUrl, endpoint);

      // start a race between the request and a timer, cancel the loser
      const { response } = yield race({
        response: call(axios, {
          url: requestUrl,
          method,
          data
        }),
        timeout: delay(timeout)
      });

      if (!response) {
        throw new Error('Request timed out!');
      }

      const { status } = response;
      const success = status >= 200 && status < 400;

      if (success) {
        return {
          success,
          response
        };
      } else {
        return {
          success,
          error: response
        };
      }
    } catch (error) {
      return {
        success: false,
        error
      };
    }
  }
}

const instance = new Request();

export default instance;
