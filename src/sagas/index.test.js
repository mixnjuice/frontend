import { fork } from 'redux-saga/effects';

import saga from './index';
import application from './application';
import dashboard from './dashboard';
import flavors from './flavors';
import roles from './roles';
import users from './users';

describe('index saga', () => {
  it('forks all sagas', () => {
    const gen = saga();

    let result = gen.next();

    expect(result.value).toEqual(fork(application));
    result = gen.next();
    expect(result.value).toEqual(fork(dashboard));
    result = gen.next();
    expect(result.value).toEqual(fork(flavors));
    result = gen.next();
    expect(result.value).toEqual(fork(roles));
    result = gen.next();
    expect(result.value).toEqual(fork(users));
  });
});
