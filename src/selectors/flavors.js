import { createSelector } from 'reselect';

export const getFlavors = (state) => state.flavors;

export const getCollection = createSelector(
  getFlavors,
  (flavors) => flavors.collection
);

export const getFilter = createSelector(
  getFlavors,
  (flavors) => flavors.filter
);

export const isLoaded = createSelector(getFlavors, (flavors) => flavors.loaded);

export const isLoading = createSelector(
  getFlavors,
  (flavors) => flavors.loading
);
