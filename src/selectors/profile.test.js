import {
  getProfile,
  getCurrentUser,
  getUserProfile,
  getUserProfiles,
  getUserNames
} from './profile';
import { initialState } from 'reducers/profile';

describe('profile selectors', () => {
  const state = { profile: initialState };
  const { cache, collection, currentUser, userNames } = initialState;

  it('can getProfile', () => {
    expect(getProfile(state)).toBe(state.profile);
  });

  it('can getCurrentUser', () => {
    expect(getCurrentUser(state)).toBe(currentUser);
  });

  it('can getUserProfiles', () => {
    expect(getUserProfiles(state)).toBe(cache);
  });

  it('can getUserProfile', () => {
    expect(getUserProfile(state)).toBe(collection);
  });

  it('can getUserNames', () => {
    expect(getUserNames(state)).toBe(userNames);
  });
});
