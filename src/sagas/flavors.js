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
    const { response } = yield call(request.execute, { endpoint });

    yield put(actions.requestFlavorsSuccess(response.data));
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
