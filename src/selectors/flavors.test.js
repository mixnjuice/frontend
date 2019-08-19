import { initialState } from 'reducers/flavors';
import { getFlavors, getAllFlavors } from './flavors';

describe('flavors selectors', () => {
  const state = { flavors: initialState };

  it('can getFlavors', () => {
    expect(getFlavors(state)).toBe(state.flavors);
  });

  it('can getAllFlavors', () => {
    expect(getAllFlavors(state)).toBe(initialState.flavors);
  });
});
