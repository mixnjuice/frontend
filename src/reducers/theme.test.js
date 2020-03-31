import { reducer, types, actions } from './theme';

describe('theme reducer', () => {
  const name = 'default';

  it('has TOGGLE_DARK_MODE action', () => {
    expect(actions.toggleDarkMode()).toEqual({
      type: types.TOGGLE_DARK_MODE
    });
  });

  it('reduces TOGGLE_DARK_MODE action', () => {
    const action = actions.toggleDarkMode();

    expect(reducer({}, action)).toEqual({ name });
  });
});
