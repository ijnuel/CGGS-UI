import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as LocalGovernmentAreaAction from './local-government-area.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  LocalGovernmentAreaListInterface,
} from '../../types';

export const localGovernmentAreaFeatureKey = 'localGovernmentArea';

export interface LocalGovernmentAreaState {
  localGovernmentAreaList: PaginatedResponseInterface<LocalGovernmentAreaListInterface[]> | null;
  localGovernmentAreaAll: LocalGovernmentAreaListInterface[] | null;
  localGovernmentAreaByProperties: LocalGovernmentAreaListInterface[] | null;
  localGovernmentAreaById: LocalGovernmentAreaListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: LocalGovernmentAreaState = {
  localGovernmentAreaList: null,
  localGovernmentAreaAll: null,
  localGovernmentAreaByProperties: null,
  localGovernmentAreaById: null,
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
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaAllSuccess, (state, { payload }) => ({
    ...state,
    localGovernmentAreaAll: payload.entity,
    loading: false,
  })),
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaListSuccess, (state, { payload }) => ({
    ...state,
    localGovernmentAreaList: payload.entity,
    loading: false,
  })),
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaByIdSuccess, (state, { payload }) => ({
    ...state,
    localGovernmentAreaById: payload.entity,
    loading: false,
  })),
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    localGovernmentAreaByProperties: payload.entity,
    loading: false,
  })),
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(LocalGovernmentAreaAction.localGovernmentAreaExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LocalGovernmentAreaAction.localGovernmentAreaExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(LocalGovernmentAreaAction.localGovernmentAreaExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(LocalGovernmentAreaAction.localGovernmentAreaCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LocalGovernmentAreaAction.localGovernmentAreaCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(LocalGovernmentAreaAction.localGovernmentAreaCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(LocalGovernmentAreaAction.createLocalGovernmentArea, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(LocalGovernmentAreaAction.createLocalGovernmentAreaSuccess, (state, { payload }) => ({
    ...state,
    localGovernmentAreaList: state.localGovernmentAreaList
      ? {
          ...state.localGovernmentAreaList,
          data: [...state.localGovernmentAreaList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(LocalGovernmentAreaAction.createLocalGovernmentAreaFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(LocalGovernmentAreaAction.updateLocalGovernmentArea, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(LocalGovernmentAreaAction.updateLocalGovernmentAreaSuccess, (state, { payload }) => ({
    ...state,
    localGovernmentAreaList: state.localGovernmentAreaList
      ? {
          ...state.localGovernmentAreaList,
          data: state.localGovernmentAreaList.data.map((item: LocalGovernmentAreaListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    localGovernmentAreaById:
      state.localGovernmentAreaById?.id === payload.entity.id
        ? payload.entity
        : state.localGovernmentAreaById,
    loading: false,
    updateSuccess: true,
  })),
  on(LocalGovernmentAreaAction.updateLocalGovernmentAreaFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(LocalGovernmentAreaAction.deleteLocalGovernmentArea, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LocalGovernmentAreaAction.deleteLocalGovernmentAreaSuccess, (state) => ({
    ...state,
    localGovernmentAreaById: null,
    localGovernmentAreaList: state.localGovernmentAreaList
      ? {
          ...state.localGovernmentAreaList,
          data: state.localGovernmentAreaList.data.filter((item) => item.id !== state.localGovernmentAreaById?.id),
        }
      : null,
    loading: false,
  })),
  on(LocalGovernmentAreaAction.deleteLocalGovernmentAreaFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(LocalGovernmentAreaAction.createManyLocalGovernmentAreas, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LocalGovernmentAreaAction.createManyLocalGovernmentAreasSuccess, (state, { payload }) => ({
    ...state,
    localGovernmentAreaList: state.localGovernmentAreaList
      ? {
          ...state.localGovernmentAreaList,
          data: [...state.localGovernmentAreaList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(LocalGovernmentAreaAction.createManyLocalGovernmentAreasFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(LocalGovernmentAreaAction.updateManyLocalGovernmentAreas, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LocalGovernmentAreaAction.updateManyLocalGovernmentAreasSuccess, (state, { payload }) => ({
    ...state,
    localGovernmentAreaList: state.localGovernmentAreaList
      ? {
          ...state.localGovernmentAreaList,
          data: state.localGovernmentAreaList.data.map((item: LocalGovernmentAreaListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(LocalGovernmentAreaAction.updateManyLocalGovernmentAreasFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(LocalGovernmentAreaAction.deleteManyLocalGovernmentAreas, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LocalGovernmentAreaAction.deleteManyLocalGovernmentAreasSuccess, (state) => ({
    ...state,
    localGovernmentAreaList: null,
    loading: false,
  })),
  on(LocalGovernmentAreaAction.deleteManyLocalGovernmentAreasFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectLocalGovernmentAreaState = createFeatureSelector<LocalGovernmentAreaState>(
  localGovernmentAreaFeatureKey
);

export const getLocalGovernmentAreaList = (state: LocalGovernmentAreaState) => state.localGovernmentAreaList;
export const getLocalGovernmentAreaAll = (state: LocalGovernmentAreaState) => state.localGovernmentAreaAll;
export const getLocalGovernmentAreaByProperties = (state: LocalGovernmentAreaState) =>
  state.localGovernmentAreaByProperties;
export const getLocalGovernmentAreaById = (state: LocalGovernmentAreaState) => state.localGovernmentAreaById;
export const getExists = (state: LocalGovernmentAreaState) => state.exists;
export const getCount = (state: LocalGovernmentAreaState) => state.count;
export const getLoading = (state: LocalGovernmentAreaState) => state.loading;
export const getError = (state: LocalGovernmentAreaState) => state.error;
export const getCreateSuccess = (state: LocalGovernmentAreaState) => state.createSuccess;
export const getUpdateSuccess = (state: LocalGovernmentAreaState) => state.updateSuccess;
