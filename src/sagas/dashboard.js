import { all, call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { actions, types } from 'reducers/dashboard';
import { actions as toastActions } from 'reducers/toast';

function* requestDashboardWorker(dashboardComponent) {
  yield put(actions.requestDashboardSuccess(dashboardComponent));
}
function* selectDashboardWorker({ name, item }) {
  yield put(actions.selectDashboardSuccess({ name, item }));
}
function* requestMigrationsWorker() {
  try {
    const endpoint = {
      url: '/data/version',
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update migrations in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestMigrationsSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get migrations!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestMigrationsFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestStatsWorker() {
  try {
    const endpoint = {
      url: '/stats/dashboard',
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update stats in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestStatsSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get statistics!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestStatsFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestDashboardWatcher() {
  yield takeLatest(types.REQUEST_DASHBOARD, requestDashboardWorker);
}

function* selectDashboardWatcher() {
  yield takeLatest(types.SELECT_DASHBOARD, selectDashboardWorker);
}

function* requestMigrationsWatcher() {
  yield takeLatest(types.REQUEST_MIGRATIONS, requestMigrationsWorker);
}

function* requestStatsWatcher() {
  yield takeLatest(types.REQUEST_STATS, requestStatsWorker);
}

export const workers = {
  requestDashboardWorker,
  selectDashboardWorker,
  requestMigrationsWorker,
  requestStatsWorker
};

export const watchers = {
  requestDashboardWatcher,
  selectDashboardWatcher,
  requestMigrationsWatcher,
  requestStatsWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
