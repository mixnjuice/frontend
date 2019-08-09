import { createSelector } from 'reselect';

export const getRecipe = state => state.recipe;

export const getSavePoint = createSelector(
  getRecipe,
  recipe => recipe.savePoint
);

export const isEditing = createSelector(
  getRecipe,
  recipe => recipe.editing
);

export const getActiveRecipe = createSelector(
  getRecipe,
  recipe => recipe.active
);

export const getError = createSelector(
  getRecipe,
  recipe => recipe.error
);
