import { createSelector } from '@ngrx/store';
import {
  getStudentList,
  getStudentAll,
  getStudentsWithoutClass,
  getStudentByProperties,
  getStudentById,
  getExists,
  getCount,
  getLoading,
  getError,
  getDownloadLoading,
  getImportLoading,
  getImportSuccess,
  getImportCreated,
  getImportErrors,
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

export const selectStudentsWithoutClass = createSelector(
  selectStudentState,
  getStudentsWithoutClass
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

export const selectStudentCreateSuccess = createSelector(
    selectStudentState,
    (state) => state.createSuccess
);

export const selectStudentUpdateSuccess = createSelector(
    selectStudentState,
    (state) => state.updateSuccess
);

export const selectDownloadLoading = createSelector(selectStudentState, getDownloadLoading);
export const selectImportLoading = createSelector(selectStudentState, getImportLoading);
export const selectImportSuccess = createSelector(selectStudentState, getImportSuccess);
export const selectImportCreated = createSelector(selectStudentState, getImportCreated);
export const selectImportErrors = createSelector(selectStudentState, getImportErrors);