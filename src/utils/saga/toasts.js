import { put } from 'redux-saga/effects';

import { actions as toastActions } from 'reducers/toast';
/**
 * Custom Toast Helper
 * @param object msg
 * @example
 * { title: 'Toast Title' (optional),
 *   icon: 'times-square' (optional),
 *   message: 'My response message' (required) }
 */
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
/**
 * Error Toast Helper
 * @param string message
 * @example 'An error occurred!'
 */
export function* errorToast(message) {
  yield put(
    toastActions.popToast({
      title: 'Error',
      icon: 'times-circle',
      message
    })
  );
}
/**
 * Success Toast Helper
 * @param string message
 * @example 'Successfully Created a Toast!'
 */
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
