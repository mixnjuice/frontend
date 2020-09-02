import { createSelector } from 'reselect';

export const getVendorState = (state) => state.vendor;

export const getVendor = createSelector(
  getVendorState,
  (vendor) => vendor.collection
);
