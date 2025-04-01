import { createSelector } from '@ngrx/store';
import * as fromStudents from './students.reducer';
import * as fromApp from '../app.reducer';

export const selectStudentsState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromStudents.studentsFeatureKey]
);

export const selectStudentsList = createSelector(
  fromStudents.selectStudentState,
  fromStudents.getStudentList
);

export const selectStudentById = createSelector(
  fromStudents.selectStudentState,
  fromStudents.getStudentById
);

export const selectLoading = createSelector(
  fromStudents.selectStudentState,
  fromStudents.getLoading
);

export const selectError = createSelector(
  fromStudents.selectStudentState,
  fromStudents.getError
);
