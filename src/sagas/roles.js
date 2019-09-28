import { all, call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { actions, types } from 'reducers/roles';
import { actions as toastActions } from 'reducers/toast';

function* requestRolesWorker() {
  try {
    const endpoint = {
      url: '/roles',
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update roles in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestRolesSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get roles!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestRolesFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
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
      yield put(actions.requestRoles());
      yield put(
        toastActions.popToast({
          title: 'Role Created',
          icon: 'times-circle',
          message: `${name} role successfully created!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to create role!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.createRoleFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
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
      yield put(actions.requestRoles());
      yield put(
        toastActions.popToast({
          title: 'Edit Role',
          icon: 'times-circle',
          message: `${name} role successfully updated!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to update role!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.updateRoleFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
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
      yield put(actions.requestRoles());
      yield put(
        toastActions.popToast({
          title: 'Delete Role',
          icon: 'times-circle',
          message: `${name} role successfully deleted!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to delete role!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.deleteRoleFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestRoleUsersWorker({ roleId }) {
  try {
    const endpoint = {
      url: '/users/role/' + roleId,
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

    yield put(actions.requestRoleUsersFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
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
      // yield put(actions.requestRoles());
      yield put(
        toastActions.popToast({
          title: 'User Role Added',
          icon: 'times-circle',
          message: `Role ${roleId} assigned to User ${userId}!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to assign role to user!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.createRoleUserFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
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
      // yield put(actions.requestRoles());
      yield put(
        toastActions.popToast({
          title: 'Unassign User Role',
          icon: 'times-circle',
          message: `${name} role successfully unassigned!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to unassign role!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.deleteRoleUserFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
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
  yield all(Object.values(watchers).map(watcher => watcher()));
}
