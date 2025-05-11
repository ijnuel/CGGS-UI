import { createSelector } from '@ngrx/store';
import * as fromClass from './class.reducer';
import * as fromApp from '../app.reducer';

export const selectClassState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromClass.classFeatureKey]
);

export const selectClassList = createSelector(
  fromClass.selectClassState,
  fromClass.getClassList
);

export const selectClassById = createSelector(
  fromClass.selectClassState,
  fromClass.getClassById
);

export const selectLoading = createSelector(
  fromClass.selectClassState,
  fromClass.getLoading
);

export const selectError = createSelector(
  fromClass.selectClassState,
  fromClass.getError
);
