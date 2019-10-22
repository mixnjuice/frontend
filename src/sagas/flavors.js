import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { getCachedFlavors, getFlavorsPager } from 'selectors/flavors';
import { actions, types } from 'reducers/flavors';
import { actions as toastActions } from 'reducers/toast';

function* requestFlavorsWorker({ pager }) {
  try {
    const flavorsPager = yield select(getFlavorsPager);

    // Initial/previous values stored
    let { count, limit, page } = flavorsPager;
    const { pages } = flavorsPager;

    let endpoint = {};

    if (!count) {
      endpoint = {
        url: '/flavors/count',
        method: 'GET'
      };
      const flavorsCount = yield call(request.execute, { endpoint });

      if (flavorsCount.success) {
        const {
          response: { data }
        } = flavorsCount;
        // Set pager to be passed into Success, Update count

        pager.count = data;
      } else if (flavorsCount.error) {
        throw flavorsCount.error;
      } else {
        throw new Error('Failed to count flavors!');
      }
    } else {
      pager.count = count;
    }

    if (!pager.limit) {
      pager.limit = limit;
    }

    pager.pages =
      !pages || pages === null || pager.limit !== limit
        ? Math.ceil(pager.count / pager.limit)
        : pages;

    if (!pager.page) {
      pager.page = page;
    }
    // Refresh these values to the desired values (from pager)
    count = pager.count;
    limit = pager.limit;
    page = pager.page;

    const cached = yield select(getCachedFlavors);

    if (!cached[page] || cached[page].length !== Number(limit)) {
      let offset = page * limit - limit + 1;

      if (offset > count) {
        // Prevent an offset higher than total amount of flavors
        // - Consider a max limit/offset
        offset = count - limit;
      }
      endpoint = {
        url: `/flavors/?limit=${limit}&offset=${offset}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      // update flavors in state or throw an error
      if (result.success) {
        const {
          response: { data }
        } = result;

        cached[page] = data;

        yield put(actions.requestFlavorsSuccess(cached, pager));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get flavors!');
      }
    } else {
      yield put(actions.requestFlavorsSuccess(cached, pager));
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFlavorsFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
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
  yield all(Object.values(watchers).map(watcher => watcher()));
}
