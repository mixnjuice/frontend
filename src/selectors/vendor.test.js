import { initialState } from 'reducers/vendor';
import { getVendorState, getVendor } from './vendor';

describe('vendor selectors', () => {
  const state = { vendor: initialState };

  it('can getVendorState', () => {
    expect(getVendorState(state)).toBe(state.vendor);
  });

  it('can getVendor', () => {
    expect(getVendor(state)).toBe(initialState.collection);
  });
});
