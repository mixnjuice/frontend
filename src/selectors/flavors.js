import { createSelector } from 'reselect';

export const getFlavors = state => state.flavors;

export const getAllFlavors = createSelector(
  getFlavors,
  flavors => flavors.collection
);

export const getCachedFlavors = createSelector(
  getFlavors,
  flavors => flavors.cache
);

export const getFlavorsPager = createSelector(
  getFlavors,
  flavors => flavors.pager
);
