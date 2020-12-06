import { all, call, put, takeLatest, select } from 'redux-saga/effects';

import { getFilter } from 'selectors/flavors';
import { actions, types } from 'reducers/flavors';
import request from 'utils/request';
import helper from 'utils/saga';

function* requestFlavorsWorker() {
  try {
    const filter = yield select(getFilter);
    const endpoint = {
      url: `/flavors?limit=100&offset=1&filter=${filter}`,
      method: 'GET'
    };
    const result = yield call(request.execute, {
      endpoint
    });

    if (result.success) {
      const { data } = result.response;

      if (!data) {
        yield put(actions.requestFlavorsSuccess([]));
      }

      yield put(actions.requestFlavorsSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Request failed for an unspecified reason!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFlavorsFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* requestFlavorsWatcher() {
  yield takeLatest(types.REQUEST_FLAVORS, requestFlavorsWorker);
}

export const workers = {
  requestFlavorsWorker
};

export const watchers = {
  requestFlavorsWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map((watcher) => watcher()));
}
