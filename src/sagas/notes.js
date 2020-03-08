import { all, call, put, takeLatest, select, take } from 'redux-saga/effects';

import request from 'utils/request';
import { getUser } from 'selectors/application';
import { isLoaded } from 'selectors/notes';
import { actions, types } from 'reducers/notes';
import { actions as appActions, types as appTypes } from 'reducers/application';

function* requestNotesWorker() {
  try {
    const loaded = yield select(isLoaded);

    if (loaded) {
      return true;
    }

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
        return yield put(actions.requestNoteSuccess([]));
      }

      yield put(actions.requestNoteSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Request failed for an unspecified reason!');
    }
  } catch (error) {
    // eslint-disable-next-line
    console.dir(error);
    yield put(actions.requestNoteFailure(error));
  }
}

export const workers = {
  requestNotesWorker
};

function* requestNotesWatcher() {
  yield takeLatest(types.REQUEST_NOTES, requestNotesWorker);
}

export const watchers = {
  requestNotesWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
