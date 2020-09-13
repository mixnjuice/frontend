import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import helper from 'utils/saga';
import { getFlavorNote } from 'selectors/note';
import { actions, types } from 'reducers/note';
import { getCurrentUser } from 'sagas/profile';

function* requestNoteWorker({ note }) {
  try {
    const { flavorId } = note;

    yield put(actions.requestLoading(flavorId));

    let userId;

    if (!note.userId) {
      const user = yield call(getCurrentUser);

      if (!user?.id) {
        throw new Error('Must be logged in to utilize Flavor Stash');
      }

      userId = user.id;
    } else {
      userId = note.userId;
    }

    const collection = yield select(getFlavorNote);

    if (collection[flavorId]) {
      return yield put(actions.requestNoteSuccess(collection));
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
    yield put(actions.requestFailure(error));
  }
}

function* createNoteWorker({ flavorNote }) {
  try {
    const { flavorId, note } = flavorNote;

    yield put(actions.requestLoading(flavorId));

    const user = yield call(getCurrentUser);

    if (!user?.id) {
      throw new Error('Must be logged in to utilize Flavor Stash');
    }

    const endpoint = {
      url: `/user/${user.id}/note`,
      method: 'POST'
    };

    const data = {
      userId: user.id,
      flavorId,
      note
    };

    const result = yield call(request.execute, { endpoint, data });

    if (result.success) {
      yield put(actions.createNoteSuccess({ flavorId, note }));
      yield call(helper.toast, {
        title: 'Note',
        message: `Flavor ID ${flavorId} Note successfully created!`
      });
      yield put(actions.requestNote({ flavorId }));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(`Failed to create Flavor ID ${flavorId} Note!`);
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* deleteNoteWorker({ flavorNote }) {
  try {
    const { flavorId } = flavorNote;

    yield put(actions.requestLoading(flavorId));

    const user = yield call(getCurrentUser);

    if (!user?.id) {
      throw new Error('Must be logged in to utilize Flavor Stash');
    }

    const endpoint = {
      url: `/user/${user.id}/note/${flavorId}`,
      method: 'DELETE'
    };

    const result = yield call(request.execute, { endpoint });

    if (result.success) {
      yield put(actions.deleteNoteSuccess(flavorId));
      yield call(helper.toast, {
        title: 'Note',
        message: `Flavor ID ${flavorId} note successfully deleted!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(`Failed to delete Flavor ID ${flavorId} note!`);
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* updateNoteWorker({ flavorNote }) {
  try {
    const { flavorId, note } = flavorNote;

    yield put(actions.requestLoading(flavorId));

    const user = yield call(getCurrentUser);

    if (!user?.id) {
      throw new Error('Must be logged in to utilize Flavor Stash');
    }

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
      yield put(actions.updateNoteSuccess({ flavorId, note }));
      yield call(helper.toast, {
        title: 'Note',
        message: `Flavor ID ${flavorId} Note successfully updated!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(`Failed to update Note Flavor ID ${flavorId}!`);
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
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
  yield all(Object.values(watchers).map((watcher) => watcher()));
}
