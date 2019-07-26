import dayjs from 'dayjs';
import MockDate from 'mockdate';
import { all, put, call, take, select } from 'redux-saga/effects';

import request from 'utils/request';
import { isLoggedIn } from 'selectors/application';
import { actions, types } from 'reducers/application';
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
      response: {
        data: {
          access_token: accessToken,
          token_type: tokenType,
          expires_in: expiresIn
        }
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

    expect(result.value).toEqual(put(actions.requestCurrentUserSuccess(user)));
  });

  it('handles expected error in requestCurrentUserWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.requestCurrentUserWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: currentUserEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestCurrentUserFailure(error)));
  });

  it('handles unexpected error in requestCurrentUserWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.requestCurrentUserWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: currentUserEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestCurrentUserFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(
      put(
        actions.popToast({
          title: 'Error',
          icon: 'times-circle',
          message
        })
      )
    );
  });

  it('runs loginUserWorker', () => {
    const gen = workers.loginUserWorker({ emailAddress, password });

    let result = gen.next();

    expect(result.value).toEqual(select(isLoggedIn));

    result = gen.next(false);

    expect(result.value).toEqual(
      put(actions.requestToken(emailAddress, password))
    );

    result = gen.next();

    expect(result.value).toEqual(
      take([types.REQUEST_TOKEN_SUCCESS, types.REQUEST_TOKEN_FAILURE])
    );

    result = gen.next(
      actions.requestTokenSuccess(
        accessToken,
        dayjs().add(expiresIn, 'seconds')
      )
    );

    expect(result.value).toEqual(put(actions.requestCurrentUser()));

    result = gen.next();

    expect(result.value).toEqual(
      take([
        types.REQUEST_CURRENT_USER_SUCCESS,
        types.REQUEST_CURRENT_USER_FAILURE
      ])
    );

    result = gen.next(actions.requestCurrentUserSuccess(user));

    expect(result.value).toEqual(put(actions.loginUserSuccess(user)));
  });

  it('exits loginUserWorker early if logged in', () => {
    const gen = workers.loginUserWorker({ emailAddress, password });

    let result = gen.next();

    expect(result.value).toEqual(select(isLoggedIn));

    result = gen.next(true);

    expect(result.value).toEqual(put(actions.loginUserSuccess()));

    result = gen.next();

    expect(result.done).toBeTruthy();
  });

  it('handles invalid user in loginUserWorker', () => {
    const error = new Error('Failed to fetch current user!');
    const { message } = error;
    const gen = workers.loginUserWorker({ emailAddress, password });

    let result = gen.next();

    expect(result.value).toEqual(select(isLoggedIn));

    result = gen.next(false);

    expect(result.value).toEqual(
      put(actions.requestToken(emailAddress, password))
    );

    result = gen.next();

    expect(result.value).toEqual(
      take([types.REQUEST_TOKEN_SUCCESS, types.REQUEST_TOKEN_FAILURE])
    );

    result = gen.next(
      actions.requestTokenSuccess(
        accessToken,
        dayjs().add(expiresIn, 'seconds')
      )
    );

    expect(result.value).toEqual(put(actions.requestCurrentUser()));

    result = gen.next();

    expect(result.value).toEqual(
      take([
        types.REQUEST_CURRENT_USER_SUCCESS,
        types.REQUEST_CURRENT_USER_FAILURE
      ])
    );

    result = gen.next(actions.requestCurrentUserFailure());

    expect(result.value).toEqual(put(actions.loginUserFailure(error)));

    result = gen.next(error);

    expect(result.value).toEqual(
      put(
        actions.popToast({
          title: 'Error',
          icon: 'times-circle',
          message
        })
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
