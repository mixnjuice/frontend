import { createSelector } from 'reselect';

export const getFlavors = state => state.flavors;

export const getAllFlavors = createSelector(
  getFlavors,
  flavors => flavors.flavors
);
