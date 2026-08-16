import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ProgrammeTypeStreamListInterface } from '../../types';
import { PageQueryInterface, PaginatedResponseInterface } from '../../types';
import * as ProgrammeTypeStreamAction from './programme-type-stream.actions';

export const programmeTypeStreamFeatureKey = 'programmeTypeStream';

export interface ProgrammeTypeStreamState {
  programmeTypeStreamList: PaginatedResponseInterface<ProgrammeTypeStreamListInterface[]> | null;
  programmeTypeStreamAll: ProgrammeTypeStreamListInterface[] | null;
  programmeTypeStreamById: ProgrammeTypeStreamListInterface | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
}

const initialState: ProgrammeTypeStreamState = {
  programmeTypeStreamList: null,
  programmeTypeStreamAll: null,
  programmeTypeStreamById: null,
  pageQuery: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

export const programmeTypeStreamReducer = createReducer(
  initialState,

  on(ProgrammeTypeStreamAction.getProgrammeTypeStreamAll, (state) => ({ ...state, loading: true, error: null })),
  on(ProgrammeTypeStreamAction.getProgrammeTypeStreamAllSuccess, (state, { payload }) => ({
    ...state, loading: false, programmeTypeStreamAll: payload.entity,
  })),
  on(ProgrammeTypeStreamAction.getProgrammeTypeStreamAllFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(ProgrammeTypeStreamAction.getProgrammeTypeStreamList, (state, { pageQuery }) => ({ ...state, loading: true, error: null, pageQuery })),
  on(ProgrammeTypeStreamAction.getProgrammeTypeStreamListSuccess, (state, { payload }) => ({
    ...state, loading: false, programmeTypeStreamList: payload.entity,
  })),
  on(ProgrammeTypeStreamAction.getProgrammeTypeStreamListFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(ProgrammeTypeStreamAction.getProgrammeTypeStreamById, (state) => ({ ...state, loading: true, error: null })),
  on(ProgrammeTypeStreamAction.getProgrammeTypeStreamByIdSuccess, (state, { payload }) => ({
    ...state, loading: false, programmeTypeStreamById: payload.entity,
  })),
  on(ProgrammeTypeStreamAction.getProgrammeTypeStreamByIdFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(ProgrammeTypeStreamAction.createProgrammeTypeStream, (state) => ({ ...state, loading: true, error: null, createSuccess: false })),
  on(ProgrammeTypeStreamAction.createProgrammeTypeStreamSuccess, (state) => ({ ...state, loading: false, createSuccess: true })),
  on(ProgrammeTypeStreamAction.createProgrammeTypeStreamFail, (state, { error }) => ({ ...state, loading: false, error, createSuccess: false })),

  on(ProgrammeTypeStreamAction.updateProgrammeTypeStream, (state) => ({ ...state, loading: true, error: null, updateSuccess: false })),
  on(ProgrammeTypeStreamAction.updateProgrammeTypeStreamSuccess, (state) => ({ ...state, loading: false, updateSuccess: true })),
  on(ProgrammeTypeStreamAction.updateProgrammeTypeStreamFail, (state, { error }) => ({ ...state, loading: false, error, updateSuccess: false })),

  on(ProgrammeTypeStreamAction.deleteProgrammeTypeStream, (state) => ({ ...state, loading: true, error: null, deleteSuccess: false })),
  on(ProgrammeTypeStreamAction.deleteProgrammeTypeStreamSuccess, (state) => ({ ...state, loading: false, deleteSuccess: true })),
  on(ProgrammeTypeStreamAction.deleteProgrammeTypeStreamFail, (state, { error }) => ({ ...state, loading: false, error, deleteSuccess: false })),
);

// Selectors
export const selectProgrammeTypeStreamState = createFeatureSelector<ProgrammeTypeStreamState>(programmeTypeStreamFeatureKey);
export const selectProgrammeTypeStreamAll = createSelector(selectProgrammeTypeStreamState, (s) => s.programmeTypeStreamAll);
export const selectProgrammeTypeStreamList = createSelector(selectProgrammeTypeStreamState, (s) => s.programmeTypeStreamList);
export const selectProgrammeTypeStreamById = createSelector(selectProgrammeTypeStreamState, (s) => s.programmeTypeStreamById);
export const selectProgrammeTypeStreamLoading = createSelector(selectProgrammeTypeStreamState, (s) => s.loading);
export const selectProgrammeTypeStreamError = createSelector(selectProgrammeTypeStreamState, (s) => s.error);
export const selectProgrammeTypeStreamCreateSuccess = createSelector(selectProgrammeTypeStreamState, (s) => s.createSuccess);
export const selectProgrammeTypeStreamUpdateSuccess = createSelector(selectProgrammeTypeStreamState, (s) => s.updateSuccess);
export const selectProgrammeTypeStreamDeleteSuccess = createSelector(selectProgrammeTypeStreamState, (s) => s.deleteSuccess);
