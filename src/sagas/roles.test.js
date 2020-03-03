import { all, put, call, select } from 'redux-saga/effects';
import helper from 'utils/saga';
import request from 'utils/request';
import { actions } from 'reducers/roles';
import saga, { watchers, workers } from './roles';
import { getCachedRoles, getRolesPager } from 'selectors/roles';

describe('roles sagas', () => {
  const roles = { roles: true };

  const pager = {
    count: 25,
    limit: 20,
    page: 1,
    pages: 2
  };

  it('handles success in requestRolesWorker', () => {
    const response = { cached: roles, pager };
    const gen = workers.requestRolesWorker({ pager });

    let result = gen.next();

    expect(result.value).toEqual(select(getCachedRoles));

    result = gen.next(roles);

    expect(result.value).toEqual(select(getRolesPager));

    result = gen.next(pager);

    expect(result.value).toEqual(
      call(helper.pager, {
        cached: roles,
        pager: {
          ...pager,
          store: pager
        },
        route: {
          count: '/roles/count',
          data: '/roles/'
        },
        type: 'Roles'
      })
    );

    result = gen.next(response);

    expect(result.value).toEqual(
      put(actions.requestRolesSuccess(roles, pager))
    );
  });

  const name = 'luser';

  const createEndpoint = {
    url: '/role',
    method: 'POST'
  };

  it('handles success in createRoleWorker', () => {
    const gen = workers.createRoleWorker({ name });

    let result = gen.next(name);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: createEndpoint, data: { name } })
    );

    result = gen.next({
      success: true,
      response: {
        data: name
      }
    });

    expect(result.value).toEqual(
      put(actions.clearCollection()),
      put(actions.requestRoles({ page: 1, limit: 20 })),
      call(helper.toast, {
        title: 'Role Created',
        message: `${name} role successfully created!`
      })
    );
  });

  it('handles request failure in createRoleWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.createRoleWorker({ name });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: createEndpoint, data: { name } })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));
  });

  it('handles unexpected error in createRoleWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.createRoleWorker({ name });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: createEndpoint, data: { name } })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(call(helper.errorToast, message));
  });

  const roleId = 3;

  const updateEndpoint = {
    url: `/role/${roleId}`,
    method: 'PUT'
  };

  it('handles success in updateRoleWorker', () => {
    const gen = workers.updateRoleWorker({ roleId, name });

    let result = gen.next(roleId, name);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: updateEndpoint, data: { name } })
    );

    result = gen.next({
      success: true
    });

    expect(result.value).toEqual(
      put(actions.clearCollection()),
      put(actions.requestRoles({ page: 1, limit: 20 })),
      call(helper.toast, {
        title: 'Delete Role',
        message: `${name} role successfully updated!`
      })
    );
  });

  it('handles request failure in updateRoleWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.updateRoleWorker({ roleId, name });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: updateEndpoint, data: { name } })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));
  });

  it('handles unexpected error in updateRoleWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.updateRoleWorker({ roleId, name });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: updateEndpoint, data: { name } })
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
    url: `/role/${roleId}`,
    method: 'DELETE'
  };

  it('handles success in deleteRoleWorker', () => {
    const gen = workers.deleteRoleWorker({ roleId, name });

    let result = gen.next(roleId, name);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: deleteEndpoint })
    );

    result = gen.next({
      success: true
    });

    expect(result.value).toEqual(
      put(actions.clearCollection()),
      put(actions.requestRoles({ page: 1, limit: 20 })),
      call(helper.toast, {
        title: 'Delete Role',
        message: `${name} role successfully deleted!`
      })
    );
  });

  it('handles request failure in deleteRoleWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.deleteRoleWorker({ roleId, name });

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

  it('handles unexpected error in deleteRoleWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.deleteRoleWorker({ roleId, name });

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

  const roleUsersEndpoint = {
    url: `/users/role/${roleId}`,
    method: 'GET'
  };

  const roleUsers = [true];

  it('handles success in requestRoleUsersWorker', () => {
    const gen = workers.requestRoleUsersWorker({ roleId });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: roleUsersEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: roleUsers
      }
    });

    expect(result.value).toEqual(
      put(actions.requestRoleUsersSuccess(roleUsers))
    );
  });

  it('handles request failure in requestRoleUsersWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.requestRoleUsersWorker({ roleId });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: roleUsersEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));
  });

  it('handles unexpected error in requestRoleUsersWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.requestRoleUsersWorker({ roleId });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: roleUsersEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(call(helper.errorToast, message));
  });

  const userId = 20;

  const createRoleUserEndpoint = {
    url: `/user/${userId}/role`,
    method: 'POST'
  };

  const active = true;

  it('handles success in createRoleUserWorker', () => {
    const gen = workers.createRoleUserWorker({ userId, roleId, active });

    let result = gen.next(userId, roleId, active);

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint: createRoleUserEndpoint,
        data: { userId, roleId, active }
      })
    );

    result = gen.next({
      success: true,
      response: {
        data: { userId, roleId, active }
      }
    });

    expect(result.value).toEqual(
      call(helper.toast, {
        title: 'User Role Added',
        message: `Role ${roleId} assigned to User ${userId}!`
      })
    );
  });

  it('handles request failure in createRoleUserWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.createRoleUserWorker({ userId, roleId, active });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint: createRoleUserEndpoint,
        data: { userId, roleId, active }
      })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));
  });

  it('handles unexpected error in createRoleUserWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.createRoleUserWorker({ userId, roleId, active });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint: createRoleUserEndpoint,
        data: { userId, roleId, active }
      })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(call(helper.errorToast, message));
  });

  const deleteRoleUserEndpoint = {
    url: `/user/${userId}/role/${roleId}`,
    method: 'DELETE'
  };

  it('handles success in deleteRoleUserWorker', () => {
    const gen = workers.deleteRoleUserWorker({ userId, roleId, name });

    let result = gen.next(userId, roleId, name);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: deleteRoleUserEndpoint })
    );

    result = gen.next({
      success: true
    });

    expect(result.value).toEqual(
      call(helper.toast, {
        title: 'Unassign User Role',
        message: `${name} role successfully unassigned!`
      })
    );
  });

  it('handles request failure in deleteRoleUserWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.deleteRoleUserWorker({ userId, roleId, name });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: deleteRoleUserEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestFailure(error)));
  });

  it('handles unexpected error in deleteRoleUserWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.deleteRoleUserWorker({ userId, roleId, name });

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: deleteRoleUserEndpoint })
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
      all(Object.values(watchers).map(watcher => watcher()))
    );
  });
});
