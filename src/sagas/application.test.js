import dayjs from 'dayjs';
import MockDate from 'mockdate';
import { all, putResolve, select, put, call } from 'redux-saga/effects';

import request from 'utils/request';
import { actions } from 'reducers/application';
import { getUser } from 'selectors/application';
import appSaga, { watchers, workers } from './application';

/* eslint-disable camelcase */
describe('application sagas', () => {
  const accessToken = 'testing';
  const expiresIn = 3600;
  const user = { id: 123, username: 'Dave' };
  const emailAddress = 'testing@example.org';
  const password = 'test';
  const currentUserEndpoint = {
    url: '/api/user/current',
    method: 'GET'
  };
  const tokenEndpoint = {
    url: '/oauth/token',
    method: 'POST'
  };
  const tokenData = {
    grant_type: 'password',
    username: emailAddress,
    password
  };

  it('handles success in requestTokenWorker', () => {
    MockDate.set(new Date());
    const response = {
      success: true,
      response: {
        data: {
          access_token: accessToken,
          token_type: 'Bearer',
          expires_in: expiresIn
        }
      }
    };
    const gen = workers.requestTokenWorker({ emailAddress, password });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: tokenEndpoint, data: tokenData })
    );

    result = gen.next(response);

    expect(result.value).toEqual(
      put(
        actions.requestTokenSuccess(
          accessToken,
          dayjs().add(expiresIn, 'second')
        )
      )
    );
    MockDate.reset();
  });

  it('handles invalid token type in requestTokenWorker', () => {
    const tokenType = 'badtype';
    const error = new Error(`Unable to use token of type ${tokenType}`);
    const gen = workers.requestTokenWorker({ emailAddress, password });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: tokenEndpoint, data: tokenData })
    );

    result = gen.next({
      success: true,
      data: {
        access_token: accessToken,
        token_type: tokenType,
        expires_in: expiresIn
      }
    });

    expect(result.value).toEqual(put(actions.requestTokenFailure(error)));
  });

  it('handles expected error in requestTokenWorker', () => {
    const error = new Error('Something went wrong.');
    const gen = workers.requestTokenWorker({ emailAddress, password });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: tokenEndpoint, data: tokenData })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestTokenFailure(error)));
  });

  it('handles unexpected error in requestTokenWorker', () => {
    const gen = workers.requestTokenWorker({ emailAddress, password });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: tokenEndpoint, data: tokenData })
    );

    result = gen.next({
      success: false
    });

    expect(result.value).toEqual(
      put(
        actions.requestTokenFailure(
          new Error('Request failed for an unspecified reason!')
        )
      )
    );
  });

  it('handles success in requestCurrentUserWorker', () => {
    const gen = workers.requestCurrentUserWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: currentUserEndpoint })
    );

    result = gen.next({
      success: true,
      data: user
    });

    expect(result.value).toEqual(put(actions.receiveCurrentUser(user)));
  });

  it('handles expected error in requestCurrentUserWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.requestCurrentUserWorker();

    const result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: currentUserEndpoint })
    );

    expect(() => {
      gen.next({
        success: false,
        error
      });
    }).toThrow(error);
  });

  it('handles unexpected error in requestCurrentUserWorker', () => {
    const gen = workers.requestCurrentUserWorker();

    const result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: currentUserEndpoint })
    );

    expect(() => {
      gen.next({
        success: false
      });
    }).toThrow(new Error('Request failed for an unspecified reason!'));
  });

  it('runs loginWorker', () => {
    const gen = workers.loginWorker({ emailAddress, password });

    let result = gen.next();

    expect(result.value).toEqual(
      putResolve(actions.requestToken(emailAddress, password))
    );

    result = gen.next();

    expect(result.value).toEqual(putResolve(actions.requestCurrentUser()));

    result = gen.next();

    expect(result.value).toEqual(select(getUser));

    result = gen.next(user);

    expect(result.value).toEqual(put(actions.loginUserSuccess(user)));
  });

  it('handles invalid user in loginWorker', () => {
    const gen = workers.loginWorker({ emailAddress, password });

    let result = gen.next();

    expect(result.value).toEqual(
      putResolve(actions.requestToken(emailAddress, password))
    );

    result = gen.next();

    expect(result.value).toEqual(putResolve(actions.requestCurrentUser()));

    result = gen.next();

    expect(result.value).toEqual(select(getUser));

    result = gen.next(null);

    expect(result.value).toEqual(
      put(
        actions.loginUserFailure(
          new Error('Failed to request user information!')
        )
      )
    );
  });

  it('forks all watchers', () => {
    const gen = appSaga();
    const result = gen.next();

    expect(result.value).toEqual(
      all(Object.values(watchers).map(watcher => watcher()))
    );
  });
});
/* eslint-enable */
