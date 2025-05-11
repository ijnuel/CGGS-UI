import { createSelector } from '@ngrx/store';
import * as fromStudentClass from './student-class.reducer';
import * as fromApp from '../app.reducer';

export const selectStudentClassState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromStudentClass.studentClassFeatureKey]
);

export const selectStudentClassList = createSelector(
  fromStudentClass.selectStudentClassState,
  fromStudentClass.getStudentClassList
);

export const selectStudentClassById = createSelector(
  fromStudentClass.selectStudentClassState,
  fromStudentClass.getStudentClassById
);

export const selectLoading = createSelector(
  fromStudentClass.selectStudentClassState,
  fromStudentClass.getLoading
);

export const selectError = createSelector(
  fromStudentClass.selectStudentClassState,
  fromStudentClass.getError
);
