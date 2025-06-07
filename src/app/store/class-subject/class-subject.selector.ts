import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClassSubjectState } from './class-subject.reducer';

export const selectClassSubjectState = createFeatureSelector<ClassSubjectState>('classSubject');

export const selectAllClassSubjects = createSelector(
  selectClassSubjectState,
  (state) => state.entities
);

export const selectClassSubjectLoading = createSelector(
  selectClassSubjectState,
  (state) => state.loading
);

export const selectClassSubjectError = createSelector(
  selectClassSubjectState,
  (state) => state.error
);

export const selectSelectedClassSubject = createSelector(
  selectClassSubjectState,
  (state) => state.selected
);

export const selectClassSubjectCount = createSelector(
  selectClassSubjectState,
  (state) => state.count
); 