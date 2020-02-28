import { call } from 'redux-saga/effects';
import request from 'utils/request';
import { pager } from './pager';
import { counter } from './counter';

/** Example Usage
const response = yield call(helpers.pager, {
  cached: rolesCached,
  pager: {
    ...pager,
    store: rolesPager
  },
  route: {
    count: '/roles/count',
    data: '/roles/'
  },
  type: 'Roles'
});
 */

describe('pager saga helper', () => {
  const roles = [
    { id: 1, name: 'Administrator' },
    { id: 2, name: 'User' },
    { id: 3, name: 'testers' },
    { id: 5, name: 'gimps' }
  ];

  const cached = [
    [
      { id: 1, name: 'Administrator' },
      { id: 2, name: 'User' },
      { id: 3, name: 'testers' },
      { id: 5, name: 'gimps' }
    ]
  ];

  const rolesEndpoint = {
    url: '/roles/?limit=20&offset=1',
    method: 'GET'
  };

  const count = { result: 20 };

  const Pager = {
    count,
    limit: 20,
    page: 1,
    pages: 1,
    store: {
      limit: 20,
      page: 1,
      pages: 1
    }
  };

  const req = {
    cached,
    pager: Pager,
    route: {
      count: '/roles/count',
      data: '/roles/'
    },
    type: 'Roles'
  };

  it('handles success in pager', () => {
    const gen = pager(req);

    let result = gen.next(count);

    expect(result.value).toEqual(
      call(counter, { url: req.route.count, type: req.type })
    );

    result = gen.next(Pager);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: rolesEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: roles
      }
    });
  });
});
