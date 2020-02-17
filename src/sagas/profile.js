import MD5 from 'md5.js';
import { all, call, put, take, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { actions, types } from 'reducers/profile';
import { actions as toastActions } from 'reducers/toast';
import { actions as appActions, types as appTypes } from 'reducers/application';
import { getUserNames, getUserProfiles } from 'selectors/profile';
import { getUser } from 'selectors/application';

export function* getCurrentUser() {
  let user = yield select(getUser);

  if (!user) {
    yield put(appActions.requestCurrentUser());
    const currentUserResult = yield take([
      appTypes.REQUEST_CURRENT_USER_SUCCESS,
      appTypes.REQUEST_CURRENT_USER_FAILURE
    ]);

    if (currentUserResult.type === appTypes.REQUEST_CURRENT_USER_FAILURE) {
      throw new Error('Failed to fetch current user!');
    }

    user = currentUserResult.user;

    if (!user) {
      throw new Error('Received invalid response to current user request!');
    }
  }
  return user;
}

function* requestProfileWorker({ user }) {
  try {
    const currentUser = yield call(getCurrentUser);

    if (user.name && !user.id) {
      const profile = yield select(getUserProfiles);
      const userNames = yield select(getUserNames);

      if (!userNames[user.name]) {
        const endpoint = {
          url: `/user/${user.name}`,
          method: 'GET'
        };
        const result = yield call(request.execute, { endpoint });

        // update profile in state or throw an error
        if (result.success) {
          const {
            response: { data }
          } = result;

          const {
            name,
            bio,
            location,
            User: { emailAddress },
            url
          } = data;

          profile[data.userId] = {
            name,
            bio,
            location,
            gravatar: new MD5().update(emailAddress).digest('hex'),
            url
          };
          userNames[user.name] = {
            userId: data.userId
          };
          user = {
            ...user,
            id: data.userId
          };
          yield put(
            actions.requestProfileSuccess({
              collection: profile[data.userId],
              cache: profile,
              currentUser:
                user.currentUser || currentUser.id === data.userId
                  ? true
                  : false
            })
          );
          yield put(actions.mapUserNamesToUserIds(userNames));
        } else if (result.error) {
          throw result.error;
        } else {
          throw new Error('Failed to get user profile by username!');
        }
      } else {
        user = {
          ...user,
          id: userNames[user.name].userId
        };
      }
    }

    const profile = yield select(getUserProfiles);

    if (!profile[user.id]) {
      const endpoint = {
        url: `/user/${user.id}/profile`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      // update profile in state or throw an error
      if (result.success) {
        const {
          response: { data }
        } = result;

        data.gravatar = new MD5().update(user.email).digest('hex');
        profile[user.id] = data;

        yield put(
          actions.requestProfileSuccess({
            collection: data,
            cache: profile,
            currentUser:
              user.currentUser || currentUser.id === user.id ? true : false
          })
        );
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get user profile!');
      }
    } else {
      yield put(
        actions.requestProfileSuccess({
          collection: profile[user.id],
          cache: profile,
          currentUser:
            user.currentUser || currentUser.id === user.id ? true : false
        })
      );
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestProfileFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestCurrentUserProfileWorker() {
  try {
    const user = yield call(getCurrentUser);

    yield put(
      actions.requestProfile({
        id: user.id,
        currentUser: true,
        email: user.emailAddress
      })
    );
  } catch (error) {
    const { message } = error;

    yield put(actions.requestProfileFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* updateProfileWorker({ profile }) {
  try {
    const { id } = yield call(getCurrentUser);

    const refresh = [];

    refresh[id] = false;
    const endpoint = {
      url: `/user/${id}/profile`,
      method: 'PUT'
    };

    const data = {
      ...profile
    };
    const result = yield call(request.execute, { endpoint, data });

    if (result.success) {
      yield put(actions.updateProfileSuccess(refresh));
      yield put(actions.requestCurrentUserProfile());
      yield put(
        toastActions.popToast({
          title: 'Profile',
          icon: 'times-circle',
          message: 'User profile updated!'
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to update user profile!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.updateProfileFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestProfileWatcher() {
  yield takeLatest(types.REQUEST_PROFILE, requestProfileWorker);
}

function* requestCurrentUserProfileWatcher() {
  yield takeLatest(
    types.REQUEST_CURRENT_USER_PROFILE,
    requestCurrentUserProfileWorker
  );
}

function* updateProfileWatcher() {
  yield takeLatest(types.UPDATE_PROFILE, updateProfileWorker);
}

export const workers = {
  requestProfileWorker,
  requestCurrentUserProfileWorker,
  updateProfileWorker
};

export const watchers = {
  requestProfileWatcher,
  requestCurrentUserProfileWatcher,
  updateProfileWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
