import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import helper from 'utils/saga';
import { getCachedRoles, getRolesPager } from 'selectors/roles';
import { actions, types } from 'reducers/roles';

function* requestRolesWorker({ pager }) {
  try {
    const cached = yield select(getCachedRoles);
    const store = yield select(getRolesPager);

    const response = yield call(helper.pager, {
      cached,
      pager: {
        ...pager,
        store
      },
      route: {
        count: '/roles/count',
        data: '/roles/'
      },
      type: 'Roles'
    });

    yield put(actions.requestRolesSuccess(response.cached, response.pager));
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* createRoleWorker({ name }) {
  try {
    const endpoint = {
      url: '/role',
      method: 'POST'
    };
    const data = {
      name
    };
    const result = yield call(request.execute, { endpoint, data });

    // update roles in state or throw an error
    if (result.success) {
      yield put(actions.clearCollection());
      yield put(actions.requestRoles({ page: 1, limit: 20 }));
      yield call(helper.toast, {
        title: 'Role Created',
        message: `${name} role successfully created!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to create role!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* updateRoleWorker({ roleId, name }) {
  try {
    const endpoint = {
      url: `/role/${roleId}`,
      method: 'PUT'
    };
    const data = {
      name
    };
    const result = yield call(request.execute, { endpoint, data });

    // update roles in state or throw an error
    if (result.success) {
      yield put(actions.clearCollection());
      yield put(actions.requestRoles({ page: 1, limit: 20 }));
      yield call(helper.toast, {
        title: 'Edit Role',
        message: `${name} role successfully updated!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to update role!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* deleteRoleWorker({ roleId, name }) {
  try {
    const endpoint = {
      url: `/role/${roleId}`,
      method: 'DELETE'
    };
    const result = yield call(request.execute, { endpoint });

    // update roles in state or throw an error
    if (result.success) {
      yield put(actions.clearCollection());
      yield put(actions.requestRoles({ page: 1, limit: 20 }));
      yield call(helper.toast, {
        title: 'Delete Role',
        message: `${name} role successfully deleted!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to delete role!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* requestRoleUsersWorker({ roleId }) {
  try {
    const endpoint = {
      url: `/users/role/${roleId}`,
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update role users in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestRoleUsersSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get role users!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* createRoleUserWorker({ userId, roleId, active }) {
  try {
    const endpoint = {
      url: `/user/${userId}/role`,
      method: 'POST'
    };
    const data = {
      userId,
      roleId,
      active
    };
    const result = yield call(request.execute, { endpoint, data });

    // update roles in state or throw an error
    if (result.success) {
      yield call(helper.toast, {
        title: 'User Role Added',
        message: `Role ${roleId} assigned to User ${userId}!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to assign role to user!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* deleteRoleUserWorker({ userId, roleId, name }) {
  try {
    const endpoint = {
      url: `/user/${userId}/role/${roleId}`,
      method: 'DELETE'
    };
    const result = yield call(request.execute, { endpoint });

    // update roles in state or throw an error
    if (result.success) {
      yield call(helper.toast, {
        title: 'Unassign User Role',
        message: `${name} role successfully unassigned!`
      });
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to unassign role!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield call(helper.errorToast, message);
  }
}

function* requestRolesWatcher() {
  yield takeLatest(types.REQUEST_ROLES, requestRolesWorker);
}

function* createRoleWatcher() {
  yield takeLatest(types.CREATE_ROLE, createRoleWorker);
}

function* updateRoleWatcher() {
  yield takeLatest(types.UPDATE_ROLE, updateRoleWorker);
}

function* deleteRoleWatcher() {
  yield takeLatest(types.DELETE_ROLE, deleteRoleWorker);
}

function* requestRoleUsersWatcher() {
  yield takeLatest(types.REQUEST_ROLE_USERS, requestRoleUsersWorker);
}

function* createRoleUserWatcher() {
  yield takeLatest(types.CREATE_ROLE_USER, createRoleUserWorker);
}

function* deleteRoleUserWatcher() {
  yield takeLatest(types.DELETE_ROLE_USER, deleteRoleUserWorker);
}

export const workers = {
  requestRolesWorker,
  createRoleWorker,
  updateRoleWorker,
  deleteRoleWorker,
  requestRoleUsersWorker,
  createRoleUserWorker,
  deleteRoleUserWorker
};

export const watchers = {
  requestRolesWatcher,
  createRoleWatcher,
  updateRoleWatcher,
  deleteRoleWatcher,
  requestRoleUsersWatcher,
  createRoleUserWatcher,
  deleteRoleUserWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map((watcher) => watcher()));
}
