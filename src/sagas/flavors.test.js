import { all, put, call, select } from 'redux-saga/effects';

import request from 'utils/request';
import { actions } from 'reducers/flavors';
import { actions as toastActions } from 'reducers/toast';
import saga, { watchers, workers } from './flavors';
import { getCachedFlavors, getFlavorsPager } from 'selectors/flavors';

describe('flavors sagas', () => {
  const flavors = { flavors: true };

  const flavorsEndpoint = {
    url: '/flavors/?limit=20&offset=1',
    method: 'GET'
  };
  const countEndpoint = {
    url: '/flavors/count',
    method: 'GET'
  };

  const count = 861;

  const pager = {
    count: 861,
    limit: 20,
    page: 1,
    pages: 40
  };

  it('handles success in requestFlavorsWorker', () => {
    const gen = workers.requestFlavorsWorker({ pager });

    let result = gen.next(pager);

    expect(result.value).toEqual(select(getFlavorsPager));

    result = gen.next(count);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: countEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: 861
      }
    });

    expect(result.value).toEqual(select(getCachedFlavors));

    result = gen.next(flavors);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: flavorsEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: flavors
      }
    });

    expect(result.value).toEqual(
      put(actions.requestFlavorsSuccess(flavors, pager))
    );
  });

  it('handles request failure in requestFlavorsWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.requestFlavorsWorker({ pager });

    let result = gen.next(pager);

    expect(result.value).toEqual(select(getFlavorsPager));

    result = gen.next(count);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: countEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: 861
      }
    });

    expect(result.value).toEqual(select(getCachedFlavors));

    result = gen.next(flavors);

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
    const gen = workers.requestFlavorsWorker({ pager });

    let result = gen.next(pager);

    expect(result.value).toEqual(select(getFlavorsPager));

    result = gen.next(count);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: countEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: 861
      }
    });

    expect(result.value).toEqual(select(getCachedFlavors));

    result = gen.next(flavors);

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
