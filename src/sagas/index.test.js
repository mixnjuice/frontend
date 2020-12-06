import { fork, all } from 'redux-saga/effects';

import saga from './index';
import application from './application';
import dashboard from './dashboard';
import flavor from './flavor';
import flavors from './flavors';
import note from './note';
import profile from './profile';
import recipe from './recipe';
import roles from './roles';
import toast from './toast';
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
          flavor,
          flavors,
          note,
          profile,
          recipe,
          roles,
          toast,
          users
        ].map(fork)
      )
    );
  });
});
