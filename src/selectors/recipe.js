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

export const getRecipeId = createSelector(
  getActiveRecipe,
  active => active.id
);

export const getRecipeName = createSelector(
  getActiveRecipe,
  active => active.name
);

export const getRecipeIngredients = createSelector(
  getActiveRecipe,
  active => active.ingredients
);

export const getRecipePercentages = createSelector(
  getActiveRecipe,
  active => active.percentages
);

export const getError = createSelector(
  getRecipe,
  recipe => recipe.error
);

export const getOptions = createSelector(
  getRecipe,
  recipe => recipe.options
);

export const getDesired = createSelector(
  getRecipe,
  recipe => recipe.desired
);

export const getSettings = createSelector(
  getRecipe,
  recipe => recipe.settings
);

export const getNicotineStrength = createSelector(
  getSettings,
  settings => settings.nicotineStrength
);

export const getNicotineDiluentRatio = createSelector(
  getSettings,
  settings => settings.nicotineDiluentRatio
);

export const getDesiredNicotineStrength = createSelector(
  getDesired,
  desired => desired.nicotineStrength
);

export const getDesiredDiluentRatio = createSelector(
  getDesired,
  desired => desired.diluentRatio
);

export const getDesiredVolume = createSelector(
  getDesired,
  desired => desired.volume
);
