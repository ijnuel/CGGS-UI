import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ProgramTypeAction from './program-type.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ProgramTypeListInterface,
} from '../../types';

export const programTypeFeatureKey = 'programType';

export interface ProgramTypeState {
  programTypeList: PaginatedResponseInterface<ProgramTypeListInterface[]> | null;
  programTypeAll: ProgramTypeListInterface[] | null;
  programTypeByProperties: ProgramTypeListInterface[] | null;
  programTypeById: ProgramTypeListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProgramTypeState = {
  programTypeList: null,
  programTypeAll: null,
  programTypeByProperties: null,
  programTypeById: null,
  exists: null,
  count: null,
  pageQuery: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  // Get All
  on(ProgramTypeAction.getProgramTypeAll, (state) => ({
    ...state,
    loading: true,
    error: null,
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
  on(ProgramTypeAction.getProgramTypeList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
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
  })),
  on(ProgramTypeAction.createProgramTypeSuccess, (state, { payload }) => ({
    ...state,
    programTypeList: state.programTypeList
      ? {
          ...state.programTypeList,
          data: [...state.programTypeList.data, payload.entity],
        }
      : null,
    loading: false,
  })),
  on(ProgramTypeAction.createProgramTypeFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(ProgramTypeAction.updateProgramType, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgramTypeAction.updateProgramTypeSuccess, (state, { payload }) => ({
    ...state,
    programTypeList: state.programTypeList
      ? {
          ...state.programTypeList,
          data: state.programTypeList.data.map((item: ProgramTypeListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    programTypeById:
      state.programTypeById?.id === payload.entity.id
        ? payload.entity
        : state.programTypeById,
    loading: false,
  })),
  on(ProgramTypeAction.updateProgramTypeFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(ProgramTypeAction.deleteProgramType, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgramTypeAction.deleteProgramTypeSuccess, (state) => ({
    ...state,
    programTypeById: null,
    programTypeList: state.programTypeList
      ? {
          ...state.programTypeList,
          data: state.programTypeList.data.filter((item) => item.id !== state.programTypeById?.id),
        }
      : null,
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
    programTypeList: state.programTypeList
      ? {
          ...state.programTypeList,
          data: [...state.programTypeList.data, ...payload.entity],
        }
      : null,
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
    programTypeList: state.programTypeList
      ? {
          ...state.programTypeList,
          data: state.programTypeList.data.map((item: ProgramTypeListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
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
    programTypeList: null,
    loading: false,
  })),
  on(ProgramTypeAction.deleteManyProgramTypesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
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
