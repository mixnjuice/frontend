import { all, fork } from 'redux-saga/effects';

import application from './application';
import dashboard from './dashboard';
import flavor from './flavor';
import flavors from './flavors';
import profile from './profile';
import recipe from './recipe';
import roles from './roles';
import toast from './toast';
import users from './users';
import vendor from './vendor';
import vendors from './vendors';

export default function* saga() {
  yield all(
    [
      application,
      dashboard,
      flavor,
      flavors,
      profile,
      recipe,
      roles,
      toast,
      users,
      vendor,
      vendors
    ].map(fork)
  );
}
