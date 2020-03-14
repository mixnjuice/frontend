import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import helper from 'utils/saga';
import { getCurrentUser } from 'sagas/profile';
import { isLoaded } from 'selectors/flavor';
import { actions, types } from 'reducers/flavor';

function* requestStashWorker() {
  try {
    const loaded = yield select(isLoaded);

    if (loaded) {
      return;
    }

    const user = yield call(getCurrentUser);

    if (!user?.id) {
      throw new Error('Must be logged in to utilize Flavor Stash');
    }

    const endpoint = {
      url: `/user/${user.id}/flavors`,
      method: 'GET'
    };

    const result = yield call(request.execute, { endpoint });

    if (result.success) {
      const { data } = result.response;

      if (!data) {
        return yield put(actions.requestStashSuccess([]));
      }

      yield put(actions.requestStashSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Request failed for an unspecified reason!');
    }
  } catch (error) {
    yield put(actions.requestFailure(error));
  }
}

function* addStashWorker({ flavor }) {
  try {
    const user = yield call(getCurrentUser);

    if (!user?.id) {
      throw new Error('Must be logged in to utilize Flavor Stash');
    }

    const endpoint = {
      url: `/user/${user.id}/flavor`,
      method: 'POST'
    };

    const data = {
      userId: user.id,
      flavorId: flavor.id
    };

    const result = yield call(request.execute, { endpoint, data });

    if (result.success) {
      yield put(actions.updateStashSuccess());
      yield call(helper.toast, {
        title: 'Stash Update',
        message: `Flavor ID ${flavor.id} successfully added!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(`Failed to add Flavor ID ${flavor.id} to the Stash!`);
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* removeStashWorker({ flavor }) {
  try {
    const user = yield call(getCurrentUser);

    if (!user?.id) {
      throw new Error('Must be logged in to utilize Flavor Stash');
    }

    const endpoint = {
      url: `/user/${user.id}/flavor/${flavor.id}`,
      method: 'DELETE'
    };

    const result = yield call(request.execute, { endpoint });

    if (result.success) {
      yield put(actions.updateStashSuccess());
      yield call(helper.toast, {
        title: 'Stash Update',
        message: `Flavor ID ${flavor.id} successfully removed!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(
        `Failed to remove Flavor ID ${flavor.id} from the Stash!`
      );
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* updateStashWorker({ flavor }) {
  try {
    const user = yield call(getCurrentUser);

    if (!user?.id) {
      throw new Error('Must be logged in to utilize Flavor Stash');
    }

    const endpoint = {
      url: `/user/${user.id}/flavor/${flavor.flavorId}`,
      method: 'PUT'
    };

    const data = {
      minMillipercent: flavor.minMillipercent * 1000,
      maxMillipercent: flavor.maxMillipercent * 1000
    };

    const result = yield call(request.execute, { endpoint, data });

    if (result.success) {
      yield put(actions.updateStashSuccess());
      yield call(helper.toast, {
        title: 'Stash Update',
        message: `Flavor ID ${flavor.flavorId} successfully updated!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(`Failed to update Stash Flavor ID ${flavor.flavorId}!`);
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

export const workers = {
  requestStashWorker,
  addStashWorker,
  removeStashWorker,
  updateStashWorker
};

function* requestStashWatcher() {
  yield takeLatest(types.REQUEST_STASH, requestStashWorker);
}

function* addStashWatcher() {
  yield takeLatest(types.ADD_STASH, addStashWorker);
}

function* removeStashWatcher() {
  yield takeLatest(types.REMOVE_STASH, removeStashWorker);
}

function* updateStashWatcher() {
  yield takeLatest(types.UPDATE_STASH, updateStashWorker);
}

export const watchers = {
  requestStashWatcher,
  addStashWatcher,
  removeStashWatcher,
  updateStashWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
