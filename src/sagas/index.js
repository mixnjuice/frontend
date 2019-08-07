import { fork } from 'redux-saga/effects';

import application from './application';
import dashboard from './dashboard';
import flavors from './flavors';
import roles from './roles';
import users from './users';

export default function* saga() {
  yield fork(application);
  yield fork(dashboard);
  yield fork(flavors);
  yield fork(roles);
  yield fork(users);
}
