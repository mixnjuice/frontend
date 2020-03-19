import { buildActions } from 'utils';

export const types = buildActions('theme', ['SET_THEME']);

const setTheme = theme => ({
  type: types.SET_THEME,
  theme
});

export const actions = {
  setTheme
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
    default:
      return state;
  }
};
