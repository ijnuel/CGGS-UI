import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as SchoolConfigurationAction from './school-configuration.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  SchoolConfigurationListInterface,
} from '../../types';

export const schoolConfigurationFeatureKey = 'schoolConfiguration';

export interface SchoolConfigurationState {
  schoolConfigurationList: PaginatedResponseInterface<SchoolConfigurationListInterface[]> | null;
  schoolConfigurationAll: SchoolConfigurationListInterface[] | null;
  schoolConfigurationByProperties: SchoolConfigurationListInterface[] | null;
  schoolConfigurationById: SchoolConfigurationListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: SchoolConfigurationState = {
  schoolConfigurationList: null,
  schoolConfigurationAll: null,
  schoolConfigurationByProperties: null,
  schoolConfigurationById: null,
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
  on(SchoolConfigurationAction.getSchoolConfigurationAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolConfigurationAction.getSchoolConfigurationAllSuccess, (state, { payload }) => ({
    ...state,
    schoolConfigurationAll: payload.entity,
    loading: false,
  })),
  on(SchoolConfigurationAction.getSchoolConfigurationAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(SchoolConfigurationAction.getSchoolConfigurationList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(SchoolConfigurationAction.getSchoolConfigurationListSuccess, (state, { payload }) => ({
    ...state,
    schoolConfigurationList: payload.entity,
    loading: false,
  })),
  on(SchoolConfigurationAction.getSchoolConfigurationListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(SchoolConfigurationAction.getSchoolConfigurationById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolConfigurationAction.getSchoolConfigurationByIdSuccess, (state, { payload }) => ({
    ...state,
    schoolConfigurationById: payload.entity,
    loading: false,
  })),
  on(SchoolConfigurationAction.getSchoolConfigurationByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(SchoolConfigurationAction.getSchoolConfigurationByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolConfigurationAction.getSchoolConfigurationByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    schoolConfigurationByProperties: payload.entity,
    loading: false,
  })),
  on(SchoolConfigurationAction.getSchoolConfigurationByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(SchoolConfigurationAction.schoolConfigurationExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolConfigurationAction.schoolConfigurationExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(SchoolConfigurationAction.schoolConfigurationExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(SchoolConfigurationAction.schoolConfigurationCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolConfigurationAction.schoolConfigurationCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(SchoolConfigurationAction.schoolConfigurationCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(SchoolConfigurationAction.createSchoolConfiguration, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(SchoolConfigurationAction.createSchoolConfigurationSuccess, (state, { payload }) => ({
    ...state,
    schoolConfigurationList: state.schoolConfigurationList
      ? {
          ...state.schoolConfigurationList,
          data: [...state.schoolConfigurationList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(SchoolConfigurationAction.createSchoolConfigurationFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(SchoolConfigurationAction.updateSchoolConfiguration, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(SchoolConfigurationAction.updateSchoolConfigurationSuccess, (state, { payload }) => ({
    ...state,
    schoolConfigurationList: state.schoolConfigurationList
      ? {
          ...state.schoolConfigurationList,
          data: state.schoolConfigurationList.data.map((item: SchoolConfigurationListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    schoolConfigurationById:
      state.schoolConfigurationById?.id === payload.entity.id
        ? payload.entity
        : state.schoolConfigurationById,
    loading: false,
    updateSuccess: true,
  })),
  on(SchoolConfigurationAction.updateSchoolConfigurationFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(SchoolConfigurationAction.deleteSchoolConfiguration, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolConfigurationAction.deleteSchoolConfigurationSuccess, (state) => ({
    ...state,
    schoolConfigurationById: null,
    schoolConfigurationList: state.schoolConfigurationList
      ? {
          ...state.schoolConfigurationList,
          data: state.schoolConfigurationList.data.filter((item) => item.id !== state.schoolConfigurationById?.id),
        }
      : null,
    loading: false,
  })),
  on(SchoolConfigurationAction.deleteSchoolConfigurationFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(SchoolConfigurationAction.createManySchoolConfigurations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolConfigurationAction.createManySchoolConfigurationsSuccess, (state, { payload }) => ({
    ...state,
    schoolConfigurationList: state.schoolConfigurationList
      ? {
          ...state.schoolConfigurationList,
          data: [...state.schoolConfigurationList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(SchoolConfigurationAction.createManySchoolConfigurationsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(SchoolConfigurationAction.updateManySchoolConfigurations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolConfigurationAction.updateManySchoolConfigurationsSuccess, (state, { payload }) => ({
    ...state,
    schoolConfigurationList: state.schoolConfigurationList
      ? {
          ...state.schoolConfigurationList,
          data: state.schoolConfigurationList.data.map((item: SchoolConfigurationListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(SchoolConfigurationAction.updateManySchoolConfigurationsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(SchoolConfigurationAction.deleteManySchoolConfigurations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolConfigurationAction.deleteManySchoolConfigurationsSuccess, (state) => ({
    ...state,
    schoolConfigurationList: null,
    loading: false,
  })),
  on(SchoolConfigurationAction.deleteManySchoolConfigurationsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectSchoolConfigurationState = createFeatureSelector<SchoolConfigurationState>(
  schoolConfigurationFeatureKey
);

export const getSchoolConfigurationList = (state: SchoolConfigurationState) => state.schoolConfigurationList;
export const getSchoolConfigurationAll = (state: SchoolConfigurationState) => state.schoolConfigurationAll;
export const getSchoolConfigurationByProperties = (state: SchoolConfigurationState) =>
  state.schoolConfigurationByProperties;
export const getSchoolConfigurationById = (state: SchoolConfigurationState) => state.schoolConfigurationById;
export const getExists = (state: SchoolConfigurationState) => state.exists;
export const getCount = (state: SchoolConfigurationState) => state.count;
export const getLoading = (state: SchoolConfigurationState) => state.loading;
export const getError = (state: SchoolConfigurationState) => state.error;
export const getCreateSuccess = (state: SchoolConfigurationState) => state.createSuccess;
export const getUpdateSuccess = (state: SchoolConfigurationState) => state.updateSuccess;
