import { reducer, types, actions } from './theme';

describe('theme reducer', () => {
  const name = 'dracula';

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
});
