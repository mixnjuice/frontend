import dayjs from 'dayjs';

import { initialState } from 'reducers/application';
import {
  getApplication,
  isLoggingIn,
  isLoggingOut,
  getUser,
  getError,
  getToken,
  getTokenExpiration,
  getRegistration,
  isRegistering,
  isLoggedIn
} from './application';

describe('application selectors', () => {
  const state = { application: initialState };
  const { authorization: authState, registration: regState } = initialState;

  it('can getApplication', () => {
    expect(getApplication(state)).toBe(state.application);
  });

  it('can get isLoggingIn', () => {
    expect(isLoggingIn(state)).toBe(initialState.loggingIn);
  });

  it('can get isLoggingOut', () => {
    expect(isLoggingOut(state)).toBe(initialState.loggingOut);
  });

  it('can getUser', () => {
    expect(getUser(state)).toBe(initialState.user);
  });

  it('can getError', () => {
    expect(getError(state)).toBe(initialState.error);
  });

  it('can getToken', () => {
    expect(getToken(state)).toBe(authState.accessToken);
  });

  it('can getTokenExpiration', () => {
    expect(getTokenExpiration(state)).toBe(authState.expiration);
  });

  it('can getRegistration', () => {
    expect(getRegistration(state)).toBe(regState);
  });

  it('can get isRegistering', () => {
    expect(isRegistering(state)).toBe(regState.registering);
  });

  describe('can get isLoggedIn', () => {
    it('when logged in', () => {
      const authorization = {
        accessToken: 'valid',
        expiration: dayjs().add(1, 'days')
      };

      expect(
        isLoggedIn({
          application: {
            authorization
          }
        })
      ).toEqual(true);
    });

    it('with no token', () => {
      const authorization = {
        expiration: dayjs().add(1, 'days')
      };

      expect(
        isLoggedIn({
          application: {
            authorization
          }
        })
      ).toEqual(false);
    });

    it('with an expired token', () => {
      const authorization = {
        accessToken: 'valid',
        expiration: dayjs().add(-1, 'days')
      };

      expect(
        isLoggedIn({
          application: {
            authorization
          }
        })
      ).toEqual(false);
    });
  });
});
