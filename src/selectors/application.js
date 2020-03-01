import dayjs from 'dayjs';
import { createSelector } from 'reselect';

export const getApplication = state => state.application;

export const isLoggingIn = createSelector(getApplication, application =>
  Boolean(application.loggingIn)
);

export const isLoggingOut = createSelector(getApplication, application =>
  Boolean(application.loggingOut)
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

export const isLoggedIn = createSelector(
  [getToken, getTokenExpiration],
  (token, expiration) => Boolean(token && dayjs().isBefore(dayjs(expiration)))
);

export const getRegistration = createSelector(
  getApplication,
  application => application.registration
);

export const isRegistering = createSelector(
  getRegistration,
  registration => registration.registering && !registration.complete
);
