import { createSelector } from '@ngrx/store';
import {
  getStudentList,
  getStudentAll,
  getStudentByProperties,
  getStudentById,
  getExists,
  getCount,
  getLoading,
  getError,
  StudentState,
} from './student.reducer';

export const selectStudentState = (state: { student: StudentState }) =>
  state.student;

export const selectStudentList = createSelector(
  selectStudentState,
  getStudentList
);

export const selectStudentAll = createSelector(
  selectStudentState,
  getStudentAll
);

export const selectStudentByProperties = createSelector(
  selectStudentState,
  getStudentByProperties
);

export const selectStudentById = createSelector(
  selectStudentState,
  getStudentById
);

export const selectExists = createSelector(
  selectStudentState,
  getExists
);

export const selectCount = createSelector(
  selectStudentState,
  getCount
);

export const selectStudentLoading = createSelector(
  selectStudentState,
  getLoading
);

export const selectStudentError = createSelector(
  selectStudentState,
  getError
);
