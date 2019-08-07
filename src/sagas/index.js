import { fork } from 'redux-saga/effects';

import application from './application';
import users from './users';

export default function* saga() {
  yield fork(application);
  yield fork(users);
}
