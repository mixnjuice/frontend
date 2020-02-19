import { call } from 'redux-saga/effects';

import request from 'utils/request';

/**
 * Counter Helper
 * @param {url} url Route to the counter
 * @param {type} type What is being counted
 * @eample { url: '/roles/count', type: 'Roles' }
 */
export function* counter({ url, type }) {
  const endpoint = {
    url,
    method: 'GET'
  };
  const count = yield call(request.execute, { endpoint });

  if (count.success) {
    const {
      response: {
        data: { result }
      }
    } = count;

    return result;
  } else if (count.error) {
    throw count.error;
  } else {
    throw new Error(`Failed to count ${type}!`);
  }
}

export default { counter };
