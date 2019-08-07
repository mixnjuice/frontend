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
import { actions, types } from 'reducers/dashboard';

// snake_cased variables here come from RFC 6749
/* eslint-disable camelcase */
function* requestMigrationsWorker() {
  try {
    const endpoint = {
      url: '/data/version',
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update migrations in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestMigrationsSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get migrations!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestMigrationsFailure(error));
    yield put(
      actions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestMigrationsWatcher() {
  yield takeLatest(types.REQUEST_MIGRATIONS, requestMigrationsWorker);
}

export const workers = {
  requestMigrationsWorker
};

export const watchers = {
  requestMigrationsWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
