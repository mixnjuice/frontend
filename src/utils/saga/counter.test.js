import { call } from 'redux-saga/effects';
import request from 'utils/request';
import { counter } from './counter';

/** Example Usage
const response = yield call(helpers.counter, { url: '/roles/count', type: 'Roles' });
 */

describe('counter saga helpers', () => {
  const countEndpoint = {
    url: '/roles/count',
    method: 'GET'
  };

  const count = { result: 20 };

  const req = {
    route: {
      count: '/roles/count',
      data: '/roles/'
    },
    type: 'Roles'
  };

  it('handles success in counter', () => {
    const gen = counter({ url: req.route.count, type: req.type });

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
});
