import { createSelector } from 'reselect';

export const getNotes = state => state.notes;

export const isLoaded = createSelector(getNotes, notes =>
  Boolean(notes.loaded)
);

export const getError = createSelector(getNotes, notes => notes.error);

export const getFlavorNotes = createSelector(
  getNotes,
  notes => notes.collection
);
