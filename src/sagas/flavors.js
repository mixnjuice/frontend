import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import helper from 'utils/saga';
import { getCachedFlavors, getFlavorsPager } from 'selectors/flavors';
import { actions, types } from 'reducers/flavors';

function* requestFlavorsWorker({ pager }) {
  try {
    const cached = yield select(getCachedFlavors);
    const store = yield select(getFlavorsPager);

    const response = yield call(helper.pager, {
      cached,
      pager: {
        ...pager,
        store
      },
      route: {
        count: '/flavors/count',
        data: '/flavors/'
      },
      type: 'Flavors'
    });

    yield put(actions.requestFlavorsSuccess(response.cached, response.pager));
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
