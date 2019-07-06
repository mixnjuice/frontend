import { initialState } from 'reducers/application';
import {
  getApplication,
  isLoggingIn,
  isLoggingOut,
  getUser,
  getError,
  getToken,
  getTokenExpiration
} from './application';

describe('application selectors', () => {
  const state = { application: initialState };
  const { authorization: authState } = initialState;

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
});
