import { all, fork } from 'redux-saga/effects';

import application from './application';
import profile from './profile';
import toast from './toast';

export default function* saga() {
  yield all([application, profile, toast].map(fork));
}
