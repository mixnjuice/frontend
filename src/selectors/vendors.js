import { createSelector } from 'reselect';

export const getVendors = (state) => state.vendors;

export const getAllVendors = createSelector(
  getVendors,
  (vendors) => vendors.collection
);

export const getCachedVendors = createSelector(
  getVendors,
  (vendors) => vendors.cache
);

export const getVendorsPager = createSelector(
  getVendors,
  (vendors) => vendors.pager
);
