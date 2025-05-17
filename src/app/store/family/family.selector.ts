import { createSelector } from '@ngrx/store';
import * as fromFamily from './family.reducer';
import * as fromApp from '../app.reducer';

export const selectFamilyState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromFamily.familyFeatureKey]
);

export const selectFamilyList = createSelector(
  fromFamily.selectFamilyState,
  fromFamily.getFamilyList
);

export const selectFamilyById = createSelector(
  fromFamily.selectFamilyState,
  fromFamily.getFamilyById
);

export const selectLoading = createSelector(
  fromFamily.selectFamilyState,
  fromFamily.getLoading
);

export const selectError = createSelector(
  fromFamily.selectFamilyState,
  fromFamily.getError
);
