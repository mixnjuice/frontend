import { reducer, types, actions } from './theme';

describe('theme reducer', () => {
  const name = 'default';

  it('has SET_THEME action', () => {
    expect(actions.setTheme(name)).toEqual({
      type: types.SET_THEME,
      theme: name
    });
  });

  it('reduces SET_THEME action', () => {
    const action = actions.setTheme(name);

    expect(reducer({}, action)).toEqual({
      name
    });
  });

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
