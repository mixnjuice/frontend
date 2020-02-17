import { all, fork } from 'redux-saga/effects';

import application from './application';
import dashboard from './dashboard';
import flavors from './flavors';
import roles from './roles';
import toast from './toast';
import users from './users';
import flavor from './flavor';
import recipe from './recipe';

export default function* saga() {
  yield all(
    [application, dashboard, flavors, roles, toast, flavor, recipe, users].map(
      fork
    )
  );
}
