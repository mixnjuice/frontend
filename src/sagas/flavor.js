import { all, call, put, takeLatest, select, take } from 'redux-saga/effects';

import request from 'utils/request';
import { getUser } from 'selectors/application';
import { actions, types } from 'reducers/flavor';
import { actions as appActions, types as appTypes } from 'reducers/application';

function* requestStashWorker() {
  try {
    let user = yield select(getUser);

    if (user === null) {
      yield put(appActions.requestCurrentUser());
      yield take([
        appTypes.REQUEST_CURRENT_USER_SUCCESS,
        appTypes.REQUEST_CURRENT_USER_FAILURE
      ]);
      user = yield select(getUser);
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
    // eslint-disable-next-line
    console.dir(error);
    yield put(actions.requestStashFailure(error));
  }
}

export const workers = {
  requestStashWorker
};

function* requestStashWatcher() {
  yield takeLatest(types.REQUEST_STASH, requestStashWorker);
}

export const watchers = {
  requestStashWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
