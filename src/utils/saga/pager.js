import { call } from 'redux-saga/effects';
import { counter } from './counter';
import request from 'utils/request';

/**
 * Paged Helper
 * @param object req
 * @example { cached: rolesCached,
  pager: {
    ...pager,
    store: rolesPager
  },
  route: {
    count: '/roles/count',
    data: '/roles/'
  },
  type: 'Roles' }
*/
export function* pager(req) {
  const Pager = {};

  const {
    cached,
    pager: { store },
    route,
    type
  } = req;

  Pager.count = !store.count
    ? yield call(counter, { url: route.count, type })
    : store.count;
  Pager.limit = !req.pager.limit ? store.limit : req.pager.limit;
  Pager.pages =
    !store.pages || store.pages === null || req.pager.limit !== store.limit
      ? Math.ceil(Pager.count / Pager.limit)
      : store.pages;
  Pager.page = !req.pager.page ? store.page : req.pager.page;

  const { count, limit, page } = Pager;

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
      url: `${route.data}?limit=${limit}&offset=${offset}`,
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

export default { pager };
