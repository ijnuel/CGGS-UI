import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClassSubjectResultState } from './class-subject-result.reducer';

export const selectClassSubjectResultState = createFeatureSelector<ClassSubjectResultState>('classSubjectResult');

export const selectAllClassSubjectResults = createSelector(
  selectClassSubjectResultState,
  (state) => state.entities
);

export const selectClassSubjectResultLoading = createSelector(
  selectClassSubjectResultState,
  (state) => state.loading
);

export const selectClassSubjectResultError = createSelector(
  selectClassSubjectResultState,
  (state) => state.error
);

export const selectSelectedClassSubjectResult = createSelector(
  selectClassSubjectResultState,
  (state) => state.selected
);

export const selectClassSubjectResultCount = createSelector(
  selectClassSubjectResultState,
  (state) => state.count
); 