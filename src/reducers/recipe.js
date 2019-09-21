import { buildActions } from 'utils';

export const types = buildActions('recipe', [
  'CREATE_RECIPE',
  'CREATE_RECIPE_SUCCESS',
  'CREATE_RECIPE_FAILURE',
  'EDIT_RECIPE',
  'EDIT_RECIPE_SUCCESS',
  'EDIT_RECIPE_FAILURE',
  'REVERT_RECIPE',
  'REVERT_RECIPE_SUCCESS',
  'REVERT_RECIPE_FAILURE',
  'REQUEST_RECIPE',
  'REQUEST_RECIPE_SUCCESS',
  'REQUEST_RECIPE_FAILURE',
  'UPDATE_RECIPE',
  'UPDATE_RECIPE_SUCCESS',
  'UPDATE_RECIPE_FAILURE'
]);

const createRecipe = () => ({
  type: types.CREATE_RECIPE
});

const createRecipeSuccess = () => ({
  type: types.CREATE_RECIPE_SUCCESS
});

const createRecipeFailure = () => ({
  type: types.CREATE_RECIPE_FAILURE
});

const editRecipe = () => ({
  type: types.EDIT_RECIPE
});

const editRecipeSuccess = () => ({
  type: types.EDIT_RECIPE_SUCCESS
});

const editRecipeFailure = error => ({
  type: types.EDIT_RECIPE_FAILURE,
  error
});

const revertRecipe = () => ({
  type: types.REVERT_RECIPE
});

const revertRecipeSuccess = () => ({
  type: types.REVERT_RECIPE_SUCCESS
});

const revertRecipeFailure = error => ({
  type: types.REVERT_RECIPE_FAILURE,
  error
});

const requestRecipe = id => ({
  type: types.REQUEST_RECIPE,
  id
});

const requestRecipeSuccess = recipe => ({
  type: types.REQUEST_RECIPE_SUCCESS,
  recipe
});

const requestRecipeFailure = error => ({
  type: types.REQUEST_RECIPE_FAILURE,
  error
});

const updateRecipe = id => ({
  type: types.UPDATE_RECIPE,
  id
});

const updateRecipeSuccess = recipe => ({
  type: types.UPDATE_RECIPE_SUCCESS,
  recipe
});

const updateRecipeFailure = error => ({
  type: types.UPDATE_RECIPE_FAILURE,
  error
});

export const actions = {
  createRecipe,
  createRecipeSuccess,
  createRecipeFailure,
  editRecipe,
  editRecipeSuccess,
  editRecipeFailure,
  revertRecipe,
  revertRecipeSuccess,
  revertRecipeFailure,
  requestRecipe,
  requestRecipeSuccess,
  requestRecipeFailure,
  updateRecipe,
  updateRecipeSuccess,
  updateRecipeFailure
};

export const initialState = {
  savePoint: null,
  editing: false,
  active: {
    id: null,
    name: '',
    ingredients: []
  },
  error: null,
  desired: {
    nicotineStrength: 0,
    diluentRatio: 0,
    volume: 0
  },
  settings: {
    nicotineStrength: 0,
    nicotineDiluentRatio: 0
  }
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        active: {
          id: null,
          name: '',
          ingredients: []
        }
      };
    case types.EDIT_RECIPE_SUCCESS:
      if (state.editing) {
        return state;
      }

      return {
        ...state,
        editing: true,
        savePoint: state.active
      };
    case types.REVERT_RECIPE_SUCCESS:
      if (!state.editing) {
        return state;
      }

      return {
        ...state,
        editing: false,
        savePoint: null,
        active: state.savePoint
      };
    case types.REQUEST_RECIPE_SUCCESS:
    case types.UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        active: action.recipe
      };
    case types.EDIT_RECIPE_FAILURE:
    case types.REVERT_RECIPE_FAILURE:
    case types.REQUEST_RECIPE_FAILURE:
    case types.UPDATE_RECIPE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
