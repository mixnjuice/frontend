import { put, all, takeLatest } from 'redux-saga/effects';

import { actions, types } from 'reducers/recipe';

function* editRecipeWorker() {
  yield put(actions.EDIT_RECIPE_SUCCESS);
}

function* editRecipeWatcher() {
  return yield takeLatest(types.EDIT_RECIPE, editRecipeWorker);
}

function* revertRecipeWorker() {
  yield put(actions.REVERT_RECIPE_SUCCESS);
}

function* revertRecipeWatcher() {
  return yield takeLatest(types.REVERT_RECIPE, revertRecipeWorker);
}

function* requestRecipeWorker() {
  yield put(actions.REQUEST_RECIPE_SUCCESS);
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
  yield all([
    editRecipeWatcher(),
    revertRecipeWatcher(),
    requestRecipeWatcher()
  ]);
}
