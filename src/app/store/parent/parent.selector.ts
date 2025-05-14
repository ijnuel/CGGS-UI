import { createSelector } from '@ngrx/store';
import * as fromParent from './parent.reducer';
import * as fromApp from '../app.reducer';

export const selectParentState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromParent.parentFeatureKey]
);

export const selectParentList = createSelector(
  fromParent.selectParentState,
  fromParent.getParentList
);

export const selectParentById = createSelector(
  fromParent.selectParentState,
  fromParent.getParentById
);

export const selectLoading = createSelector(
  fromParent.selectParentState,
  fromParent.getLoading
);

export const selectError = createSelector(
  fromParent.selectParentState,
  fromParent.getError
);
