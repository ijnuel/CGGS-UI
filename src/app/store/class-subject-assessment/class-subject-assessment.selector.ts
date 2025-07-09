import { createSelector } from '@ngrx/store';
import {
  getClassSubjectAssessmentList,
  getClassSubjectAssessmentAll,
  getClassSubjectAssessmentByProperties,
  getClassSubjectAssessmentById,
  getExists,
  getCount,
  getLoading,
  getError,
  ClassSubjectAssessmentState,
} from './class-subject-assessment.reducer';

export const selectClassSubjectAssessmentState = (state: { classSubjectAssessment: ClassSubjectAssessmentState }) =>
  state.classSubjectAssessment;

export const selectClassSubjectAssessmentList = createSelector(
  selectClassSubjectAssessmentState,
  getClassSubjectAssessmentList
);

export const selectClassSubjectAssessmentAll = createSelector(
  selectClassSubjectAssessmentState,
  getClassSubjectAssessmentAll
);

export const selectClassSubjectAssessmentByProperties = createSelector(
  selectClassSubjectAssessmentState,
  getClassSubjectAssessmentByProperties
);

export const selectClassSubjectAssessmentById = createSelector(
  selectClassSubjectAssessmentState,
  getClassSubjectAssessmentById
);

export const selectExists = createSelector(
  selectClassSubjectAssessmentState,
  getExists
);

export const selectCount = createSelector(
  selectClassSubjectAssessmentState,
  getCount
);

export const selectClassSubjectAssessmentLoading = createSelector(
  selectClassSubjectAssessmentState,
  getLoading
);

export const selectClassSubjectAssessmentError = createSelector(
  selectClassSubjectAssessmentState,
  getError
);

export const selectClassSubjectAssessmentCreateSuccess = createSelector(
    selectClassSubjectAssessmentState,
    (state) => state.createSuccess
);

export const selectClassSubjectAssessmentUpdateSuccess = createSelector(
    selectClassSubjectAssessmentState,
    (state) => state.updateSuccess
);