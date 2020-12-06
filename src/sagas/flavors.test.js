import { all, call, put, select } from 'redux-saga/effects';

import saga, { watchers, workers } from './flavors';
import { actions } from 'reducers/flavors';
import { getFilter } from 'selectors/flavors';
import request from 'utils/request';

describe('flavors sagas', () => {
  const filter = 'test';
  const endpoint = {
    url: `/flavors?limit=100&offset=1&filter=${filter}`,
    method: 'GET'
  };
  const flavors = [];
  const error = 'Failure';
  const success = {
    success: true,
    response: {
      data: flavors
    }
  };
  const failure = {
    success: false,
    error
  };

  it('handles success in requestFlavorsWorker', () => {
    const gen = workers.requestFlavorsWorker();

    let result = gen.next();

    expect(result.value).toEqual(select(getFilter));

    result = gen.next(filter);

    expect(result.value).toEqual(call(request.execute, { endpoint }));

    result = gen.next(success);

    expect(result.value).toEqual(put(actions.requestFlavorsSuccess(flavors)));
  });

  it('handles failure in requestFlavorsWorker', () => {
    const gen = workers.requestFlavorsWorker();

    let result = gen.next();

    expect(result.value).toEqual(select(getFilter));

    result = gen.next(filter);

    expect(result.value).toEqual(call(request.execute, { endpoint }));

    result = gen.next(failure);

    expect(result.value).toEqual(put(actions.requestFlavorsFailure(error)));
  });

  it('forks all watchers', () => {
    const gen = saga();
    const result = gen.next();

    expect(result.value).toEqual(
      all(Object.values(watchers).map((watcher) => watcher()))
    );
  });
});
