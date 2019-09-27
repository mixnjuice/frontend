import { fork, all } from 'redux-saga/effects';

import saga from './index';
import application from './application';
import dashboard from './dashboard';
import flavors from './flavors';
import roles from './roles';
import toast from './toast';
import users from './users';

describe('index saga', () => {
  it('forks all sagas', () => {
    const gen = saga();

    const result = gen.next();

    expect(result.value).toEqual(
      all([application, dashboard, flavors, roles, toast, users].map(fork))
    );
  });
});
