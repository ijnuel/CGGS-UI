import { createSelector } from '@ngrx/store';
import {
  getFamilyList,
  getFamilyAll,
  getFamilyByProperties,
  getFamilyById,
  getExists,
  getCount,
  getLoading,
  getError,
  FamilyState,
} from './family.reducer';

export const selectFamilyState = (state: { family: FamilyState }) =>
  state.family;

export const selectFamilyList = createSelector(
  selectFamilyState,
  getFamilyList
);

export const selectFamilyAll = createSelector(
  selectFamilyState,
  getFamilyAll
);

export const selectFamilyByProperties = createSelector(
  selectFamilyState,
  getFamilyByProperties
);

export const selectFamilyById = createSelector(
  selectFamilyState,
  getFamilyById
);

export const selectExists = createSelector(
  selectFamilyState,
  getExists
);

export const selectCount = createSelector(
  selectFamilyState,
  getCount
);

export const selectFamilyLoading = createSelector(
  selectFamilyState,
  getLoading
);

export const selectFamilyError = createSelector(
  selectFamilyState,
  getError
);

export const selectFamilyCreateSuccess = createSelector(
    selectFamilyState,
    (state) => state.createSuccess
);

export const selectFamilyUpdateSuccess = createSelector(
    selectFamilyState,
    (state) => state.updateSuccess
);