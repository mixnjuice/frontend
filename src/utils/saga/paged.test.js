import { call } from 'redux-saga/effects';
import request from 'utils/request';
import { counter, pager, paged } from './paged';

/** Example Usage
const response = yield call(helpers.paged, {
  cached: rolesCached,
  pager: {
    ...pager,
    store: rolesPager
  },
  path: {
    counter: '/roles/count',
    query: '/roles/'
  },
  type: 'Roles'
});
 */

describe('pager saga helpers', () => {
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

  const countEndpoint = {
    url: '/roles/count',
    method: 'GET'
  };

  const count = { result: 20 };

  const Pager = {
    count,
    limit: 20,
    page: 1,
    pages: 1,
    store: {
      count,
      limit: 20,
      page: 1,
      pages: 1
    }
  };

  const req = {
    cached,
    pager: Pager,
    path: {
      counter: '/roles/count',
      query: '/roles/'
    },
    type: 'Roles'
  };

  it('handles success in counter', () => {
    const gen = counter({ url: req.path.counter, type: req.type });

    let result = gen.next(count);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: countEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: count
      }
    });
  });

  it('handles success in pager', () => {
    const gen = pager({ req });

    const result = gen.next();

    expect(result.value).toEqual({
      count: { result: 20 },
      limit: 20,
      page: 1,
      pages: 1
    });
  });

  it('handles success in paged', () => {
    const gen = paged(req);

    let result = gen.next(req);

    expect(result.value).toEqual(call(pager, { req }));

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
