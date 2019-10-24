import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { getCachedUsers, getUsersPager } from 'selectors/users';
import { actions, types } from 'reducers/users';
import { actions as toastActions } from 'reducers/toast';

function* requestUsersWorker({ pager }) {
  try {
    const usersPager = yield select(getUsersPager);

    // Initial/previous values stored
    let { count, limit, page } = usersPager;
    const { pages } = usersPager;

    let endpoint = {};

    if (!count) {
      endpoint = {
        url: '/users/count',
        method: 'GET'
      };
      const usersCount = yield call(request.execute, { endpoint });

      if (usersCount.success) {
        const {
          response: { data }
        } = usersCount;
        // Set pager to be passed into Success, Update count

        pager.count = data;
      } else if (usersCount.error) {
        throw usersCount.error;
      } else {
        throw new Error('Failed to count users!');
      }
    } else {
      pager.count = count;
    }

    if (!pager.limit) {
      pager.limit = limit;
    }
    // Temporary solution for Roles/Add user list
    // - Will revise once Roles/Add is refactored
    if (pager.limit === 'none') {
      pager = {
        ...pager,
        limit: pager.count,
        pages: 1
      };
    } else {
      pager.pages =
        !pages || pages === null || pager.limit !== limit
          ? Math.ceil(pager.count / pager.limit)
          : pages;
    }

    if (!pager.page) {
      pager.page = page;
    }
    // Refresh these values to the desired values (from pager)
    count = pager.count;
    limit = pager.limit;
    page = pager.page;

    const cached = yield select(getCachedUsers);

    if (
      !cached[page] ||
      (count > Number(limit) && cached[page].length !== Number(limit))
    ) {
      let offset = page * limit - limit + 1;

      if (offset > count) {
        // Prevent an offset higher than total amount of users
        // - Consider a max limit/offset
        offset = count - limit;
      }
      endpoint = {
        url: `/users/accounts/?limit=${limit}&offset=${offset}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      // update user in state or throw an error
      if (result.success) {
        const {
          response: { data }
        } = result;

        cached[page] = data;

        yield put(actions.requestUsersSuccess(cached, pager));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get users!');
      }
    } else {
      yield put(actions.requestUsersSuccess(cached, pager));
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestUsersFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestUserWorker({ userId }) {
  try {
    const endpoint = {
      url: `/user/${userId}`,
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update user in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestUserSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get user!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestUserFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestUserRolesWorker({ userId }) {
  try {
    const endpoint = {
      url: `/user/${userId}/roles`,
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update user roles in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestUserRolesSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get user roles!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestUserRolesFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestUsersWatcher() {
  yield takeLatest(types.REQUEST_USERS, requestUsersWorker);
}

function* requestUserWatcher() {
  yield takeLatest(types.REQUEST_USER, requestUserWorker);
}

function* requestUserRolesWatcher() {
  yield takeLatest(types.REQUEST_USER_ROLES, requestUserRolesWorker);
}

export const workers = {
  requestUsersWorker,
  requestUserWorker,
  requestUserRolesWorker
};

export const watchers = {
  requestUsersWatcher,
  requestUserWatcher,
  requestUserRolesWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
