import { createSelector } from 'reselect';

export const getNote = (state) => state.note;

export const isLoading = createSelector(getNote, (note) => note.loading);

export const getError = createSelector(getNote, (note) => note.error);

export const getFlavorNote = createSelector(getNote, (note) => note.collection);
