import { getProfile, getUserProfile, getUserProfiles } from './profile';
import { initialState } from 'reducers/profile';

describe('profile selectors', () => {
  const state = { profile: initialState };
  const { cache, collection } = initialState;

  it('can getProfile', () => {
    expect(getProfile(state)).toBe(state.profile);
  });

  it('can getUserProfiles', () => {
    expect(getUserProfiles(state)).toBe(cache);
  });

  it('can getUserProfile', () => {
    expect(getUserProfile(state)).toBe(collection);
  });
});
