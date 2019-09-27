import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { isLoaded } from 'selectors/users';
import { actions, types } from 'reducers/users';
import { actions as appActions } from 'reducers/application';

function* requestUsersWorker() {
  try {
    const loaded = yield select(isLoaded);

    if (!loaded.users) {
      const endpoint = {
        url: '/users/accounts',
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      // update user in state or throw an error
      if (result.success) {
        const {
          response: { data }
        } = result;

        yield put(actions.requestUsersSuccess(data));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get users!');
      }
    } else {
      yield put(actions.requestUsersSuccess(true));
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestUsersFailure(error));
    yield put(
      appActions.popToast({
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
      appActions.popToast({
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
      appActions.popToast({
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
