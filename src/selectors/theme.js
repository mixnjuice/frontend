import { createSelector } from 'reselect';

export const getTheme = state => state.theme;

export const getThemeName = createSelector(getTheme, theme => theme.name);
