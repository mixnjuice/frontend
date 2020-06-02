import { all, put, call, select } from 'redux-saga/effects';
import helper from 'utils/saga';
import { actions } from 'reducers/flavors';
import saga, { watchers, workers } from './flavors';
import { getCachedFlavors, getFlavorsPager } from 'selectors/flavors';

describe('flavors sagas', () => {
  const flavors = { flavors: true };

  const pager = {
    count: 861,
    limit: 20,
    page: 1,
    pages: 40
  };

  it('handles success in requestFlavorsWorker', () => {
    const response = { cached: flavors, pager };
    const gen = workers.requestFlavorsWorker({ pager });

    let result = gen.next();

    expect(result.value).toEqual(select(getCachedFlavors));

    result = gen.next(flavors);

    expect(result.value).toEqual(select(getFlavorsPager));

    result = gen.next(pager);

    expect(result.value).toEqual(
      call(helper.pager, {
        cached: flavors,
        pager: {
          ...pager,
          store: pager
        },
        route: {
          count: '/flavors/count',
          data: '/flavors/'
        },
        type: 'Flavors'
      })
    );

    result = gen.next(response);

    expect(result.value).toEqual(
      put(actions.requestFlavorsSuccess(flavors, pager))
    );
  });

  it('forks all watchers', () => {
    const gen = saga();
    const result = gen.next();

    expect(result.value).toEqual(
      all(Object.values(watchers).map((watcher) => watcher()))
    );
  });
});
