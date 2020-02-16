import { put } from 'redux-saga/effects';

import { actions as toastActions } from 'reducers/toast';

export function* toast(msg) {
  const { icon, title, message } = msg;
  const response = {};

  response.title = title ? title : 'Server Message';
  response.icon = icon ? icon : 'times-circle';

  yield put(
    toastActions.popToast({
      ...response,
      message
    })
  );
}

export function* errorToast({ message }) {
  yield put(
    toastActions.popToast({
      title: 'Error',
      icon: 'times-circle',
      message
    })
  );
}

export function* successToast(message) {
  yield put(
    toastActions.popToast({
      title: 'Success',
      icon: 'times-circle',
      message
    })
  );
}

export default { errorToast, successToast, toast };
