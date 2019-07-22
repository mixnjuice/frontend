import dayjs from 'dayjs';
import nanoid from 'nanoid';
import {
  all,
  call,
  put,
  putResolve,
  select,
  takeLatest,
  delay
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

function* popToastWorker({ toast }) {
  // ensure there is a unique key for each toast
  const id = nanoid();

  toast.id = toast.id || id;

  yield put(actions.addToast(toast));
  yield delay(toast.interval || 5000);
  yield put(actions.hideToast(id));
  // this is the default Fade transition time
  yield delay(500);
  yield put(actions.removeToast(id));
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
    } else {
      throw result.error;
    }
  } catch (error) {
    yield put(actions.registerUserFailure(error));
  }
}

function* registerUserSuccessWorker() {
  yield put(
    actions.popToast({
      title: 'Success!',
      icon: 'check',
      message: 'Check your email for an activation link.'
    })
  );
}

function* registerUserFailureWorker({ error: { message } }) {
  yield put(
    actions.popToast({
      title: 'Error',
      icon: 'times-circle',
      message
    })
  );
}

function* loginWatcher() {
  yield takeLatest(types.LOGIN_USER, loginWorker);
}

function* popToastWatcher() {
  yield takeLatest(types.POP_TOAST, popToastWorker);
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

function* registerUserSuccessWatcher() {
  yield takeLatest(types.REGISTER_USER_SUCCESS, registerUserSuccessWorker);
}

function* registerUserFailureWatcher() {
  yield takeLatest(types.REGISTER_USER_FAILURE, registerUserFailureWorker);
}

export const workers = {
  loginWorker,
  popToastWorker,
  registerUserWorker,
  requestTokenWorker,
  requestCurrentUserWorker,
  registerUserSuccessWorker,
  registerUserFailureWorker
};

export const watchers = {
  loginWatcher,
  popToastWatcher,
  registerUserWatcher,
  requestTokenWatcher,
  requestCurrentUserWatcher,
  registerUserSuccessWatcher,
  registerUserFailureWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
