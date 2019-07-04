import axios from 'jest-mock-axios';

import fetch from './fetch';

describe('fetch', () => {
  const endpoint = {
    url: '/test',
    method: 'POST'
  };

  afterEach(() => {
    axios.reset();
    axios.mockClear();
  });

  it('can handle success', async () => {
    const response = {
      status: 200,
      data: {}
    };

    const promise = fetch({ endpoint });

    axios.mockResponse(response);
    const result = await promise;

    expect(result).toBeDefined();
    const {
      success,
      response: { status, data }
    } = result;

    expect(success).toBeTruthy();
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith(endpoint);
    expect(status).toBe(response.status);
    expect(data).toBe(response.data);
  });

  it('can handle no content', async () => {
    const response = {
      status: 204,
      data: null
    };

    const promise = fetch({ endpoint });

    axios.mockResponse(response);
    const result = await promise;

    expect(result).toBeDefined();
    const {
      success,
      response: { status, data }
    } = result;

    expect(success).toBeTruthy();
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith(endpoint);
    expect(status).toBe(response.status);
    expect(data).toBeFalsy();
  });

  it('can handle bad request', async () => {
    const response = {
      status: 400,
      data: {}
    };

    const promise = fetch({ endpoint });

    axios.mockResponse(response);
    const result = await promise;

    expect(result).toBeDefined();
    const {
      success,
      response: { status, data }
    } = result;

    expect(success).toBeFalsy();
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith(endpoint);
    expect(status).toBe(response.status);
    expect(data).toBe(response.data);
  });

  it('can handle internal server error', async () => {
    const response = {
      status: 400,
      data: {}
    };

    const promise = fetch({ endpoint });

    axios.mockResponse(response);
    const result = await promise;

    expect(result).toBeDefined();
    const {
      success,
      response: { status, data }
    } = result;

    expect(success).toBeFalsy();
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith(endpoint);
    expect(status).toBe(response.status);
    expect(data).toBe(response.data);
  });

  it('can handle missing endpoint', async () => {
    const error = new Error('No endpoint provided!');
    const response = {
      success: false,
      error
    };
    const result = await fetch({ endpoint: null });

    expect(axios).not.toHaveBeenCalled();
    expect(result).toEqual(response);
  });

  it('can handle malformed endpoint', async () => {
    const error = new Error('Endpoint is missing URL or method!');
    const response = {
      success: false,
      error
    };
    const missingMethod = {
      url: '/missing/method'
    };
    const missingUrl = {
      method: 'POST'
    };

    let result = await fetch({ endpoint: missingMethod });

    expect(axios).not.toHaveBeenCalled();
    expect(result).toEqual(response);

    result = await fetch({ endpoint: missingUrl });

    expect(axios).not.toHaveBeenCalled();
    expect(result).toEqual(response);
  });
});
