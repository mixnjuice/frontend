import { fork, all } from 'redux-saga/effects';

import saga from './index';
import profile from './profile';
import toast from './toast';
import flavor from './flavor';
import recipe from './recipe';
import application from './application';
import dashboard from './dashboard';
import flavors from './flavors';
import roles from './roles';
import users from './users';

describe('index saga', () => {
  it('forks all sagas', () => {
    const gen = saga();

    const result = gen.next();

    expect(result.value).toEqual(
      all(
        [
          application,
          dashboard,
          flavors,
          profile,
          roles,
          toast,
          flavor,
          recipe,
          users
        ].map(fork)
      )
    );
  });
});
