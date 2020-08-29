import { all, put, delay, takeEvery } from 'redux-saga/effects';

import { actions, types } from 'reducers/toast';
import toastSaga, { workers, watchers } from 'sagas/toast';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'testing')
}));

describe('toast sagas', () => {
  it('runs popToastWorker', () => {
    const defaultInterval = 5000;
    const toast = {
      title: 'Test',
      icon: 'heart',
      message: 'Testing'
    };
    const modifiedToast = {
      ...toast,
      id: 'testing',
      show: true
    };
    const gen = workers.popToastWorker({ toast });

    let result = gen.next();

    expect(result.value).toEqual(put(actions.addToast(modifiedToast)));

    result = gen.next();

    expect(result.value).toEqual(delay(defaultInterval));

    result = gen.next();

    expect(result.value).toEqual(put(actions.hideToast(modifiedToast.id)));

    result = gen.next();

    expect(result.value).toEqual(delay(500));

    result = gen.next();

    expect(result.value).toEqual(put(actions.removeToast(modifiedToast.id)));
  });

  it('runs popToastWatcher', () => {
    const gen = watchers.popToastWatcher();

    let result = gen.next();

    expect(result.value).toEqual(
      takeEvery(types.POP_TOAST, workers.popToastWorker)
    );

    result = gen.next();

    expect(result.done).toBeTruthy();
  });

  it('forks all watchers', () => {
    const gen = toastSaga();
    const result = gen.next();

    expect(result.value).toEqual(
      all(Object.values(watchers).map((watcher) => watcher()))
    );
  });
});
