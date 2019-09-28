import { all, put, call } from 'redux-saga/effects';

import request from 'utils/request';
import { actions } from 'reducers/flavors';
import { actions as toastActions } from 'reducers/toast';
import saga, { watchers, workers } from './flavors';

/* eslint-disable camelcase */
describe('dashboard sagas', () => {
  const flavors = { flavors: true };
  const flavorsEndpoint = {
    url: '/flavors',
    method: 'GET'
  };

  it('handles success in requestFlavorsWorker', () => {
    const gen = workers.requestFlavorsWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: flavorsEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: flavors
      }
    });

    expect(result.value).toEqual(put(actions.requestFlavorsSuccess(flavors)));
  });

  it('handles request failure in requestFlavorsWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.requestFlavorsWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: flavorsEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFlavorsFailure(error)));
  });

  it('handles unexpected error in requestFlavorsWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.requestFlavorsWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: flavorsEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFlavorsFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(
      put(
        toastActions.popToast({
          title: 'Error',
          icon: 'times-circle',
          message
        })
      )
    );
  });

  it('forks all watchers', () => {
    const gen = saga();
    const result = gen.next();

    expect(result.value).toEqual(
      all(Object.values(watchers).map(watcher => watcher()))
    );
  });
});
/* eslint-enable */
