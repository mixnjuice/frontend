import { call } from 'redux-saga/effects';

import request from 'utils/request';

/**
 * Counter Helper
 * @param {*} url
 * @param {*} type
 */
export function* counter({ url, type }) {
  const endpoint = {
    url,
    method: 'GET'
  };
  const count = yield call(request.execute, { endpoint });

  if (count.success) {
    const {
      response: { data }
    } = count;

    return data;
  } else if (count.error) {
    throw count.error;
  } else {
    throw new Error(`Failed to count ${type}!`);
  }
}

/**
 * Pager Helper
 * @param {*} req
 */
export function* pager({ req }) {
  const Pager = {};

  const {
    pager: { limit, page, store },
    path,
    type
  } = req;

  Pager.count = !store.count
    ? yield call(counter, { url: path.counter, type })
    : store.count;
  Pager.limit = !limit ? store.limit : limit;
  Pager.pages =
    !store.pages || store.pages === null || limit !== store.limit
      ? Math.ceil(Pager.count / Pager.limit)
      : store.pages;
  Pager.page = !page ? store.page : page;

  return Pager;
}

/**
 * Paged Helper
 * @param {*} req
 */
export function* paged(req) {
  const Pager = yield call(pager, { req });
  const { count, limit, page } = Pager;
  const { path, cached, type } = req;

  if (
    !cached[page] ||
    (count > Number(limit) && cached[page].length !== Number(limit)) ||
    (count < Number(limit) && cached[page].length !== count)
  ) {
    let offset = page * limit - limit + 1;

    if (offset > count) {
      offset = count - limit;
    }
    const endpoint = {
      url: `${path.query}?limit=${limit}&offset=${offset}`,
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update role in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      cached[page] = data;

      return { cached, pager: Pager };
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error(`Failed to get ${type}!`);
    }
  } else {
    return { cached, pager: Pager };
  }
}

export default { counter, pager, paged };
