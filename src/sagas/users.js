// import dayjs from 'dayjs';
// import nanoid from 'nanoid';
import {
  all,
  call,
  put,
  takeLatest
  // delay,
  // take,
  // takeEvery,
  // select
} from 'redux-saga/effects';

import request from 'utils/request';
import { actions, types } from 'reducers/users';

// snake_cased variables here come from RFC 6749
/* eslint-disable camelcase */
function* requestUsersWorker() {
  try {
    const endpoint = {
      url: '/users/accounts',
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update user in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestUsersSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get users!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestUsersFailure(error));
    yield put(
      actions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestUsersWatcher() {
  yield takeLatest(types.REQUEST_USERS, requestUsersWorker);
}

export const workers = {
  requestUsersWorker
};

export const watchers = {
  requestUsersWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
