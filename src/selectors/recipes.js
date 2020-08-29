import { createSelector } from 'reselect';

export const getRecipes = (state) => state.recipes;

export const getRecipeList = createSelector(
  getRecipes,
  (recipes) => recipes.list
);
