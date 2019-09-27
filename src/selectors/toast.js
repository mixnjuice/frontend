import { createSelector } from 'reselect';

export const getToasts = state => state.toast;

export const getQueue = createSelector(
  getToasts,
  toast => toast.queue
);
