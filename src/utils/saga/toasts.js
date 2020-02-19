import { put } from 'redux-saga/effects';

import { actions as toastActions } from 'reducers/toast';

const toastIcon = 'times-circle';

const success = {
  title: 'Success',
  icon: toastIcon
};

const error = {
  title: 'Error',
  icon: toastIcon
};

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
  const response = {
    title: title ? title : 'Server Message',
    icon: icon ? icon : toastIcon
  };

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
      ...error,
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
      ...success,
      message
    })
  );
}

export default { errorToast, successToast, toast };
