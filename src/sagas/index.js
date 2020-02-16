import { all, fork } from 'redux-saga/effects';

import application from './application';
import toast from './toast';
import flavor from './flavor';
import recipe from './recipe';

export default function* saga() {
  yield all([application, toast, flavor, recipe].map(fork));
}
