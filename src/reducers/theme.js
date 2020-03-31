import { buildActions } from 'utils';

export const types = buildActions('theme', ['SET_THEME', 'TOGGLE_DARK_MODE']);

const setTheme = theme => ({
  type: types.SET_THEME,
  theme
});

const toggleDarkMode = () => ({
  type: types.TOGGLE_DARK_MODE
});

export const actions = {
  setTheme,
  toggleDarkMode
};

export const initialState = {
  name: 'default'
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_THEME:
      return {
        ...state,
        name: action.theme
      };
    case types.TOGGLE_DARK_MODE:
      if (state.name === 'default') {
        return {
          ...state,
          name: 'dark'
        };
      } else {
        return {
          ...state,
          name: 'default'
        };
      }
    default:
      return state;
  }
};
