import { getToasts, getQueue } from './toast';
import { initialState } from 'reducers/toast';

describe('toast selectors', () => {
  const state = { toast: initialState };
  const { queue } = initialState;

  it('can getToasts', () => {
    expect(getToasts(state)).toBe(initialState);
  });

  it('can getQueue', () => {
    expect(getQueue(state)).toBe(queue);
  });
});
