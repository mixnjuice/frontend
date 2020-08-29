import { call, all, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { actions, types } from 'reducers/recipes';

function* requestRecipesWorker({ search }) {
  try {
    const endpoint = {
      url: '/recipes',
      method: 'GET',
      data: search
    };
    const result = yield call(request.execute, { endpoint });

    if (!result.success) {
      throw result.error;
    }

    const { data: recipes } = result.response;

    yield put(actions.requestRecipesSuccess(recipes));
  } catch (error) {
    yield put(actions.requestRecipesFailure(error));
  }
}

function* requestRecipesWatcher() {
  return yield takeLatest(types.REQUEST_RECIPES, requestRecipesWorker);
}

export const watchers = {
  requestRecipesWatcher
};

export const workers = {
  requestRecipesWorker
};

export default function* saga() {
  yield all(Object.values(watchers).map((watcher) => watcher()));
}
