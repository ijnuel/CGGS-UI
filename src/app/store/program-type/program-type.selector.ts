import { createSelector } from '@ngrx/store';
import {
  getProgramTypeList,
  getProgramTypeAll,
  getProgramTypeByProperties,
  getProgramTypeById,
  getExists,
  getCount,
  getLoading,
  getError,
  ProgramTypeState,
} from './program-type.reducer';

export const selectProgramTypeState = (state: { programType: ProgramTypeState }) =>
  state.programType;

export const selectProgramTypeList = createSelector(
  selectProgramTypeState,
  getProgramTypeList
);

export const selectProgramTypeAll = createSelector(
  selectProgramTypeState,
  getProgramTypeAll
);

export const selectProgramTypeByProperties = createSelector(
  selectProgramTypeState,
  getProgramTypeByProperties
);

export const selectProgramTypeById = createSelector(
  selectProgramTypeState,
  getProgramTypeById
);

export const selectExists = createSelector(
  selectProgramTypeState,
  getExists
);

export const selectCount = createSelector(
  selectProgramTypeState,
  getCount
);

export const selectProgramTypeLoading = createSelector(
  selectProgramTypeState,
  getLoading
);

export const selectProgramTypeError = createSelector(
  selectProgramTypeState,
  getError
);

export const selectProgramTypeCreateSuccess = createSelector(
    selectProgramTypeState,
    (state) => state.createSuccess
);

export const selectProgramTypeUpdateSuccess = createSelector(
    selectProgramTypeState,
    (state) => state.updateSuccess
);