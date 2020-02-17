import { fork, all } from 'redux-saga/effects';

import saga from './index';
import profile from './profile';
import toast from './toast';
import flavor from './flavor';
import recipe from './recipe';
import application from './application';

describe('index saga', () => {
  it('forks all sagas', () => {
    const gen = saga();
    const result = gen.next();

    expect(result.value).toEqual(
      all([application, profile, toast, flavor, recipe].map(fork))
    );
  });
});
