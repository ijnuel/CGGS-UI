import { createSelector } from '@ngrx/store';
import {
  getClassList,
  getClassAll,
  getClassByProperties,
  getClassById,
  getExists,
  getCount,
  getLoading,
  getError,
  ClassState,
} from './class.reducer';

export const selectClassState = (state: { class: ClassState }) =>
  state.class;

export const selectClassList = createSelector(
  selectClassState,
  getClassList
);

export const selectClassAll = createSelector(
  selectClassState,
  getClassAll
);

export const selectClassByProperties = createSelector(
  selectClassState,
  getClassByProperties
);

export const selectClassById = createSelector(
  selectClassState,
  getClassById
);

export const selectExists = createSelector(
  selectClassState,
  getExists
);

export const selectCount = createSelector(
  selectClassState,
  getCount
);

export const selectClassLoading = createSelector(
  selectClassState,
  getLoading
);

export const selectClassError = createSelector(
  selectClassState,
  getError
);

export const selectClassCreateSuccess = createSelector(
    selectClassState,
    (state) => state.createSuccess
);

export const selectClassUpdateSuccess = createSelector(
    selectClassState,
    (state) => state.updateSuccess
);