import { initialState } from 'reducers/flavors';
import {
  getFlavors,
  getCollection,
  getFilter,
  isLoaded,
  isLoading
} from './flavors';

describe('flavors selectors', () => {
  const state = { flavors: initialState };

  it('can getFlavors', () => {
    expect(getFlavors(state)).toBe(state.flavors);
  });

  it('can getCollectio n', () => {
    expect(getCollection(state)).toBe(initialState.collection);
  });

  it('can getFilter', () => {
    expect(getFilter(state)).toBe(initialState.filter);
  });

  it('can isLoaded', () => {
    expect(isLoaded(state)).toBe(initialState.loaded);
  });

  it('can isLoading', () => {
    expect(isLoading(state)).toBe(initialState.loading);
  });
});
