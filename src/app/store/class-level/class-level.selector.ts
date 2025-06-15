import { createSelector } from '@ngrx/store';
import {
  getClassLevelList,
  getClassLevelAll,
  getClassLevelByProperties,
  getClassLevelById,
  getExists,
  getCount,
  getLoading,
  getError,
  ClassLevelState,
} from './class-level.reducer';

export const selectClassLevelState = (state: { classLevel: ClassLevelState }) =>
  state.classLevel;

export const selectClassLevelList = createSelector(
  selectClassLevelState,
  getClassLevelList
);

export const selectClassLevelAll = createSelector(
  selectClassLevelState,
  getClassLevelAll
);

export const selectClassLevelByProperties = createSelector(
  selectClassLevelState,
  getClassLevelByProperties
);

export const selectClassLevelById = createSelector(
  selectClassLevelState,
  getClassLevelById
);

export const selectExists = createSelector(
  selectClassLevelState,
  getExists
);

export const selectCount = createSelector(
  selectClassLevelState,
  getCount
);

export const selectClassLevelLoading = createSelector(
  selectClassLevelState,
  getLoading
);

export const selectClassLevelError = createSelector(
  selectClassLevelState,
  getError
);
