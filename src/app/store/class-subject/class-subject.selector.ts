import { createSelector } from '@ngrx/store';
import {
  getClassSubjectList,
  getClassSubjectAll,
  getClassSubjectByProperties,
  getClassSubjectById,
  getExists,
  getCount,
  getLoading,
  getError,
  ClassSubjectState,
} from './class-subject.reducer';

export const selectClassSubjectState = (state: { classSubject: ClassSubjectState }) =>
  state.classSubject;

export const selectClassSubjectList = createSelector(
  selectClassSubjectState,
  getClassSubjectList
);

export const selectClassSubjectAll = createSelector(
  selectClassSubjectState,
  getClassSubjectAll
);

export const selectClassSubjectByProperties = createSelector(
  selectClassSubjectState,
  getClassSubjectByProperties
);

export const selectClassSubjectById = createSelector(
  selectClassSubjectState,
  getClassSubjectById
);

export const selectExists = createSelector(
  selectClassSubjectState,
  getExists
);

export const selectCount = createSelector(
  selectClassSubjectState,
  getCount
);

export const selectClassSubjectLoading = createSelector(
  selectClassSubjectState,
  getLoading
);

export const selectClassSubjectError = createSelector(
  selectClassSubjectState,
  getError
);

export const selectClassSubjectCreateSuccess = createSelector(
    selectClassSubjectState,
    (state) => state.createSuccess
);

export const selectClassSubjectUpdateSuccess = createSelector(
    selectClassSubjectState,
    (state) => state.updateSuccess
);