import { createSelector } from 'reselect';

export const getApplication = state => state.application;

export const isLoggingIn = createSelector(
  getApplication,
  application => application.loggingIn
);

export const isLoggingOut = createSelector(
  getApplication,
  application => application.loggingOut
);

export const getUser = createSelector(
  getApplication,
  application => application.user
);

export const getError = createSelector(
  getApplication,
  application => application.error
);

export const getAuthorization = createSelector(
  getApplication,
  application => application.authorization
);

export const getToken = createSelector(
  getAuthorization,
  authorization => authorization.accessToken
);

export const getTokenExpiration = createSelector(
  getAuthorization,
  authorization => authorization.expiration
);
