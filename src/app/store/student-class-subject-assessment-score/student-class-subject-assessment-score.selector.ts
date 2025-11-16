import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentClassSubjectAssessmentScoreState, studentClassSubjectAssessmentScoreFeatureKey } from './student-class-subject-assessment-score.reducer';

export const selectStudentClassSubjectAssessmentScoreState = createFeatureSelector<StudentClassSubjectAssessmentScoreState>(studentClassSubjectAssessmentScoreFeatureKey);

export const selectStudentClassSubjectAssessmentScoreList = createSelector(
  selectStudentClassSubjectAssessmentScoreState,
  (state) => state.studentClassSubjectAssessmentScoreList
);

export const selectStudentClassSubjectAssessmentScoreAll = createSelector(
  selectStudentClassSubjectAssessmentScoreState,
  (state) => state.studentClassSubjectAssessmentScoreAll
);

export const selectStudentClassSubjectAssessmentScoreByProperties = createSelector(
  selectStudentClassSubjectAssessmentScoreState,
  (state) => state.studentClassSubjectAssessmentScoreByProperties
);

export const selectStudentClassSubjectAssessmentScoreById = createSelector(
  selectStudentClassSubjectAssessmentScoreState,
  (state) => state.studentClassSubjectAssessmentScoreById
);

export const selectStudentClassSubjectAssessmentScoreLoading = createSelector(
  selectStudentClassSubjectAssessmentScoreState,
  (state) => state.loading
);

export const selectStudentClassSubjectAssessmentScoreError = createSelector(
  selectStudentClassSubjectAssessmentScoreState,
  (state) => state.error
);

export const selectUpdateManySuccess = createSelector(
  selectStudentClassSubjectAssessmentScoreState,
  (state) => state.updateManySuccess
);
