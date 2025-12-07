import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as AdministratorAction from './administrator.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  AdministratorListInterface,
} from '../../types';

export const administratorFeatureKey = 'administrator';

export interface AdministratorState {
  administratorList: PaginatedResponseInterface<AdministratorListInterface[]> | null;
  administratorAll: AdministratorListInterface[] | null;
  administratorByProperties: AdministratorListInterface[] | null;
  administratorById: AdministratorListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: AdministratorState = {
  administratorList: null,
  administratorAll: null,
  administratorByProperties: null,
  administratorById: null,
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
  on(AdministratorAction.getAdministratorAll, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(AdministratorAction.getAdministratorAllSuccess, (state, { payload }) => ({
    ...state,
    administratorAll: payload.entity,
    loading: false,
  })),
  on(AdministratorAction.getAdministratorAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(AdministratorAction.getAdministratorList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(AdministratorAction.getAdministratorListSuccess, (state, { payload }) => ({
    ...state,
    administratorList: payload.entity,
    loading: false,
  })),
  on(AdministratorAction.getAdministratorListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(AdministratorAction.getAdministratorById, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(AdministratorAction.getAdministratorByIdSuccess, (state, { payload }) => ({
    ...state,
    administratorById: payload.entity,
    loading: false,
  })),
  on(AdministratorAction.getAdministratorByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(AdministratorAction.getAdministratorByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(AdministratorAction.getAdministratorByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    administratorByProperties: payload.entity,
    loading: false,
  })),
  on(AdministratorAction.getAdministratorByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(AdministratorAction.administratorExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AdministratorAction.administratorExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(AdministratorAction.administratorExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(AdministratorAction.administratorCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AdministratorAction.administratorCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(AdministratorAction.administratorCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(AdministratorAction.createAdministrator, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(AdministratorAction.createAdministratorSuccess, (state, { payload }) => ({
    ...state,
    administratorList: state.administratorList
      ? {
          ...state.administratorList,
          data: [...state.administratorList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(AdministratorAction.createAdministratorFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(AdministratorAction.updateAdministrator, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(AdministratorAction.updateAdministratorSuccess, (state, { payload }) => ({
    ...state,
    administratorList: state.administratorList
      ? {
          ...state.administratorList,
          data: state.administratorList.data.map((item: AdministratorListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    administratorById:
      state.administratorById?.id === payload.entity.id
        ? payload.entity
        : state.administratorById,
    loading: false,
    updateSuccess: true,
  })),
  on(AdministratorAction.updateAdministratorFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(AdministratorAction.deleteAdministrator, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AdministratorAction.deleteAdministratorSuccess, (state) => ({
    ...state,
    administratorById: null,
    administratorList: state.administratorList
      ? {
          ...state.administratorList,
          data: state.administratorList.data.filter((item) => item.id !== state.administratorById?.id),
        }
      : null,
    loading: false,
  })),
  on(AdministratorAction.deleteAdministratorFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(AdministratorAction.createManyAdministrators, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AdministratorAction.createManyAdministratorsSuccess, (state, { payload }) => ({
    ...state,
    administratorList: state.administratorList
      ? {
          ...state.administratorList,
          data: [...state.administratorList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(AdministratorAction.createManyAdministratorsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(AdministratorAction.updateManyAdministrators, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AdministratorAction.updateManyAdministratorsSuccess, (state, { payload }) => ({
    ...state,
    administratorList: state.administratorList
      ? {
          ...state.administratorList,
          data: state.administratorList.data.map((item: AdministratorListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(AdministratorAction.updateManyAdministratorsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(AdministratorAction.deleteManyAdministrators, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AdministratorAction.deleteManyAdministratorsSuccess, (state) => ({
    ...state,
    administratorList: null,
    loading: false,
  })),
  on(AdministratorAction.deleteManyAdministratorsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectAdministratorState = createFeatureSelector<AdministratorState>(
  administratorFeatureKey
);

export const getAdministratorList = (state: AdministratorState) => state.administratorList;
export const getAdministratorAll = (state: AdministratorState) => state.administratorAll;
export const getAdministratorByProperties = (state: AdministratorState) =>
  state.administratorByProperties;
export const getAdministratorById = (state: AdministratorState) => state.administratorById;
export const getExists = (state: AdministratorState) => state.exists;
export const getCount = (state: AdministratorState) => state.count;
export const getLoading = (state: AdministratorState) => state.loading;
export const getError = (state: AdministratorState) => state.error;
export const getCreateSuccess = (state: AdministratorState) => state.createSuccess;
export const getUpdateSuccess = (state: AdministratorState) => state.updateSuccess;
