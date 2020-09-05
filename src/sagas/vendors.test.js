import { all, put, call, select } from 'redux-saga/effects';
import helper from 'utils/saga';
import { actions } from 'reducers/vendors';
import saga, { watchers, workers } from './vendors';
import { getCachedVendors, getVendorsPager } from 'selectors/vendors';

describe('vendors sagas', () => {
  const vendors = { vendors: true };

  const pager = {
    count: 25,
    limit: 20,
    page: 1,
    pages: 2
  };

  it('handles success in requestVendorsWorker', () => {
    const response = { cached: vendors, pager };
    const gen = workers.requestVendorsWorker({ pager });

    let result = gen.next();

    expect(result.value).toEqual(select(getCachedVendors));

    result = gen.next(vendors);

    expect(result.value).toEqual(select(getVendorsPager));

    result = gen.next(pager);

    expect(result.value).toEqual(
      call(helper.pager, {
        cached: vendors,
        pager: {
          ...pager,
          store: pager
        },
        route: {
          count: '/vendors/count',
          data: '/vendors/'
        },
        type: 'Vendors'
      })
    );

    result = gen.next(response);

    expect(result.value).toEqual(
      put(actions.requestVendorsSuccess(vendors, pager))
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
