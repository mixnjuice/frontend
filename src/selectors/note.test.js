import { initialState } from 'reducers/note';
import { getNote, isLoading, getError, getFlavorNote } from './note';

describe('note selectors', () => {
  const state = { note: initialState };

  it('can getNote', () => {
    expect(getNote(state)).toBe(state.note);
  });

  it('can get isLoading', () => {
    expect(isLoading(state)).toBe(initialState.loading);
  });

  it('can getError', () => {
    expect(getError(state)).toBe(initialState.error);
  });

  it('can getFlavorNote', () => {
    expect(getFlavorNote(state)).toBe(initialState.collection);
  });
});
