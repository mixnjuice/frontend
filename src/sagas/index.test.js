import { fork } from 'redux-saga/effects';

import saga from './index';
import application from './application';

describe('index saga', () => {
  it('forks all sagas', () => {
    const gen = saga();
    const result = gen.next();

    expect(result.value).toEqual(fork(application));
  });
});
