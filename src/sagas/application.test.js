import dayjs from 'dayjs';
import MockDate from 'mockdate';
import { all, put, call, take, select } from 'redux-saga/effects';

import request from 'utils/request';
import { actions, types } from 'reducers/application';
import { actions as toastActions } from 'reducers/toast';
import appSaga, { watchers, workers } from './application';
import { isLoggedIn, getUser } from 'selectors/application';
/* eslint-disable camelcase */
describe('application sagas', () => {
  const accessToken = 'testing';
  const expiresIn = 3600;
  const user = { id: 123, username: 'Dave' };
  const emailAddress = 'testing@example.org';
  const password = 'test';
  const currentUserEndpoint = {
    url: '/user/current',
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
        actions.requestTokenSuccess({
          token: accessToken,
          expiration: dayjs().add(expiresIn, 'second')
        })
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

    result = gen.next();

    expect(result.value).toEqual(
      put(
        toastActions.popToast({
          title: 'Error!',
          icon: 'times-circle',
          message: error.message
        })
      )
    );
  });

  it('handles request failure in requestTokenWorker', () => {
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
  /* eslint-enable camelcase */
  it('handles success in requestCurrentUserWorker', () => {
    const gen = workers.requestCurrentUserWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: currentUserEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: user
      }
    });

    expect(result.value).toEqual(put(actions.requestCurrentUserSuccess(user)));
  });

  it('handles request failure in requestCurrentUserWorker', () => {
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
        toastActions.popToast({
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

    expect(window.localStorage.setItem).not.toHaveBeenCalled();

    const expiration = dayjs().add(expiresIn, 'seconds');

    result = gen.next(
      actions.requestTokenSuccess({ token: accessToken, expiration })
    );

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(2);

    const [firstCall, secondCall] = window.localStorage.setItem.mock.calls;

    expect(firstCall).toEqual(['accessToken', JSON.stringify(accessToken)]);
    expect(secondCall).toEqual([
      'expiration',
      JSON.stringify(expiration.toISOString())
    ]);

    expect(result.value).toEqual(
      put(
        toastActions.popToast({
          title: 'Logged in',
          icon: 'check',
          message: 'You have been authenticated.'
        })
      )
    );

    result = gen.next();

    expect(result.value).toEqual(select(getUser));

    result = gen.next(null);

    expect(result.value).toEqual(put(actions.requestCurrentUser()));

    result = gen.next();

    expect(result.value).toEqual(
      take([
        types.REQUEST_CURRENT_USER_SUCCESS,
        types.REQUEST_CURRENT_USER_FAILURE
      ])
    );

    result = gen.next(actions.requestCurrentUserSuccess(user));

    expect(result.value).toEqual(put(actions.loginUserSuccess()));
  });

  it('exits loginUserWorker early if current user in store', () => {});

  it('exits loginUserWorker early if logged in', () => {
    const gen = workers.loginUserWorker({ emailAddress, password });

    let result = gen.next();

    expect(result.value).toEqual(select(isLoggedIn));

    result = gen.next(true);

    expect(result.value).toEqual(
      put(
        toastActions.popToast({
          title: 'Logged in',
          icon: 'check',
          message: 'You have been authenticated.'
        })
      )
    );

    result = gen.next();

    expect(result.value).toEqual(select(getUser));

    result = gen.next(user);

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
      actions.requestTokenSuccess({
        token: accessToken,
        expiration: dayjs().add(expiresIn, 'seconds')
      })
    );

    expect(result.value).toEqual(
      put(
        toastActions.popToast({
          title: 'Logged in',
          icon: 'check',
          message: 'You have been authenticated.'
        })
      )
    );

    result = gen.next();

    expect(result.value).toEqual(select(getUser));

    result = gen.next(null);

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
        toastActions.popToast({
          title: 'Error',
          icon: 'times-circle',
          message
        })
      )
    );
  });

  it('runs logoutUserWorker', () => {
    const gen = workers.logoutUserWorker();

    let result = gen.next(null);

    result = gen.next();
    expect(result.value).toEqual(
      put(
        toastActions.popToast({
          title: 'Logged out',
          icon: 'check',
          message: 'You have been logged out.'
        })
      )
    );

    result = gen.next();

    expect(result.value).toEqual(put(actions.logoutUserSuccess()));
  });

  it('forks all watchers', () => {
    const gen = appSaga();
    const result = gen.next();

    expect(result.value).toEqual(
      all(Object.values(watchers).map(watcher => watcher()))
    );
  });
});
