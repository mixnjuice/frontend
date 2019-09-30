import { put, all, takeLatest, call } from 'redux-saga/effects';

import request from 'utils/request';
import { actions, types } from 'reducers/recipe';

function* editRecipeWorker() {
  try {
    const endpoint = {
      url: '/recipe',
      method: 'POST'
    };
    const result = yield call(request.execute, { endpoint });

    if (!result.success) {
      throw result.error;
    }

    yield put(actions.editRecipeSuccess());
  } catch (error) {
    yield put(actions.editRecipeFailure(error));
  }
}

function* editRecipeWatcher() {
  return yield takeLatest(types.EDIT_RECIPE, editRecipeWorker);
}

function* revertRecipeWorker() {
  yield put(actions.revertRecipeSuccess());
}

function* revertRecipeWatcher() {
  return yield takeLatest(types.REVERT_RECIPE, revertRecipeWorker);
}

function* requestRecipeWorker(id) {
  try {
    const endpoint = {
      url: `/recipe/${id}`,
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    if (!result.success) {
      throw result.error;
    }

    const {
      data: { recipe }
    } = result.response;

    yield put(actions.requestRecipeSuccess(recipe));
  } catch (error) {
    yield put(actions.requestRecipeFailure(error));
  }
}

function* requestRecipeWatcher() {
  return yield takeLatest(types.REQUEST_RECIPE, requestRecipeWorker);
}

export const watchers = {
  editRecipeWatcher,
  revertRecipeWatcher,
  requestRecipeWatcher
};

export const workers = {
  editRecipeWorker,
  revertRecipeWorker,
  requestRecipeWorker
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
