import { all, fork } from 'redux-saga/effects';

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

export default function* saga() {
  yield all(
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
  );
}
