import { createSelector } from '@ngrx/store';
import {
  getProgrammeGradeRemarkList,
  getProgrammeGradeRemarkAll,
  getProgrammeGradeRemarkByProperties,
  getProgrammeGradeRemarkById,
  getExists,
  getCount,
  getLoading,
  getError,
  ProgrammeGradeRemarkState,
} from './programme-grade-remark.reducer';

export const selectProgrammeGradeRemarkState = (state: { programmeGradeRemark: ProgrammeGradeRemarkState }) =>
  state.programmeGradeRemark;

export const selectProgrammeGradeRemarkList = createSelector(
  selectProgrammeGradeRemarkState,
  getProgrammeGradeRemarkList
);

export const selectProgrammeGradeRemarkAll = createSelector(
  selectProgrammeGradeRemarkState,
  getProgrammeGradeRemarkAll
);

export const selectProgrammeGradeRemarkByProperties = createSelector(
  selectProgrammeGradeRemarkState,
  getProgrammeGradeRemarkByProperties
);

export const selectProgrammeGradeRemarkById = createSelector(
  selectProgrammeGradeRemarkState,
  getProgrammeGradeRemarkById
);

export const selectExists = createSelector(
  selectProgrammeGradeRemarkState,
  getExists
);

export const selectCount = createSelector(
  selectProgrammeGradeRemarkState,
  getCount
);

export const selectProgrammeGradeRemarkLoading = createSelector(
  selectProgrammeGradeRemarkState,
  getLoading
);

export const selectProgrammeGradeRemarkError = createSelector(
  selectProgrammeGradeRemarkState,
  getError
);

export const selectProgrammeGradeRemarkCreateSuccess = createSelector(
    selectProgrammeGradeRemarkState,
    (state) => state.createSuccess
);

export const selectProgrammeGradeRemarkUpdateSuccess = createSelector(
    selectProgrammeGradeRemarkState,
    (state) => state.updateSuccess
);