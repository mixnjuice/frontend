import {
  getDesired,
  getActiveRecipe,
  getSettings,
  getDesiredVolume,
  getDesiredNicotineStrength,
  getDesiredDiluentRatio,
  getNicotineDiluentRatio,
  getNicotineStrength,
  isEditing,
  getRecipeId,
  getRecipeName,
  getRecipeIngredients,
  getRecipePercentages,
  getError,
  getSavePoint,
  getOptions
} from './recipe';
import { initialState } from 'reducers/recipe';

describe('recipe selectors', () => {
  const state = {
    recipe: initialState
  };
  const {
    active,
    desired,
    settings,
    savePoint,
    editing,
    error,
    options
  } = initialState;

  it('can getSavePoint', () => {
    expect(getSavePoint(state)).toBe(savePoint);
  });

  it('can get isEditing', () => {
    expect(isEditing(state)).toBe(editing);
  });

  it('can getActiveRecipe', () => {
    expect(getActiveRecipe(state)).toBe(active);
  });

  it('can getRecipeId', () => {
    expect(getRecipeId(state)).toBe(active.id);
  });

  it('can getRecipeName', () => {
    expect(getRecipeName(state)).toBe(active.name);
  });

  it('can getRecipeIngredients', () => {
    expect(getRecipeIngredients(state)).toBe(active.ingredients);
  });

  it('can getRecipePercentages', () => {
    expect(getRecipePercentages(state)).toBe(active.percentages);
  });

  it('can getError', () => {
    expect(getError(state)).toBe(error);
  });

  it('can getOptions', () => {
    expect(getOptions(state)).toBe(options);
  });

  it('can getDesired', () => {
    expect(getDesired(state)).toBe(desired);
  });

  it('can getSettings', () => {
    expect(getSettings(state)).toBe(settings);
  });

  it('can getNicotineStrength', () => {
    expect(getNicotineStrength(state)).toBe(settings.nicotineStrength);
  });

  it('can getNicotineDiluentRatio', () => {
    expect(getNicotineDiluentRatio(state)).toBe(settings.nicotineDiluentRatio);
  });

  it('can getDesiredNicotineStrength', () => {
    expect(getDesiredNicotineStrength(state)).toBe(desired.nicotineStrength);
  });

  it('can getDesiredDiluentRatio', () => {
    expect(getDesiredDiluentRatio(state)).toBe(desired.diluentRatio);
  });

  it('can getDesiredVolume', () => {
    expect(getDesiredVolume(state)).toBe(desired.volume);
  });
});
