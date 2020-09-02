import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import helper from 'utils/saga';
import { getCachedVendors, getVendorsPager } from 'selectors/vendors';
import { actions, types } from 'reducers/vendors';

function* requestVendorsWorker({ pager }) {
  try {
    const cached = yield select(getCachedVendors);
    const store = yield select(getVendorsPager);

    const response = yield call(helper.pager, {
      cached,
      pager: {
        ...pager,
        store
      },
      route: {
        count: '/vendors/count',
        data: '/vendors/'
      },
      type: 'Vendors'
    });

    yield put(actions.requestVendorsSuccess(response.cached, response.pager));
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* requestVendorsWatcher() {
  yield takeLatest(types.REQUEST_VENDORS, requestVendorsWorker);
}

export const workers = {
  requestVendorsWorker
};

export const watchers = {
  requestVendorsWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map((watcher) => watcher()));
}
