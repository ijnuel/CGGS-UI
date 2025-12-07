import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ProgramTypeAction from './program-type.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ProgramTypeListInterface,
} from '../../types';

export const programTypeFeatureKey = 'programType';

export interface ProgramTypeState {
  dataImportTemplate: any | null;
  programTypeList: PaginatedResponseInterface<ProgramTypeListInterface[]> | null;
  programTypeAll: ProgramTypeListInterface[] | null;
  programTypeByProperties: ProgramTypeListInterface | null;
  programTypeById: ProgramTypeListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: {
    start?: number;
    recordsPerPage?: number;
    searchText?: string;
    queryProperties?: string;
  } | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: ProgramTypeState = {
  dataImportTemplate: null,
  programTypeList: null,
  programTypeAll: null,
  programTypeByProperties: null,
  programTypeById: null,
  exists: null,
  count: null,
  pageQuery: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
};

export const reducer = createReducer(
  initialState,
  // Get All
  on(ProgramTypeAction.getProgramTypeAll, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(ProgramTypeAction.getProgramTypeAllSuccess, (state, { payload }) => ({
    ...state,
    programTypeAll: payload.entity,
    loading: false,
  })),
  on(ProgramTypeAction.getProgramTypeAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(ProgramTypeAction.getProgramTypeList, (state, action) => ({
    ...state,
    pageQuery: {
      start: action.start,
      recordsPerPage: action.recordsPerPage,
      searchText: action.searchText,
      queryProperties: action.queryProperties,
    },
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(ProgramTypeAction.getProgramTypeListSuccess, (state, { payload }) => ({
    ...state,
    programTypeList: payload.entity,
    loading: false,
  })),
  on(ProgramTypeAction.getProgramTypeListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(ProgramTypeAction.getProgramTypeById, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(ProgramTypeAction.getProgramTypeByIdSuccess, (state, { payload }) => ({
    ...state,
    programTypeById: payload.entity,
    loading: false,
  })),
  on(ProgramTypeAction.getProgramTypeByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(ProgramTypeAction.getProgramTypeByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(ProgramTypeAction.getProgramTypeByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    programTypeByProperties: payload.entity,
    loading: false,
  })),
  on(ProgramTypeAction.getProgramTypeByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(ProgramTypeAction.programTypeExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgramTypeAction.programTypeExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(ProgramTypeAction.programTypeExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(ProgramTypeAction.programTypeCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgramTypeAction.programTypeCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(ProgramTypeAction.programTypeCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(ProgramTypeAction.createProgramType, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(ProgramTypeAction.createProgramTypeSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    createSuccess: true,
  })),
  on(ProgramTypeAction.createProgramTypeFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(ProgramTypeAction.updateProgramType, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(ProgramTypeAction.updateProgramTypeSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    updateSuccess: true,
  })),
  on(ProgramTypeAction.updateProgramTypeFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(ProgramTypeAction.deleteProgramType, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgramTypeAction.deleteProgramTypeSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(ProgramTypeAction.deleteProgramTypeFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(ProgramTypeAction.createManyProgramTypes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgramTypeAction.createManyProgramTypesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
  })),
  on(ProgramTypeAction.createManyProgramTypesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(ProgramTypeAction.updateManyProgramTypes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgramTypeAction.updateManyProgramTypesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
  })),
  on(ProgramTypeAction.updateManyProgramTypesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(ProgramTypeAction.deleteManyProgramTypes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgramTypeAction.deleteManyProgramTypesSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(ProgramTypeAction.deleteManyProgramTypesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))

  // Get Data Import Template
  ,
  on(ProgramTypeAction.getProgramTypeDataImportTemplate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgramTypeAction.getProgramTypeDataImportTemplateSuccess, (state, { payload }) => ({
    ...state,
    dataImportTemplate: payload,
    loading: false,
  })),
  on(ProgramTypeAction.getProgramTypeDataImportTemplateFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const selectProgramTypeState = createFeatureSelector<ProgramTypeState>(
  programTypeFeatureKey
);

export const getProgramTypeList = (state: ProgramTypeState) => state.programTypeList;
export const getProgramTypeAll = (state: ProgramTypeState) => state.programTypeAll;
export const getProgramTypeByProperties = (state: ProgramTypeState) =>
  state.programTypeByProperties;
export const getProgramTypeById = (state: ProgramTypeState) => state.programTypeById;
export const getExists = (state: ProgramTypeState) => state.exists;
export const getCount = (state: ProgramTypeState) => state.count;
export const getLoading = (state: ProgramTypeState) => state.loading;
export const getError = (state: ProgramTypeState) => state.error;
export const getCreateSuccess = (state: ProgramTypeState) => state.createSuccess;
export const getUpdateSuccess = (state: ProgramTypeState) => state.updateSuccess;
