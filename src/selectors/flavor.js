import { createSelector } from 'reselect';

export const getFlavor = state => state.flavor;

export const isLoaded = createSelector(getFlavor, flavor =>
  Boolean(flavor.loaded)
);

export const getError = createSelector(getFlavor, flavor => flavor.error);

export const getStash = createSelector(getFlavor, flavor => flavor.stash);
