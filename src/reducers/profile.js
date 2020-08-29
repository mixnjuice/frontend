import { buildActions } from 'utils';

export const types = buildActions('profile', [
  'REQUEST_PROFILE',
  'REQUEST_PROFILE_SUCCESS',
  'REQUEST_PROFILE_FAILURE',
  'REQUEST_CURRENT_USER_PROFILE',
  'UPDATE_PROFILE',
  'UPDATE_PROFILE_SUCCESS',
  'UPDATE_PROFILE_FAILURE',
  'MAP_USER_NAMES_TO_USER_IDS'
]);

const requestProfile = (user) => ({
  type: types.REQUEST_PROFILE,
  user
});

const requestProfileSuccess = (profile) => ({
  type: types.REQUEST_PROFILE_SUCCESS,
  profile
});

const requestProfileFailure = (error) => ({
  type: types.REQUEST_PROFILE_FAILURE,
  error
});

const requestCurrentUserProfile = () => ({
  type: types.REQUEST_CURRENT_USER_PROFILE
});

const updateProfile = (profile) => ({
  type: types.UPDATE_PROFILE,
  profile
});

const updateProfileSuccess = (profile) => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  profile
});

const updateProfileFailure = (error) => ({
  type: types.UPDATE_PROFILE_FAILURE,
  error
});

const mapUserNamesToUserIds = (userNames) => ({
  type: types.MAP_USER_NAMES_TO_USER_IDS,
  userNames
});

export const actions = {
  mapUserNamesToUserIds,
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
  userNames: []
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.profile
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
    case types.MAP_USER_NAMES_TO_USER_IDS:
      return {
        ...state,
        userNames: action.userNames
      };
    default:
      return state;
  }
};
