import { initialState } from 'reducers/flavor';
import { getFlavor, isLoaded, getError, getStash } from './flavor';

describe('flavor selectors', () => {
  const state = { flavor: initialState };

  it('can getFlavor', () => {
    expect(getFlavor(state)).toBe(state.flavor);
  });

  it('can get isLoaded', () => {
    expect(isLoaded(state)).toBe(initialState.loaded);
  });

  it('can getError', () => {
    expect(getError(state)).toBe(initialState.error);
  });

  it('can getStash', () => {
    expect(getStash(state)).toBe(initialState.stash);
  });
});
