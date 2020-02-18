import { all, put, call, select } from 'redux-saga/effects';

import request from 'utils/request';
import { actions } from 'reducers/users';
import { actions as toastActions } from 'reducers/toast';
import saga, { watchers, workers } from './users';
import { getCachedUsers, getUsersPager } from 'selectors/users';

describe('users sagas', () => {
  const users = { users: true };

  const usersEndpoint = {
    url: '/users/accounts/?limit=20&offset=1',
    method: 'GET'
  };
  const countEndpoint = {
    url: '/users/count',
    method: 'GET'
  };
  /*
  const createUserEndpoint = {
    url: '/user',
    method: 'POST'
  };
  */

  const count = { result: 25 };

  const pager = {
    count: 25,
    limit: 20,
    page: 1,
    pages: 2
  };

  it('handles success in requestUsersWorker', () => {
    const gen = workers.requestUsersWorker({ pager });

    let result = gen.next(pager);

    expect(result.value).toEqual(select(getUsersPager));

    result = gen.next(count);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: countEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: 25
      }
    });

    expect(result.value).toEqual(select(getCachedUsers));

    result = gen.next(users);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: usersEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: users
      }
    });

    expect(result.value).toEqual(
      put(actions.requestUsersSuccess(users, pager))
    );
  });

  it('handles request failure in requestUsersWorker', () => {
    const error = new Error('Failed to count users!');
    const gen = workers.requestUsersWorker({ pager });

    let result = gen.next(pager);

    expect(result.value).toEqual(select(getUsersPager));

    result = gen.next(count);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: countEndpoint })
    );

    result = gen.next({
      success: false,
      response: {
        data: 25
      }
    });

    expect(result.value).toEqual(put(actions.requestUsersFailure(error)));
  });

  it('handles unexpected error in requestUsersWorker', () => {
    const error = new Error('Failed to count users!');
    const { message } = error;
    const gen = workers.requestUsersWorker({ pager });

    let result = gen.next(pager);

    expect(result.value).toEqual(select(getUsersPager));

    result = gen.next(count);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: countEndpoint })
    );

    result = gen.next({
      success: false,
      response: {
        data: 25
      }
    });

    expect(result.value).toEqual(put(actions.requestUsersFailure(error)));

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

  const userId = 1;

  const user = true;

  const userEndpoint = {
    url: '/user/1',
    method: 'GET'
  };

  it('handles success in requestUserWorker', () => {
    const gen = workers.requestUserWorker({ userId });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: userEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: user
      }
    });

    expect(result.value).toEqual(put(actions.requestUserSuccess(user)));
  });

  it('handles request failure in requestUserWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.requestUserWorker({ userId });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: userEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestUserFailure(error)));
  });

  it('handles unexpected error in requestUserWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.requestUserWorker({ userId });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: userEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestUserFailure(error)));

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

  const roles = [true];

  const userRolesEndpoint = {
    url: `/user/${userId}/roles`,
    method: 'GET'
  };

  it('handles success in requestUserRolesWorker', () => {
    const gen = workers.requestUserRolesWorker({ userId });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: userRolesEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: roles
      }
    });

    expect(result.value).toEqual(put(actions.requestUserRolesSuccess(roles)));
  });

  it('handles request failure in requestUserRolesWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.requestUserRolesWorker({ userId });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: userRolesEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestUserRolesFailure(error)));
  });

  it('handles unexpected error in requestUserRolesWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.requestUserRolesWorker({ userId });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: userRolesEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestUserRolesFailure(error)));

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
