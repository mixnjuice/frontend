import { all } from 'redux-saga/effects';

import appSaga from './application';

describe('application sagas', () => {
  it('forks all watchers', () => {
    const gen = appSaga();
    const result = gen.next();

    expect(result.value).toEqual(all([]));
  });
});
