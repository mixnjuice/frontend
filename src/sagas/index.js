import { all, fork } from 'redux-saga/effects';

import application from './application';
import toast from './toast';
import recipe from './recipe';

export default function* saga() {
  yield all([application, toast, recipe].map(fork));
}
