import { buildActions } from 'utils';

export const types = buildActions('recipe', [
  'REQUEST_RECIPES',
  'REQUEST_RECIPES_SUCCESS',
  'REQUEST_RECIPES_FAILURE'
]);

const requestRecipes = id => ({
  type: types.REQUEST_RECIPES,
  id
});

const requestRecipesSuccess = recipes => ({
  type: types.REQUEST_RECIPES_SUCCESS,
  recipes
});

const requestRecipesFailure = error => ({
  type: types.REQUEST_RECIPES_FAILURE,
  error
});

export const actions = {
  requestRecipes,
  requestRecipesSuccess,
  requestRecipesFailure
};

export const initialState = {
  list: [],
  error: null
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_RECIPES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.REQUEST_RECIPES_SUCCESS:
      return {
        ...state,
        list: action.recipes
      };
    default:
      return state;
  }
};
