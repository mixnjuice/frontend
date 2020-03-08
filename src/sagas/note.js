import { all, call, put, takeLatest, select, take } from 'redux-saga/effects';

import request from 'utils/request';
import { getUser } from 'selectors/application';
import { getFlavorNote } from 'selectors/note';
import { actions, types } from 'reducers/note';
import { actions as appActions, types as appTypes } from 'reducers/application';
import { actions as toastActions } from 'reducers/toast';

function* requestNoteWorker({ note }) {
  try {
    const { flavorId } = note;

    const collection = yield select(getFlavorNote);

    if (collection[flavorId]) {
      return yield put(actions.requestNoteSuccess(collection));
    }

    let userId = null;

    if (!note.userId) {
      let user = yield select(getUser);

      if (user === null) {
        yield put(appActions.requestCurrentUser());
        yield take([
          appTypes.REQUEST_CURRENT_USER_SUCCESS,
          appTypes.REQUEST_CURRENT_USER_FAILURE
        ]);
        user = yield select(getUser);
      }

      userId = user.id;
    } else {
      userId = note.userId;
    }

    const endpoint = {
      url: `/user/${userId}/note/${flavorId}`,
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    if (result.success) {
      const {
        response: { data }
      } = result;

      if (!data) {
        collection[flavorId] = false;
        return yield put(actions.requestNoteSuccess(collection));
      }

      collection[flavorId] = data[0];

      return yield put(actions.requestNoteSuccess(collection));
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

function* createNoteWorker({ flavorNote }) {
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

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(flavorNote));

    const endpoint = {
      url: `/user/${user.id}/note`,
      method: 'POST'
    };

    const { flavorId, note } = flavorNote;

    const data = {
      userId: user.id,
      flavorId,
      note
    };

    const result = yield call(request.execute, { endpoint, data });

    if (result.success) {
      yield put(actions.createNoteSuccess());
      yield put(
        toastActions.popToast({
          title: 'Note',
          icon: 'times-circle',
          message: `Flavor ID ${flavorId} Note successfully created!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(`Failed to create Flavor ID ${flavorId} Note!`);
    }
  } catch (error) {
    const { message } = error;

    // eslint-disable-next-line
    console.dir(error);

    yield put(actions.createNoteFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* deleteNoteWorker({ flavorNote }) {
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
      url: `/user/${user.id}/flavor/${flavorNote.id}`,
      method: 'DELETE'
    };

    const result = yield call(request.execute, { endpoint });

    if (result.success) {
      yield put(actions.deleteNoteSuccess());
      yield put(
        toastActions.popToast({
          title: 'Note Update',
          icon: 'times-circle',
          message: `Flavor ID ${flavorNote.id} successfully deleted!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(
        `Failed to delete Flavor ID ${flavorNote.id} from the Note!`
      );
    }
  } catch (error) {
    const { message } = error;

    // eslint-disable-next-line
    console.dir(error);

    yield put(actions.deleteNoteFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* updateNoteWorker({ flavorNote }) {
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

    const { flavorId, note } = flavorNote;

    const data = {
      userId: user.id,
      flavorId,
      note
    };

    const endpoint = {
      url: `/user/${user.id}/note/${flavorId}`,
      method: 'PUT'
    };

    const result = yield call(request.execute, { endpoint, data });

    if (result.success) {
      yield put(actions.updateNoteSuccess());
      yield put(
        toastActions.popToast({
          title: 'Note Update',
          icon: 'times-circle',
          message: `Flavor ID ${flavorId} Note successfully updated!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(`Failed to update Note Flavor ID ${flavorId}!`);
    }
  } catch (error) {
    const { message } = error;

    // eslint-disable-next-line
    console.dir(error);

    yield put(actions.updateNoteFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

export const workers = {
  requestNoteWorker,
  createNoteWorker,
  deleteNoteWorker,
  updateNoteWorker
};

function* requestNoteWatcher() {
  yield takeLatest(types.REQUEST_NOTE, requestNoteWorker);
}

function* createNoteWatcher() {
  yield takeLatest(types.CREATE_NOTE, createNoteWorker);
}

function* deleteNoteWatcher() {
  yield takeLatest(types.DELETE_NOTE, deleteNoteWorker);
}

function* updateNoteWatcher() {
  yield takeLatest(types.UPDATE_NOTE, updateNoteWorker);
}

export const watchers = {
  requestNoteWatcher,
  createNoteWatcher,
  deleteNoteWatcher,
  updateNoteWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
