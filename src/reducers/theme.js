import { buildActions } from 'utils';

export const types = buildActions('theme', ['TOGGLE_DARK_MODE']);

const toggleDarkMode = () => ({
  type: types.TOGGLE_DARK_MODE
});

export const actions = {
  toggleDarkMode
};

export const initialState = {
  name: 'default'
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
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
