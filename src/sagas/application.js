import dayjs from 'dayjs';
import {
  all,
  call,
  put,
  putResolve,
  select,
  takeLatest
} from 'redux-saga/effects';

import request from 'utils/request';
import { getUser } from 'selectors/application';
import { actions, types } from 'reducers/application';

// snake_cased variables here come from RFC 6749
/* eslint-disable camelcase */
function* requestTokenWorker({ emailAddress, password }) {
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
        access_token: accessToken,
        token_type: tokenType,
        expires_in: expiresIn
      }
    } = result;

    if (tokenType !== 'Bearer') {
      throw new Error(`Unable to use token of type ${tokenType}`);
    }

    const expiration = dayjs().add(expiresIn, 'seconds');

    yield put(actions.receiveToken(accessToken, expiration));
  } else if (result.error) {
    throw result.error;
  } else {
    throw new Error('Request failed for an unspecified reason!');
  }
}
/* eslint-enable camelcase */

function* requestCurrentUserWorker() {
  const endpoint = {
    url: '/api/user/current',
    method: 'GET'
  };
  const result = yield call(request.execute, { endpoint });

  // update user in state or throw an error
  if (result.success) {
    yield put(actions.receiveCurrentUser(result.data));
  } else if (result.error) {
    throw result.error;
  } else {
    throw new Error('Request failed for an unspecified reason!');
  }
}

function* loginWorker({ emailAddress, password }) {
  try {
    // first, obtain a bearer token
    // then, obtain current user information
    // use putResolve because it is blocking
    yield putResolve(actions.requestToken(emailAddress, password));
    yield putResolve(actions.requestCurrentUser());
    const user = yield select(getUser);

    if (!user) {
      throw new Error('Failed to request user information!');
    }

    yield put(actions.loginUserSuccess(user));
  } catch (error) {
    yield put(actions.loginUserFailure(error));
  }
}

function* loginWatcher() {
  yield takeLatest(types.LOGIN_USER, loginWorker);
}

function* requestTokenWatcher() {
  yield takeLatest(types.REQUEST_TOKEN, requestTokenWorker);
}

function* requestCurrentUserWatcher() {
  yield takeLatest(types.REQUEST_CURRENT_USER, requestCurrentUserWorker);
}

export const workers = {
  loginWorker,
  requestTokenWorker,
  requestCurrentUserWorker
};

export const watchers = {
  loginWatcher,
  requestTokenWatcher,
  requestCurrentUserWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
