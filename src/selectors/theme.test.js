import { getThemeName } from './theme';
import { initialState } from 'reducers/theme';

describe('theme selector', () => {
  const state = { theme: initialState };

  it('can getThemeName', () => {
    expect(getThemeName(state)).toBe(initialState.name);
  });
});
