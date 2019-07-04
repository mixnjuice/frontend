import axios from 'axios';

/**
 * Make an XMLHttpRequest to the specified endpoint with the specified request data.
 *
 * @param {object} endpoint An object with `url` and `method` keys
 * @param {object} data An object to use as the request body
 */
export default async ({ endpoint, data }) => {
  try {
    // ensure the endpoint was supplied
    if (!endpoint) {
      throw new Error('No endpoint provided!');
    }

    // ensure properties required by axios are present
    const { url, method } = endpoint;

    if (!url || !method) {
      throw new Error('Endpoint is missing URL or method!');
    }

    const response = await axios({
      url,
      method,
      data
    });
    const { status } = response;

    return {
      success: status >= 200 && status < 400,
      response
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};
