import { all, put, call, select } from 'redux-saga/effects';

import request from 'utils/request';
import { actions } from 'reducers/flavors';
import { actions as toastActions } from 'reducers/toast';
import saga, { watchers, workers } from './flavors';
import { getCachedFlavors, getFlavorsPager } from 'selectors/flavors';

/* eslint-disable camelcase */
describe('dashboard sagas', () => {
  const flavors = { flavors: true };
  const count = true;
  const flavorsEndpoint = {
    url: '/flavors?limit=20&offset=21',
    method: 'GET'
  };
  const countEndpoint = {
    url: '/flavors/count',
    method: 'GET'
  };
  const pager = {
    count: null,
    limit: 20,
    page: 1,
    pages: null
  };

  it('handles success in requestFlavorsWorker', () => {
    const gen = workers.requestFlavorsWorker(pager);

    let result = gen.next();

    expect(result.value).toEqual(select(getFlavorsPager));

    result = gen.next();

    result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: countEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: count
      }
    });

    result = gen.next();

    expect(result.value).toEqual(select(getCachedFlavors));

    result = gen.next(false);

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
    const gen = workers.requestFlavorsWorker({ page: 1, limit: 20 });

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
    const gen = workers.requestFlavorsWorker({ page: 1, limit: 20 });

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
