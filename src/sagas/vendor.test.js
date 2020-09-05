import { all, put, call, select } from 'redux-saga/effects';
import helper from 'utils/saga';
import request from 'utils/request';
import { actions } from 'reducers/vendor';
import { actions as vendorsActions, initialState } from 'reducers/vendors';
import saga, { watchers, workers } from './vendor';
import { getVendor } from 'selectors/vendor';

describe('vendor sagas', () => {
  const vendorId = 1;
  const vendorEndpoint = {
    url: `/vendor/${vendorId}`,
    method: 'GET'
  };
  const name = 'Bake Flavors';
  const vendor = {
    id: 1,
    name,
    slug: 'baker-flavors',
    code: 'BF'
  };

  it('handles success in requestVendorWorker', () => {
    const gen = workers.requestVendorWorker({ vendorId });

    let result = gen.next();

    expect(result.value).toEqual(select(getVendor));

    result = gen.next(vendor);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: vendorEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: vendor
      }
    });

    expect(result.value).toEqual(put(actions.requestVendorSuccess(vendor)));
  });

  it('handles request failure in requestVendorWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.requestVendorWorker({ vendorId });

    let result = gen.next();

    expect(result.value).toEqual(select(getVendor));

    result = gen.next(vendor);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: vendorEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));
  });

  it('handles unexpected error in requestVendorWorker', () => {
    const error = new Error('Failed to get vendor!');
    const { message } = error;
    const gen = workers.requestVendorWorker({ vendorId });

    let result = gen.next();

    expect(result.value).toEqual(select(getVendor));

    result = gen.next(vendor);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: vendorEndpoint })
    );

    result = gen.next({
      success: false,
      message
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(call(helper.errorToast, message));
  });

  const details = { name: 'Baker Flavors', slug: 'baker-flavors', code: 'BF' };
  const data = { name: 'Baker Flavors', slug: 'baker-flavors', code: 'BF' };

  const createEndpoint = {
    url: '/vendor',
    method: 'POST'
  };

  it('handles success in createVendorWorker', () => {
    const gen = workers.createVendorWorker({ vendor: details });

    let result = gen.next(data);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: createEndpoint, data })
    );

    result = gen.next({
      success: true,
      data
    });

    expect(result.value).toEqual(
      put(
        vendorsActions.requestVendorsSuccess(
          initialState.cache,
          initialState.pager
        )
      )
    );

    result = gen.next();

    expect(result.value).toEqual(
      call(helper.toast, {
        title: 'Vendor Created',
        message: `${data.name} vendor successfully created!`
      })
    );
  });

  it('handles request failure in createVendorWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.createVendorWorker({ vendor: details });

    let result = gen.next(data);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: createEndpoint, data })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));
  });

  it('handles unexpected error in createVendorWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.createVendorWorker({ vendor: details });

    let result = gen.next(data);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: createEndpoint, data })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(call(helper.errorToast, message));
  });

  const updateEndpoint = {
    url: `/vendor/${vendorId}`,
    method: 'PUT'
  };

  it('handles success in updateVendorWorker', () => {
    vendor.vendorId = 1;
    const gen = workers.updateVendorWorker({
      vendor
    });

    let result = gen.next(vendor);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: updateEndpoint, data })
    );

    result = gen.next({
      success: true,
      data
    });

    expect(result.value).toEqual(
      put(
        vendorsActions.requestVendorsSuccess(
          initialState.cache,
          initialState.pager
        )
      )
    );

    result = gen.next();

    expect(result.value).toEqual(
      call(helper.toast, {
        title: 'Edit Vendor',
        message: `${data.name} vendor successfully updated!`
      })
    );
  });

  it('handles request failure in updateVendorWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.updateVendorWorker({ vendor: details });

    let result = gen.next(vendor);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: updateEndpoint, data })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));
  });

  it('handles unexpected error in updateVendorWorker', () => {
    vendor.vendorId = 1;
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.updateVendorWorker({ vendor: details });

    let result = gen.next(vendor);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: updateEndpoint, data })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(call(helper.errorToast, message));
  });

  const deleteEndpoint = {
    url: `/vendor/${vendorId}`,
    method: 'DELETE'
  };

  it('handles success in deleteVendorWorker', () => {
    const gen = workers.deleteVendorWorker({ vendorId, name });

    let result = gen.next(vendorId, name);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: deleteEndpoint })
    );

    result = gen.next({
      success: true
    });

    expect(result.value).toEqual(
      put(
        vendorsActions.requestVendorsSuccess(
          initialState.cache,
          initialState.pager
        )
      )
    );

    result = gen.next();

    expect(result.value).toEqual(
      call(helper.toast, {
        title: 'Delete Vendor',
        message: `${name} vendor successfully deleted!`
      })
    );
  });

  it('handles request failure in deleteVendorWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.deleteVendorWorker({ vendorId, name });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: deleteEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));
  });

  it('handles unexpected error in deleteVendorWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.deleteVendorWorker({ vendorId, name });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: deleteEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(call(helper.errorToast, message));
  });

  it('forks all watchers', () => {
    const gen = saga();
    const result = gen.next();

    expect(result.value).toEqual(
      all(Object.values(watchers).map((watcher) => watcher()))
    );
  });
});
