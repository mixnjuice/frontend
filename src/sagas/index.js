import { all, fork } from 'redux-saga/effects';

import application from './application';
import toast from './toast';

export default function* saga() {
  yield all([application, toast].map(fork));
}
