import { all, fork } from 'redux-saga/effects';

import application from './application';
import flavor from './flavor';
import flavors from './flavors';
import profile from './profile';
import recipe from './recipe';
import toast from './toast';

export default function* saga() {
  yield all([application, flavor, flavors, profile, recipe, toast].map(fork));
}
