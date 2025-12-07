import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as PrincipalRemarkAction from './principal-remark.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  PrincipalRemarkListInterface,
} from '../../types';

export const principalRemarkFeatureKey = 'principalRemark';

export interface PrincipalRemarkState {
  principalRemarkList: PaginatedResponseInterface<PrincipalRemarkListInterface[]> | null;
  principalRemarkAll: PrincipalRemarkListInterface[] | null;
  principalRemarkByProperties: PrincipalRemarkListInterface[] | null;
  principalRemarkById: PrincipalRemarkListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
}

export const initialState: PrincipalRemarkState = {
  principalRemarkList: null,
  principalRemarkAll: null,
  principalRemarkByProperties: null,
  principalRemarkById: null,
  exists: null,
  count: null,
  pageQuery: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

export const reducer = createReducer(
  initialState,
  // Get All
  on(PrincipalRemarkAction.getPrincipalRemarkAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PrincipalRemarkAction.getPrincipalRemarkAllSuccess, (state, { payload }) => ({
    ...state,
    principalRemarkAll: payload.entity,
    loading: false,
  })),
  on(PrincipalRemarkAction.getPrincipalRemarkAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(PrincipalRemarkAction.getPrincipalRemarkList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(PrincipalRemarkAction.getPrincipalRemarkListSuccess, (state, { payload }) => ({
    ...state,
    principalRemarkList: payload.entity,
    loading: false,
  })),
  on(PrincipalRemarkAction.getPrincipalRemarkListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(PrincipalRemarkAction.getPrincipalRemarkById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PrincipalRemarkAction.getPrincipalRemarkByIdSuccess, (state, { payload }) => ({
    ...state,
    principalRemarkById: payload.entity,
    loading: false,
  })),
  on(PrincipalRemarkAction.getPrincipalRemarkByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(PrincipalRemarkAction.getPrincipalRemarkByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PrincipalRemarkAction.getPrincipalRemarkByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    principalRemarkByProperties: payload.entity,
    loading: false,
  })),
  on(PrincipalRemarkAction.getPrincipalRemarkByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(PrincipalRemarkAction.principalRemarkExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PrincipalRemarkAction.principalRemarkExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(PrincipalRemarkAction.principalRemarkExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(PrincipalRemarkAction.principalRemarkCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PrincipalRemarkAction.principalRemarkCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(PrincipalRemarkAction.principalRemarkCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(PrincipalRemarkAction.createPrincipalRemark, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(PrincipalRemarkAction.createPrincipalRemarkSuccess, (state, { payload }) => ({
    ...state,
    principalRemarkList: state.principalRemarkList
      ? {
          ...state.principalRemarkList,
          data: [...state.principalRemarkList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(PrincipalRemarkAction.createPrincipalRemarkFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(PrincipalRemarkAction.updatePrincipalRemark, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(PrincipalRemarkAction.updatePrincipalRemarkSuccess, (state, { payload }) => ({
    ...state,
    principalRemarkList: state.principalRemarkList
      ? {
          ...state.principalRemarkList,
          data: state.principalRemarkList.data.map((item: PrincipalRemarkListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    principalRemarkById:
      state.principalRemarkById?.id === payload.entity.id
        ? payload.entity
        : state.principalRemarkById,
    loading: false,
    updateSuccess: true,
  })),
  on(PrincipalRemarkAction.updatePrincipalRemarkFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(PrincipalRemarkAction.deletePrincipalRemark, (state) => ({
    ...state,
    loading: true,
    error: null,
    deleteSuccess: false,
  })),
  on(PrincipalRemarkAction.deletePrincipalRemarkSuccess, (state, { principalRemarkId }) => ({
    ...state,
    principalRemarkById:
      state.principalRemarkById?.id === principalRemarkId ? null : state.principalRemarkById,
    principalRemarkList: state.principalRemarkList
      ? {
          ...state.principalRemarkList,
          data: state.principalRemarkList.data.filter((item) => item.id !== principalRemarkId),
        }
      : null,
    loading: false,
    deleteSuccess: true,
  })),
  on(PrincipalRemarkAction.deletePrincipalRemarkFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    deleteSuccess: false,
  })),

  // Create Many
  on(PrincipalRemarkAction.createManyPrincipalRemarks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PrincipalRemarkAction.createManyPrincipalRemarksSuccess, (state, { payload }) => ({
    ...state,
    principalRemarkList: state.principalRemarkList
      ? {
          ...state.principalRemarkList,
          data: [...state.principalRemarkList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(PrincipalRemarkAction.createManyPrincipalRemarksFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(PrincipalRemarkAction.updateManyPrincipalRemarks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PrincipalRemarkAction.updateManyPrincipalRemarksSuccess, (state, { payload }) => ({
    ...state,
    principalRemarkList: state.principalRemarkList
      ? {
          ...state.principalRemarkList,
          data: state.principalRemarkList.data.map((item: PrincipalRemarkListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(PrincipalRemarkAction.updateManyPrincipalRemarksFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(PrincipalRemarkAction.deleteManyPrincipalRemarks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PrincipalRemarkAction.deleteManyPrincipalRemarksSuccess, (state) => ({
    ...state,
    principalRemarkList: null,
    loading: false,
  })),
  on(PrincipalRemarkAction.deleteManyPrincipalRemarksFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectPrincipalRemarkState = createFeatureSelector<PrincipalRemarkState>(
  principalRemarkFeatureKey
);

export const getPrincipalRemarkList = (state: PrincipalRemarkState) => state.principalRemarkList;
export const getPrincipalRemarkAll = (state: PrincipalRemarkState) => state.principalRemarkAll;
export const getPrincipalRemarkByProperties = (state: PrincipalRemarkState) =>
  state.principalRemarkByProperties;
export const getPrincipalRemarkById = (state: PrincipalRemarkState) => state.principalRemarkById;
export const getExists = (state: PrincipalRemarkState) => state.exists;
export const getCount = (state: PrincipalRemarkState) => state.count;
export const getLoading = (state: PrincipalRemarkState) => state.loading;
export const getError = (state: PrincipalRemarkState) => state.error;
export const getCreateSuccess = (state: PrincipalRemarkState) => state.createSuccess;
export const getUpdateSuccess = (state: PrincipalRemarkState) => state.updateSuccess;
export const getDeleteSuccess = (state: PrincipalRemarkState) => state.deleteSuccess;
