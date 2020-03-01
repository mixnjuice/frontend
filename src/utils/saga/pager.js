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
  const {
    cached,
    pager: { store },
    route,
    type
  } = req;

  const Pager = {
    count: !store.count
      ? yield call(counter, { url: route.count, type })
      : store.count,
    limit: req.pager.limit || store.limit,
    page: req.pager.page || store.page
  };

  Pager.pages =
    !store.pages || store.pages === null || req.pager.limit !== store.limit
      ? Math.ceil(Pager.count / Pager.limit)
      : store.pages;

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
