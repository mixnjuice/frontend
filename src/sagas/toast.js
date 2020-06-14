import { nanoid } from 'nanoid';
import { put, delay, takeEvery, all } from 'redux-saga/effects';

import { actions, types } from 'reducers/toast';

function* popToastWorker({ toast }) {
  // ensure there is a unique key for each toast
  const id = toast.id || nanoid();

  toast.id = id;
  toast.show = true;

  yield put(actions.addToast(toast));
  yield delay(toast.interval || 5000);
  yield put(actions.hideToast(id));
  // this is the default Fade transition time
  yield delay(500);
  yield put(actions.removeToast(id));
}

function* popToastWatcher() {
  yield takeEvery(types.POP_TOAST, popToastWorker);
}

export const workers = {
  popToastWorker
};

export const watchers = {
  popToastWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map((watcher) => watcher()));
}
