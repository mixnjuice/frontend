import { buildActions } from 'utils';

export const types = buildActions('profile', [
  'REQUEST_PROFILE',
  'REQUEST_PROFILE_SUCCESS',
  'REQUEST_PROFILE_FAILURE',
  'REQUEST_CURRENT_USER_PROFILE',
  'UPDATE_PROFILE',
  'UPDATE_PROFILE_SUCCESS',
  'UPDATE_PROFILE_FAILURE',
  'USER_MAP'
]);

const requestProfile = user => ({
  type: types.REQUEST_PROFILE,
  user
});

const requestProfileSuccess = profile => ({
  type: types.REQUEST_PROFILE_SUCCESS,
  profile
});

const requestProfileFailure = error => ({
  type: types.REQUEST_PROFILE_FAILURE,
  error
});

const requestCurrentUserProfile = () => ({
  type: types.REQUEST_CURRENT_USER_PROFILE
});

const updateProfile = profile => ({
  type: types.UPDATE_PROFILE,
  profile
});

const updateProfileSuccess = profile => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  profile
});

const updateProfileFailure = error => ({
  type: types.UPDATE_PROFILE_FAILURE,
  error
});

const mapUser = users => ({
  type: types.USER_MAP,
  users
});

export const actions = {
  mapUser,
  requestProfile,
  requestProfileSuccess,
  requestProfileFailure,
  requestCurrentUserProfile,
  updateProfile,
  updateProfileSuccess,
  updateProfileFailure
};

export const initialState = {
  cache: [],
  collection: [],
  currentUser: null,
  userId: null,
  userNames: []
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_PROFILE_SUCCESS:
      return {
        ...state,
        cache: action.profile.cache,
        collection: action.profile.request,
        currentUser: action.profile.currentUser
      };
    case types.REQUEST_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        cache: {
          ...state.cache,
          ...action.profile
        },
        collection: {
          ...state.collection,
          ...action.profile
        }
      };
    case types.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.USER_MAP:
      return {
        ...state,
        userNames: action.users
      };
    default:
      return state;
  }
};
