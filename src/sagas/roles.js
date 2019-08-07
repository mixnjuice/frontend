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
import { actions, types } from 'reducers/roles';

// snake_cased variables here come from RFC 6749
/* eslint-disable camelcase */
function* requestRolesWorker() {
  try {
    const endpoint = {
      url: '/roles',
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update roles in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestRolesSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get roles!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestRolesFailure(error));
    yield put(
      actions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestRolesWatcher() {
  yield takeLatest(types.REQUEST_ROLES, requestRolesWorker);
}

export const workers = {
  requestRolesWorker
};

export const watchers = {
  requestRolesWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
