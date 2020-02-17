import dayjs from 'dayjs';
import { all, call, put, takeLatest, take, select } from 'redux-saga/effects';

import request from 'utils/request';
import { actions, types } from 'reducers/application';
import { actions as toastActions } from 'reducers/toast';
import { isLoggedIn, getUser } from 'selectors/application';

// snake_cased variables here come from RFC 6749
/* eslint-disable camelcase */
function* requestTokenWorker({ emailAddress, password }) {
  try {
    const endpoint = {
      url: '/oauth/token',
      method: 'POST'
    };
    const data = {
      grant_type: 'password',
      username: emailAddress,
      password
    };
    const result = yield call(request.execute, { endpoint, data });

    // update token info in state or throw an error
    if (result.success) {
      const {
        data: {
          access_token: token,
          token_type: tokenType,
          expires_in: expiresIn
        }
      } = result.response;

      if (tokenType !== 'Bearer') {
        throw new Error(`Unable to use token of type ${tokenType}`);
      }

      const expiration = dayjs().add(expiresIn, 'seconds');

      yield put(actions.requestTokenSuccess({ token, expiration }));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Request failed for an unspecified reason!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestTokenFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error!',
        icon: 'times-circle',
        message
      })
    );
  }
}
/* eslint-enable camelcase */

function* requestCurrentUserWorker() {
  try {
    const endpoint = {
      url: '/user/current',
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update user in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestCurrentUserSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get current user!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestCurrentUserFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* loginUserWorker({ emailAddress, password }) {
  try {
    // first, check to see if we are already logged in
    const loggedIn = yield select(isLoggedIn);

    if (!loggedIn) {
      // obtain a bearer token
      // then, obtain current user information
      // use take because it is blocking
      yield put(actions.requestToken(emailAddress, password));
      const tokenResult = yield take([
        types.REQUEST_TOKEN_SUCCESS,
        types.REQUEST_TOKEN_FAILURE
      ]);

      if (tokenResult.type === types.REQUEST_TOKEN_FAILURE) {
        throw new Error('Failed to log in!');
      }

      const { token, expiration } = tokenResult;

      localStorage.setItem('accessToken', JSON.stringify(token));
      localStorage.setItem(
        'expiration',
        JSON.stringify(expiration.toISOString())
      );
    }

    yield put(
      toastActions.popToast({
        title: 'Logged in',
        icon: 'check',
        message: 'You have been authenticated.'
      })
    );

    let user = yield select(getUser);

    if (!user) {
      yield put(actions.requestCurrentUser());
      const currentUserResult = yield take([
        types.REQUEST_CURRENT_USER_SUCCESS,
        types.REQUEST_CURRENT_USER_FAILURE
      ]);

      if (currentUserResult.type === types.REQUEST_CURRENT_USER_FAILURE) {
        throw new Error('Failed to fetch current user!');
      }

      user = currentUserResult.user;

      if (!user) {
        throw new Error('Got invalid response to current user request!');
      }
    }

    yield put(actions.loginUserSuccess());
  } catch (error) {
    const { message } = error;

    yield put(actions.loginUserFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* logoutUserWorker() {
  try {
    // first, check to see if we are logged in
    const loggedIn = yield select(isLoggedIn);

    if (loggedIn) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expiration');
    }

    yield put(
      toastActions.popToast({
        title: 'Logged out',
        icon: 'check',
        message: 'You have been logged out.'
      })
    );

    yield put(actions.logoutUserSuccess());
  } catch (error) {
    const { message } = error;

    yield put(actions.logoutUserFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* registerUserWorker({
  details: { emailAddress, password, username }
}) {
  try {
    const endpoint = {
      url: '/register',
      method: 'POST'
    };
    const data = {
      emailAddress,
      password,
      username
    };
    const result = yield call(request.execute, { endpoint, data });

    if (result.success) {
      yield put(actions.registerUserSuccess());
      yield put(
        toastActions.popToast({
          title: 'Success!',
          icon: 'check',
          message: 'Check your email for an activation link.'
        })
      );
    } else {
      throw result.error;
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.registerUserFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* loginUserWatcher() {
  yield takeLatest(types.LOGIN_USER, loginUserWorker);
}

function* logoutUserWatcher() {
  yield takeLatest(types.LOGOUT_USER, logoutUserWorker);
}

function* requestTokenWatcher() {
  yield takeLatest(types.REQUEST_TOKEN, requestTokenWorker);
}

function* requestCurrentUserWatcher() {
  yield takeLatest(types.REQUEST_CURRENT_USER, requestCurrentUserWorker);
}

function* registerUserWatcher() {
  yield takeLatest(types.REGISTER_USER, registerUserWorker);
}

export const workers = {
  loginUserWorker,
  logoutUserWorker,
  registerUserWorker,
  requestTokenWorker,
  requestCurrentUserWorker
};

export const watchers = {
  loginUserWatcher,
  logoutUserWatcher,
  registerUserWatcher,
  requestTokenWatcher,
  requestCurrentUserWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
