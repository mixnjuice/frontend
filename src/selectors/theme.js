import { createSelector } from 'reselect';

export const getTheme = state => state.theme;

export const getCurrentTheme = createSelector(getTheme, theme => theme.theme);
