import { initialState } from 'reducers/vendors';
import {
  getCachedVendors,
  getVendorsPager,
  getVendors,
  getAllVendors
} from './vendors';

describe('vendors selectors', () => {
  const state = { vendors: initialState };

  it('can getVendors', () => {
    expect(getVendors(state)).toBe(state.vendors);
  });

  it('can getAllVendors', () => {
    expect(getAllVendors(state)).toBe(initialState.collection);
  });

  it('can getCachedVendors', () => {
    expect(getCachedVendors(state)).toBe(initialState.cache);
  });

  it('can getVendorsPager', () => {
    expect(getVendorsPager(state)).toBe(initialState.pager);
  });
});
