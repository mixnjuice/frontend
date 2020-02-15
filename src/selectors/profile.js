import { createSelector } from 'reselect';

export const getProfile = state => state.profile;

export const getCurrentUser = createSelector(
  getProfile,
  profile => profile.currentUser
);

export const getUserProfiles = createSelector(
  getProfile,
  profile => profile.cache
);

export const getUserProfile = createSelector(
  getProfile,
  profile => profile.collection
);

export const getUserMap = createSelector(
  getProfile,
  profile => profile.userNames
);
