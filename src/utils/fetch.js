import axios from 'axios';

export default async ({ endpoint, payload }) => {
  try {
    if (!endpoint) {
      throw new Error('No endpoint provided!');
    }

    const { url, method } = endpoint;

    if (!url || !method) {
      throw new Error('Endpoint is missing URL or method!');
    }

    const response = await axios({
      url,
      method,
      data: payload
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
