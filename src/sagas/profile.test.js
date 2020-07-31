import { all, put, call, select, take } from 'redux-saga/effects';
import MD5 from 'md5.js';
import request from 'utils/request';
import { actions as appActions, types as appTypes } from 'reducers/application';
import { actions } from 'reducers/profile';
import { actions as toastActions } from 'reducers/toast';
import saga, { getCurrentUser, watchers, workers } from './profile';
import { getUserNames, getUserProfiles } from 'selectors/profile';
import { getUser } from 'selectors/application';

describe('Profile sagas', () => {
  const currentUser = {
    currentUser: true,
    id: 3,
    email: 'd@d.com'
  };

  const user = {
    name: 'mixn',
    currentUser: true
  };

  it('handles success in getCurrentUser', () => {
    const gen = getCurrentUser();

    let result = gen.next();

    expect(result.value).toEqual(select(getUser));

    result = gen.next();

    expect(result.value).toEqual(put(appActions.requestCurrentUser()));

    result = gen.next(
      take([
        appTypes.REQUEST_CURRENT_USER_SUCCESS,
        appTypes.REQUEST_CURRENT_USER_FAILURE
      ])
    );

    expect(result.value).toEqual(
      take([
        appTypes.REQUEST_CURRENT_USER_SUCCESS,
        appTypes.REQUEST_CURRENT_USER_FAILURE
      ])
    );
  });

  const data = {
    userId: 3,
    name: 'mixn',
    bio: 'testing',
    location: 'testing, pl',
    url: 'test.com',
    User: { emailAddress: 'd@d.com' }
  };

  const profile = {
    name: 'mixn',
    bio: 'testing',
    location: 'testing, pl',
    url: 'test.com',
    gravatar: new MD5().update('d@d.com').digest('hex')
  };

  const usernameEndpoint = {
    url: `/user/name/mixn`,
    method: 'GET'
  };

  const profiles = [];

  profiles[3] = data;

  const map = [
    { user1: { userId: 1 } },
    { user2: { userId: 2 } },
    { mixn: { userId: 3 } }
  ];

  it('handles success in requestProfileWorker', () => {
    const gen = workers.requestProfileWorker({ user });

    let result = gen.next(user);

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(select(getUserProfiles));

    result = gen.next(map);

    expect(result.value).toEqual(select(getUserNames));

    result = gen.next(map);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: usernameEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data
      }
    });

    expect(result.value).toEqual(
      put(
        actions.requestProfileSuccess({
          collection: profile,
          cache: map,
          currentUser: true
        })
      )
    );

    result = gen.next(map);

    expect(result.value).toEqual(put(actions.mapUserNamesToUserIds(map)));

    result = gen.next(profiles);

    expect(result.value).toEqual(select(getUserProfiles));

    result = gen.next(map);

    expect(result.value).toEqual(
      put(
        actions.requestProfileSuccess({
          collection: profile,
          cache: map,
          currentUser: true
        })
      )
    );
  });

  it('handles failure in requestProfileWorker', () => {
    const error = new TypeError("Cannot read property 'mixn' of undefined");
    const { message } = error;
    const gen = workers.requestProfileWorker({ user });

    let result = gen.next(user);

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(select(getUserProfiles));

    result = gen.next(map);

    expect(result.value).toEqual(select(getUserNames));

    result = gen.next();

    expect(result.value).toEqual(put(actions.requestProfileFailure(error)));

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

  it('handles success in requestCurrentUserProfileWorker', () => {
    const gen = workers.requestCurrentUserProfileWorker();

    let result = gen.next(currentUser);

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next({ user: { id: 3, emailAddress: 'd@d.com' } });

    expect(result.value).toEqual(
      put(actions.requestProfile({ currentUser: true }))
    );
  });

  it('handles failure in requestCurrentUserProfileWorker', () => {
    const gen = workers.requestCurrentUserProfileWorker();
    const message = "Cannot read property 'id' of undefined";

    let result = gen.next();

    result = gen.next();

    result = gen.next(new Error(message));

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

  const updateEndpoint = {
    url: `/user/3/profile`,
    method: 'PUT'
  };

  const refresh = [undefined, undefined, undefined, false];

  it('handles success in updateProfileWorker', () => {
    const gen = workers.updateProfileWorker({ user });

    let result = gen.next(currentUser);

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(currentUser);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: updateEndpoint, data: {} })
    );

    result = gen.next({
      success: true,
      data: {}
    });

    expect(result.value).toEqual(put(actions.updateProfileSuccess(refresh)));

    result = gen.next();

    expect(result.value).toEqual(put(actions.requestCurrentUserProfile()));

    result = gen.next();

    expect(result.value).toEqual(
      put(
        toastActions.popToast({
          title: 'Profile',
          icon: 'times-circle',
          message: 'User profile updated!'
        })
      )
    );
  });

  it('handles failure in updateProfileWorker', () => {
    const gen = workers.updateProfileWorker({ user });

    let result = gen.next(currentUser);

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(currentUser);

    expect(result.value).toEqual(
      call(request.execute, { endpoint: updateEndpoint, data: {} })
    );

    result = gen.next({
      success: false,
      data: {}
    });

    expect(result.value).toEqual(
      put(
        actions.updateProfileFailure(
          new Error('Failed to update user profile!')
        )
      )
    );

    result = gen.next();

    expect(result.value).toEqual(
      put(
        toastActions.popToast({
          title: 'Error',
          icon: 'times-circle',
          message: 'Failed to update user profile!'
        })
      )
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
