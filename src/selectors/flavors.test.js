import { initialState } from 'reducers/flavors';
import {
  getFlavors,
  getAllFlavors,
  getCachedFlavors,
  getFlavorsPager
} from './flavors';

describe('flavors selectors', () => {
  const state = { flavors: initialState };

  it('can getFlavors', () => {
    expect(getFlavors(state)).toBe(state.flavors);
  });

  it('can getAllFlavors', () => {
    expect(getAllFlavors(state)).toBe(initialState.collection);
  });

  it('can getCachedFlavors', () => {
    expect(getCachedFlavors(state)).toBe(initialState.cache);
  });

  it('can getFlavorsPager', () => {
    expect(getFlavorsPager(state)).toBe(initialState.pager);
  });
});
