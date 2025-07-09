import { createSelector } from '@ngrx/store';
import {
  getSubjectList,
  getSubjectAll,
  getSubjectByProperties,
  getSubjectById,
  getExists,
  getCount,
  getLoading,
  getError,
  SubjectState,
} from './subject.reducer';

export const selectSubjectState = (state: { subject: SubjectState }) =>
  state.subject;

export const selectSubjectList = createSelector(
  selectSubjectState,
  getSubjectList
);

export const selectSubjectAll = createSelector(
  selectSubjectState,
  getSubjectAll
);

export const selectSubjectByProperties = createSelector(
  selectSubjectState,
  getSubjectByProperties
);

export const selectSubjectById = createSelector(
  selectSubjectState,
  getSubjectById
);

export const selectExists = createSelector(
  selectSubjectState,
  getExists
);

export const selectCount = createSelector(
  selectSubjectState,
  getCount
);

export const selectSubjectLoading = createSelector(
  selectSubjectState,
  getLoading
);

export const selectSubjectError = createSelector(
  selectSubjectState,
  getError
);

export const selectSubjectCreateSuccess = createSelector(
    selectSubjectState,
    (state) => state.createSuccess
);

export const selectSubjectUpdateSuccess = createSelector(
    selectSubjectState,
    (state) => state.updateSuccess
);