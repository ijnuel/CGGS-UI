import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as FamilyAction from './family.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  FamilyListInterface,
} from '../../types';

export const familyFeatureKey = 'family';

export interface FamilyState {
  familyList: PaginatedResponseInterface<FamilyListInterface[]> | null;
  familyAll: FamilyListInterface[] | null;
  familyByProperties: FamilyListInterface[] | null;
  familyById: FamilyListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: FamilyState = {
  familyList: null,
  familyAll: null,
  familyByProperties: null,
  familyById: null,
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
  on(FamilyAction.getFamilyAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FamilyAction.getFamilyAllSuccess, (state, { payload }) => ({
    ...state,
    familyAll: payload.entity,
    loading: false,
  })),
  on(FamilyAction.getFamilyAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(FamilyAction.getFamilyList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(FamilyAction.getFamilyListSuccess, (state, { payload }) => ({
    ...state,
    familyList: payload.entity,
    loading: false,
  })),
  on(FamilyAction.getFamilyListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(FamilyAction.getFamilyById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FamilyAction.getFamilyByIdSuccess, (state, { payload }) => ({
    ...state,
    familyById: payload.entity,
    loading: false,
  })),
  on(FamilyAction.getFamilyByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(FamilyAction.getFamilyByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FamilyAction.getFamilyByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    familyByProperties: payload.entity,
    loading: false,
  })),
  on(FamilyAction.getFamilyByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(FamilyAction.familyExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FamilyAction.familyExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(FamilyAction.familyExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(FamilyAction.familyCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FamilyAction.familyCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(FamilyAction.familyCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(FamilyAction.createFamily, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(FamilyAction.createFamilySuccess, (state, { payload }) => ({
    ...state,
    familyList: state.familyList
      ? {
          ...state.familyList,
          data: [...state.familyList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(FamilyAction.createFamilyFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(FamilyAction.updateFamily, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(FamilyAction.updateFamilySuccess, (state, { payload }) => ({
    ...state,
    familyList: state.familyList
      ? {
          ...state.familyList,
          data: state.familyList.data.map((item: FamilyListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    familyById:
      state.familyById?.id === payload.entity.id
        ? payload.entity
        : state.familyById,
    loading: false,
    updateSuccess: true,
  })),
  on(FamilyAction.updateFamilyFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(FamilyAction.deleteFamily, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FamilyAction.deleteFamilySuccess, (state) => ({
    ...state,
    familyById: null,
    familyList: state.familyList
      ? {
          ...state.familyList,
          data: state.familyList.data.filter((item) => item.id !== state.familyById?.id),
        }
      : null,
    loading: false,
  })),
  on(FamilyAction.deleteFamilyFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(FamilyAction.createManyFamilys, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FamilyAction.createManyFamilysSuccess, (state, { payload }) => ({
    ...state,
    familyList: state.familyList
      ? {
          ...state.familyList,
          data: [...state.familyList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(FamilyAction.createManyFamilysFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(FamilyAction.updateManyFamilys, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FamilyAction.updateManyFamilysSuccess, (state, { payload }) => ({
    ...state,
    familyList: state.familyList
      ? {
          ...state.familyList,
          data: state.familyList.data.map((item: FamilyListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(FamilyAction.updateManyFamilysFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(FamilyAction.deleteManyFamilys, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FamilyAction.deleteManyFamilysSuccess, (state) => ({
    ...state,
    familyList: null,
    loading: false,
  })),
  on(FamilyAction.deleteManyFamilysFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectFamilyState = createFeatureSelector<FamilyState>(
  familyFeatureKey
);

export const getFamilyList = (state: FamilyState) => state.familyList;
export const getFamilyAll = (state: FamilyState) => state.familyAll;
export const getFamilyByProperties = (state: FamilyState) =>
  state.familyByProperties;
export const getFamilyById = (state: FamilyState) => state.familyById;
export const getExists = (state: FamilyState) => state.exists;
export const getCount = (state: FamilyState) => state.count;
export const getLoading = (state: FamilyState) => state.loading;
export const getError = (state: FamilyState) => state.error;
export const getCreateSuccess = (state: FamilyState) => state.createSuccess;
export const getUpdateSuccess = (state: FamilyState) => state.updateSuccess;
