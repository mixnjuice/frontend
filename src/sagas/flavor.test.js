import { all, put, call, select } from 'redux-saga/effects';
import helper from 'utils/saga';
import request from 'utils/request';
import { actions } from 'reducers/flavor';
import saga, { watchers, workers } from './flavor';
import { isLoaded } from 'selectors/flavor';
import { getCurrentUser } from 'sagas/profile';

describe('flavor sagas', () => {
  const stash = [
    {
      userId: '1',
      flavorId: '1',
      created: '2020-03-08T01:35:49.790Z',
      minMillipercent: null,
      maxMillipercent: null,
      UserId: '1',
      Flavor: {
        id: '1',
        vendorId: 3,
        name: '27 Bears',
        slug: null,
        density: null,
        Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
      }
    },
    {
      userId: '1',
      flavorId: '2',
      created: '2020-03-08T01:47:10.174Z',
      minMillipercent: null,
      maxMillipercent: null,
      UserId: '1',
      Flavor: {
        id: '2',
        vendorId: 3,
        name: '27 Fish',
        slug: null,
        density: null,
        Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
      }
    }
  ];

  it('handles success in requestStashWorker when stash is loaded', () => {
    const loaded = true;
    const gen = workers.requestStashWorker();

    let result = gen.next();

    expect(result.value).toEqual(select(isLoaded));

    result = gen.next(loaded);

    expect(result.value).toEqual(undefined);
  });

  const loaded = false;

  const user = {
    name: 'mixn',
    id: '1'
  };

  it('handles success in requestStashWorker when no stash exists', () => {
    const stashEndpoint = {
      url: `/user/${user.id}/flavors`,
      method: 'GET'
    };
    const gen = workers.requestStashWorker();

    let result = gen.next();

    expect(result.value).toEqual(select(isLoaded));

    result = gen.next();

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint: stashEndpoint
      })
    );

    result = gen.next({
      success: true,
      response: {
        data: false
      }
    });

    expect(result.value).toEqual(put(actions.requestStashSuccess([])));
  });

  const flavor = {
    id: 3,
    vendorId: 3,
    name: 'Acai',
    slug: null,
    density: null,
    Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' },
    minMillipercent: 1,
    maxMillipercent: 6,
    flavorId: 3
  };

  it('handles success in requestStashWorker', () => {
    const stashEndpoint = {
      url: `/user/${user.id}/flavors`,
      method: 'GET'
    };

    const gen = workers.requestStashWorker();

    let result = gen.next(loaded);

    expect(result.value).toEqual(select(isLoaded));

    result = gen.next();

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint: stashEndpoint
      })
    );

    result = gen.next({
      success: true,
      response: {
        data: [...stash]
      }
    });

    expect(result.value).toEqual(put(actions.requestStashSuccess(stash)));
  });

  it('handles failure in requestStashWorker', () => {
    const error = new TypeError("Cannot read property 'id' of undefined");
    const gen = workers.requestStashWorker();

    let result = gen.next(loaded);

    expect(result.value).toEqual(select(isLoaded));

    result = gen.next();

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next();

    expect(result.value).toEqual(put(actions.requestFailure(error)));
  });

  it('handles success in addStashWorker', () => {
    const stashEndpoint = {
      url: `/user/${user.id}/flavor`,
      method: 'POST'
    };

    const data = {
      userId: user.id,
      flavorId: flavor.id
    };

    const message = {
      title: 'Stash Update',
      message: `Flavor ID ${flavor.id} successfully added!`
    };

    const gen = workers.addStashWorker({ flavor });

    let result = gen.next(user);

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint: stashEndpoint,
        data
      })
    );

    result = gen.next({
      success: true
    });

    expect(result.value).toEqual(put(actions.updateStashSuccess()));

    result = gen.next();

    expect(result.value).toEqual(call(helper.toast, message));
  });

  it('handles failure in addStashWorker', () => {
    const error = new TypeError("Cannot read property 'id' of undefined");
    const gen = workers.addStashWorker(flavor);

    let result = gen.next();

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(
      call(helper.errorToast, "Cannot read property 'id' of undefined")
    );
  });

  it('handles success in removeStashWorker', () => {
    const stashEndpoint = {
      url: `/user/${user.id}/flavor/${flavor.id}`,
      method: 'DELETE'
    };

    const message = {
      title: 'Stash Update',
      message: `Flavor ID ${flavor.id} successfully removed!`
    };

    const gen = workers.removeStashWorker({ flavor });

    let result = gen.next(user);

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint: stashEndpoint
      })
    );

    result = gen.next({
      success: true
    });

    expect(result.value).toEqual(put(actions.updateStashSuccess()));

    result = gen.next();

    expect(result.value).toEqual(call(helper.toast, message));
  });

  it('handles failure in removeStashWorker', () => {
    const error = new TypeError("Cannot read property 'id' of undefined");
    const gen = workers.removeStashWorker(flavor);

    let result = gen.next();

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(
      call(helper.errorToast, "Cannot read property 'id' of undefined")
    );
  });

  it('handles success in updateStashWorker', () => {
    const stashEndpoint = {
      url: `/user/${user.id}/flavor/${flavor.id}`,
      method: 'PUT'
    };

    const message = {
      title: 'Stash Update',
      message: `Flavor ID ${flavor.id} successfully updated!`
    };

    const gen = workers.updateStashWorker({ flavor });

    let result = gen.next(user);

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint: stashEndpoint,
        data: { minMillipercent: 1000, maxMillipercent: 6000 }
      })
    );

    result = gen.next({
      success: true
    });

    expect(result.value).toEqual(put(actions.updateStashSuccess()));

    result = gen.next();

    expect(result.value).toEqual(call(helper.toast, message));
  });

  it('handles failure in updateStashWorker', () => {
    const error = new TypeError("Cannot read property 'flavorId' of undefined");
    const gen = workers.updateStashWorker(flavor);

    let result = gen.next();

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(
      call(helper.errorToast, "Cannot read property 'flavorId' of undefined")
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
