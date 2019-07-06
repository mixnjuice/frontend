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
  const state = initialState;
  const { authorization: authState } = initialState;

  it('can getApplication', () => {
    expect(getApplication(state)).toBe(state.application);
  });

  it('can get isLoggingIn', () => {
    expect(isLoggingIn(state)).toBe(state.isLoggingIn);
  });

  it('can get isLoggingOut', () => {
    expect(isLoggingOut(state)).toBe(state.isLoggingOut);
  });

  it('can getUser', () => {
    expect(getUser(state)).toBe(state.user);
  });

  it('can getError', () => {
    expect(getError(state)).toBe(state.error);
  });

  it('can getToken', () => {
    expect(getToken(state)).toBe(authState.accessToken);
  });

  it('can getTokenExpiration', () => {
    expect(getTokenExpiration(state)).toBe(authState.expiration);
  });
});
