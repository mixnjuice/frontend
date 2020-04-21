import dayjs from 'dayjs';
import axios from 'jest-mock-axios';
import { race, call, delay, select, take } from 'redux-saga/effects';

import request from './request';
import { buildUrl } from './index';
import { getAuthorization } from 'selectors/application';
import { types } from 'reducers/application';

describe('request', () => {
  const endpoint = {
    url: '/oauth/token',
    method: 'POST'
  };
  const authedEndpoint = {
    url: '/user/current',
    method: 'GET'
  };
  const authInfo = {
    accessToken: 'dummy',
    expiration: dayjs().add(7, 'day')
  };
  const defaultTimeout = 10000;

  afterEach(() => {
    axios.reset();
    axios.mockClear();
  });

  const mockRequest = (url, method, auth, timeout = defaultTimeout) =>
    race({
      response: call(axios, {
        url,
        method,
        headers: auth
          ? {
              Authorization: `Bearer ${auth.accessToken}`
            }
          : {},
        data: undefined
      }),
      timeout: delay(timeout)
    });

  it('can handle success', () => {
    const response = {
      status: 200,
      data: {}
    };
    const { url, method } = endpoint;
    const gen = request.execute({ endpoint });

    let result = gen.next();

    expect(result.value).toEqual(call(buildUrl, endpoint));

    result = gen.next(url);

    expect(result.value).toEqual(select(getAuthorization));

    result = gen.next(authInfo);

    expect(result.value).toEqual(mockRequest(url, method, authInfo));

    result = gen.next({ response });

    expect(result.done).toBeTruthy();
    expect(result.value).toBeDefined();
    const {
      success,
      response: { status, data }
    } = result.value;

    expect(success).toBeTruthy();
    expect(status).toBe(response.status);
    expect(data).toBe(response.data);
  });

  it('can handle no content', () => {
    const response = {
      status: 204,
      data: null
    };
    const { url, method } = endpoint;
    const gen = request.execute({ endpoint });

    let result = gen.next();

    expect(result.value).toEqual(call(buildUrl, endpoint));

    result = gen.next(url);

    expect(result.value).toEqual(select(getAuthorization));

    result = gen.next(authInfo);

    expect(result.value).toEqual(mockRequest(url, method, authInfo));

    result = gen.next({ response });

    expect(result.done).toBeTruthy();
    expect(result.value).toBeDefined();
    const {
      success,
      response: { status, data }
    } = result.value;

    expect(success).toBeTruthy();
    expect(status).toBe(response.status);
    expect(data).toBeFalsy();
  });

  it('can handle bad request', () => {
    const axiosResponse = {
      status: 400,
      data: {}
    };
    const { url, method } = endpoint;
    const gen = request.execute({ endpoint });

    let result = gen.next();

    expect(result.value).toEqual(call(buildUrl, endpoint));

    result = gen.next(url);

    expect(result.value).toEqual(select(getAuthorization));

    result = gen.next(authInfo);

    expect(result.value).toEqual(mockRequest(url, method, authInfo));

    result = gen.next({ response: axiosResponse });
    const { done, value } = result;

    expect(done).toBeTruthy();
    expect(value).toBeDefined();
    const { success, response, error } = result.value;

    expect(success).toBeFalsy();
    expect(response).not.toBeDefined();
    expect(error).toBeDefined();
  });

  it('can handle internal server error', () => {
    const axiosResponse = {
      status: 500,
      data: {
        message: 'Something bad',
        code: 1001
      }
    };
    const { url, method } = endpoint;
    const gen = request.execute({ endpoint });

    let result = gen.next();

    expect(result.value).toEqual(call(buildUrl, endpoint));

    result = gen.next(url);

    expect(result.value).toEqual(select(getAuthorization));

    result = gen.next(authInfo);

    expect(result.value).toEqual(mockRequest(url, method, authInfo));

    result = gen.next({ response: axiosResponse });
    const { done, value } = result;

    expect(done).toBeTruthy();
    expect(value).toBeDefined();
    const { success, response, error } = result.value;

    expect(success).toBeFalsy();
    expect(response).not.toBeDefined();
    expect(error).toEqual(axiosResponse);
  });

  it('can handle forbidden response', () => {
    const successResponse = {
      status: 200,
      data: {}
    };
    const forbiddenResponse = {
      status: 403,
      data: {
        error: 'Forbidden'
      }
    };
    const { url, method } = endpoint;
    const gen = request.execute({ endpoint });

    let result = gen.next();

    expect(result.value).toEqual(call(buildUrl, endpoint));

    result = gen.next(url);

    expect(result.value).toEqual(select(getAuthorization));

    result = gen.next();

    expect(result.value).toEqual(mockRequest(url, method));

    result = gen.next({ response: forbiddenResponse });

    expect(result.value).toEqual(
      race({
        authorization: take(types.REQUEST_TOKEN_SUCCESS),
        timeout: delay(defaultTimeout)
      })
    );

    result = gen.next({
      authorization: authInfo
    });

    expect(result.value).toEqual(mockRequest(url, method, authInfo));

    result = gen.next({ response: successResponse });

    expect(result).toEqual({
      done: true,
      value: {
        success: true,
        response: successResponse
      }
    });
  });

  it('can handle missing endpoint', () => {
    const error = { message: 'No endpoint provided!' };
    const response = {
      done: true,
      value: {
        success: false,
        error
      }
    };
    const gen = request.execute({ endpoint: null });
    const result = gen.next();

    expect(axios).not.toHaveBeenCalled();
    expect(result).toEqual(response);
  });

  it('can handle missing URL', () => {
    const invalidEndpoint = {
      method: 'POST'
    };
    const response = {
      done: true,
      value: {
        success: false,
        error: { message: 'Endpoint is missing URL!' }
      }
    };
    const gen = request.execute({ endpoint: invalidEndpoint });
    const result = gen.next();

    expect(axios).not.toHaveBeenCalled();
    expect(result).toEqual(response);
  });

  it('can handle missing method', () => {
    const invalidEndpoint = {
      url: '/missing/method'
    };
    const response = {
      done: true,
      value: {
        success: false,
        error: { message: 'Endpoint is missing method!' }
      }
    };
    const gen = request.execute({ endpoint: invalidEndpoint });
    const result = gen.next();

    expect(axios).not.toHaveBeenCalled();
    expect(result).toEqual(response);
  });

  it('can handle timeout', () => {
    const timeoutResponse = {
      done: true,
      value: {
        success: false,
        error: { message: 'Request timed out!' }
      }
    };
    const options = {
      timeout: 5000
    };
    const { url, method } = endpoint;
    const gen = request.execute({ endpoint, options });

    let result = gen.next();

    expect(result.value).toEqual(call(buildUrl, endpoint));

    result = gen.next(url);

    expect(result.value).toEqual(select(getAuthorization));

    result = gen.next();

    expect(result.value).toEqual(
      mockRequest(url, method, null, options.timeout)
    );

    result = gen.next({ timeout: 'Operation timed out!' });

    expect(result).toEqual(timeoutResponse);
  });

  it('can handle unexpected error', () => {
    const { url, method } = endpoint;
    const gen = request.execute({ endpoint });

    let result = gen.next();

    expect(result.value).toEqual(call(buildUrl, endpoint));

    result = gen.next(url);

    expect(result.value).toEqual(select(getAuthorization));

    result = gen.next();

    expect(result.value).toEqual(mockRequest(url, method));

    // this should never occur by axios
    result = gen.next(null);

    const { done, value } = result;

    expect(done).toBeTruthy();
    expect(value).toBeDefined();
    const { success, response, error } = result.value;

    expect(success).toBeFalsy();
    expect(response).not.toBeDefined();
    expect(error).toBeDefined();
  });

  it('can use auth info if present', () => {
    const { url, method } = authedEndpoint;
    const gen = request.execute({ endpoint: authedEndpoint });

    let result = gen.next();

    expect(result.value).toEqual(call(buildUrl, authedEndpoint));

    result = gen.next(url);

    expect(result.value).toEqual(select(getAuthorization));

    result = gen.next(authInfo);

    expect(result.value).toEqual(mockRequest(url, method, authInfo));
  });

  it('can handle successful auth call', () => {
    const { url, method } = authedEndpoint;
    const gen = request.execute({ endpoint: authedEndpoint });

    let result = gen.next();

    expect(result.value).toEqual(call(buildUrl, authedEndpoint));

    result = gen.next(url);

    expect(result.value).toEqual(select(getAuthorization));

    result = gen.next(authInfo);

    expect(result.value).toEqual(mockRequest(url, method, authInfo));
  });

  it('can handle timeout in auth call', () => {
    const response = {
      status: 403,
      data: {}
    };
    const { url, method } = authedEndpoint;
    const gen = request.execute({ endpoint: authedEndpoint });

    let result = gen.next();

    expect(result.value).toEqual(call(buildUrl, authedEndpoint));

    result = gen.next(url);

    expect(result.value).toEqual(select(getAuthorization));

    result = gen.next();

    expect(result.value).toEqual(mockRequest(url, method));

    result = gen.next({ response });

    expect(result.value).toEqual(
      race({
        authorization: take(types.REQUEST_TOKEN_SUCCESS),
        timeout: delay(defaultTimeout)
      })
    );

    result = gen.next({ timeout: defaultTimeout });

    expect(result.value).toEqual({
      success: false,
      error: {
        message: 'Unable to obtain required token!'
      }
    });
  });
});
