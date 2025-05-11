import { createSelector } from '@ngrx/store';
import * as fromClassLevel from './class-level.reducer';
import * as fromApp from '../app.reducer';

export const selectClassLevelState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromClassLevel.classLevelFeatureKey]
);

export const selectClassLevelList = createSelector(
  fromClassLevel.selectClassLevelState,
  fromClassLevel.getClassLevelList
);

export const selectClassLevelById = createSelector(
  fromClassLevel.selectClassLevelState,
  fromClassLevel.getClassLevelById
);

export const selectLoading = createSelector(
  fromClassLevel.selectClassLevelState,
  fromClassLevel.getLoading
);

export const selectError = createSelector(
  fromClassLevel.selectClassLevelState,
  fromClassLevel.getError
);
