import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import helper from 'utils/saga';
import { getVendor } from 'selectors/vendor';
import { actions, types } from 'reducers/vendor';
import { initialState, actions as vendorsActions } from 'reducers/vendors';

function* requestVendorWorker({ vendorId }) {
  try {
    const vendor = yield select(getVendor);

    if (vendor.length === 0 || vendor.vendorId !== vendorId) {
      const endpoint = {
        url: `/vendor/${vendorId}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      if (result.success) {
        const {
          response: { data }
        } = result;

        yield put(actions.requestVendorSuccess(data));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get vendor!');
      }
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* createVendorWorker({ details: { name, slug, code } }) {
  try {
    const endpoint = {
      url: '/vendor',
      method: 'POST'
    };
    const data = {
      name,
      slug,
      code
    };
    const result = yield call(request.execute, { endpoint, data });

    if (result.success) {
      yield put(
        vendorsActions.requestVendorsSuccess(
          initialState.cache,
          initialState.pager
        )
      );
      yield call(helper.toast, {
        title: 'Vendor Created',
        message: `${name} vendor successfully created!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to create vendor!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* updateVendorWorker({ details: { vendorId, name, slug, code } }) {
  try {
    const endpoint = {
      url: `/vendor/${vendorId}`,
      method: 'PUT'
    };
    const data = {
      name,
      slug,
      code
    };
    const result = yield call(request.execute, { endpoint, data });

    if (result.success) {
      yield put(
        vendorsActions.requestVendorsSuccess(
          initialState.cache,
          initialState.pager
        )
      );
      yield call(helper.toast, {
        title: 'Edit Vendor',
        message: `${name} vendor successfully updated!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to update vendor!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* deleteVendorWorker({ vendorId, name }) {
  try {
    const endpoint = {
      url: `/vendor/${vendorId}`,
      method: 'DELETE'
    };
    const result = yield call(request.execute, { endpoint });

    if (result.success) {
      yield put(
        vendorsActions.requestVendorsSuccess(
          initialState.cache,
          initialState.pager
        )
      );
      yield call(helper.toast, {
        title: 'Delete Vendor',
        message: `${name} vendor successfully deleted!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to delete vendor!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* requestVendorWatcher() {
  yield takeLatest(types.REQUEST_VENDOR, requestVendorWorker);
}

function* createVendorWatcher() {
  yield takeLatest(types.CREATE_VENDOR, createVendorWorker);
}

function* updateVendorWatcher() {
  yield takeLatest(types.UPDATE_VENDOR, updateVendorWorker);
}

function* deleteVendorWatcher() {
  yield takeLatest(types.DELETE_VENDOR, deleteVendorWorker);
}

export const workers = {
  requestVendorWorker,
  createVendorWorker,
  updateVendorWorker,
  deleteVendorWorker
};

export const watchers = {
  requestVendorWatcher,
  createVendorWatcher,
  updateVendorWatcher,
  deleteVendorWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map((watcher) => watcher()));
}
