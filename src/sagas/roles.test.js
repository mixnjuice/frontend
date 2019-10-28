import { all, put, call } from 'redux-saga/effects';

import request from 'utils/request';
import { actions } from 'reducers/roles';
import { actions as toastActions } from 'reducers/toast';
import saga, { watchers, workers } from './roles';

/* eslint-disable camelcase */
describe('roles sagas', () => {
  const roles = { roles: true };
  const rolesEndpoint = {
    url: '/roles',
    method: 'GET'
  };
  /*
  const createRoleEndpoint = {
    url: '/role',
    method: 'POST'
  };
  */

  it('handles success in requestRolesWorker', () => {
    const gen = workers.requestRolesWorker({ page: 1, limit: 20 });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: rolesEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: roles
      }
    });

    expect(result.value).toEqual(put(actions.requestRolesSuccess(roles)));
  });

  it('handles request failure in requestRolesWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.requestRolesWorker({ page: 1, limit: 20 });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: rolesEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestRolesFailure(error)));
  });

  it('handles unexpected error in requestRolesWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.requestRolesWorker({ page: 1, limit: 20 });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: rolesEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestRolesFailure(error)));

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
