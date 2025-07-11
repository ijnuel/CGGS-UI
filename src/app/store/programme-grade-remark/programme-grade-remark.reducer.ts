import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ProgrammeGradeRemarkAction from './programme-grade-remark.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ProgrammeGradeRemarkListInterface,
} from '../../types';

export const programmeGradeRemarkFeatureKey = 'programmeGradeRemark';

export interface ProgrammeGradeRemarkState {
  programmeGradeRemarkList: PaginatedResponseInterface<ProgrammeGradeRemarkListInterface[]> | null;
  programmeGradeRemarkAll: ProgrammeGradeRemarkListInterface[] | null;
  programmeGradeRemarkByProperties: ProgrammeGradeRemarkListInterface[] | null;
  programmeGradeRemarkById: ProgrammeGradeRemarkListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: ProgrammeGradeRemarkState = {
  programmeGradeRemarkList: null,
  programmeGradeRemarkAll: null,
  programmeGradeRemarkByProperties: null,
  programmeGradeRemarkById: null,
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
  on(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkAllSuccess, (state, { payload }) => ({
    ...state,
    programmeGradeRemarkAll: payload.entity,
    loading: false,
  })),
  on(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkListSuccess, (state, { payload }) => ({
    ...state,
    programmeGradeRemarkList: payload.entity,
    loading: false,
  })),
  on(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkByIdSuccess, (state, { payload }) => ({
    ...state,
    programmeGradeRemarkById: payload.entity,
    loading: false,
  })),
  on(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    programmeGradeRemarkByProperties: payload.entity,
    loading: false,
  })),
  on(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(ProgrammeGradeRemarkAction.programmeGradeRemarkExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgrammeGradeRemarkAction.programmeGradeRemarkExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(ProgrammeGradeRemarkAction.programmeGradeRemarkExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(ProgrammeGradeRemarkAction.programmeGradeRemarkCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgrammeGradeRemarkAction.programmeGradeRemarkCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(ProgrammeGradeRemarkAction.programmeGradeRemarkCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(ProgrammeGradeRemarkAction.createProgrammeGradeRemark, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(ProgrammeGradeRemarkAction.createProgrammeGradeRemarkSuccess, (state, { payload }) => ({
    ...state,
    programmeGradeRemarkList: state.programmeGradeRemarkList
      ? {
          ...state.programmeGradeRemarkList,
          data: [...state.programmeGradeRemarkList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(ProgrammeGradeRemarkAction.createProgrammeGradeRemarkFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(ProgrammeGradeRemarkAction.updateProgrammeGradeRemark, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(ProgrammeGradeRemarkAction.updateProgrammeGradeRemarkSuccess, (state, { payload }) => ({
    ...state,
    programmeGradeRemarkList: state.programmeGradeRemarkList
      ? {
          ...state.programmeGradeRemarkList,
          data: state.programmeGradeRemarkList.data.map((item: ProgrammeGradeRemarkListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    programmeGradeRemarkById:
      state.programmeGradeRemarkById?.id === payload.entity.id
        ? payload.entity
        : state.programmeGradeRemarkById,
    loading: false,
    updateSuccess: true,
  })),
  on(ProgrammeGradeRemarkAction.updateProgrammeGradeRemarkFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(ProgrammeGradeRemarkAction.deleteProgrammeGradeRemark, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgrammeGradeRemarkAction.deleteProgrammeGradeRemarkSuccess, (state) => ({
    ...state,
    programmeGradeRemarkById: null,
    programmeGradeRemarkList: state.programmeGradeRemarkList
      ? {
          ...state.programmeGradeRemarkList,
          data: state.programmeGradeRemarkList.data.filter((item) => item.id !== state.programmeGradeRemarkById?.id),
        }
      : null,
    loading: false,
  })),
  on(ProgrammeGradeRemarkAction.deleteProgrammeGradeRemarkFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(ProgrammeGradeRemarkAction.createManyProgrammeGradeRemarks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgrammeGradeRemarkAction.createManyProgrammeGradeRemarksSuccess, (state, { payload }) => ({
    ...state,
    programmeGradeRemarkList: state.programmeGradeRemarkList
      ? {
          ...state.programmeGradeRemarkList,
          data: [...state.programmeGradeRemarkList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(ProgrammeGradeRemarkAction.createManyProgrammeGradeRemarksFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(ProgrammeGradeRemarkAction.updateManyProgrammeGradeRemarks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgrammeGradeRemarkAction.updateManyProgrammeGradeRemarksSuccess, (state, { payload }) => ({
    ...state,
    programmeGradeRemarkList: state.programmeGradeRemarkList
      ? {
          ...state.programmeGradeRemarkList,
          data: state.programmeGradeRemarkList.data.map((item: ProgrammeGradeRemarkListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(ProgrammeGradeRemarkAction.updateManyProgrammeGradeRemarksFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(ProgrammeGradeRemarkAction.deleteManyProgrammeGradeRemarks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProgrammeGradeRemarkAction.deleteManyProgrammeGradeRemarksSuccess, (state) => ({
    ...state,
    programmeGradeRemarkList: null,
    loading: false,
  })),
  on(ProgrammeGradeRemarkAction.deleteManyProgrammeGradeRemarksFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectProgrammeGradeRemarkState = createFeatureSelector<ProgrammeGradeRemarkState>(
  programmeGradeRemarkFeatureKey
);

export const getProgrammeGradeRemarkList = (state: ProgrammeGradeRemarkState) => state.programmeGradeRemarkList;
export const getProgrammeGradeRemarkAll = (state: ProgrammeGradeRemarkState) => state.programmeGradeRemarkAll;
export const getProgrammeGradeRemarkByProperties = (state: ProgrammeGradeRemarkState) =>
  state.programmeGradeRemarkByProperties;
export const getProgrammeGradeRemarkById = (state: ProgrammeGradeRemarkState) => state.programmeGradeRemarkById;
export const getExists = (state: ProgrammeGradeRemarkState) => state.exists;
export const getCount = (state: ProgrammeGradeRemarkState) => state.count;
export const getLoading = (state: ProgrammeGradeRemarkState) => state.loading;
export const getError = (state: ProgrammeGradeRemarkState) => state.error;
export const getCreateSuccess = (state: ProgrammeGradeRemarkState) => state.createSuccess;
export const getUpdateSuccess = (state: ProgrammeGradeRemarkState) => state.updateSuccess;
