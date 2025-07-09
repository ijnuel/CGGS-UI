import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ApplicationAction from './application.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ApplicationListInterface,
} from '../../types';

export const applicationFeatureKey = 'application';

export interface ApplicationState {
  applicationList: PaginatedResponseInterface<ApplicationListInterface[]> | null;
  applicationAll: ApplicationListInterface[] | null;
  applicationByProperties: ApplicationListInterface[] | null;
  applicationById: ApplicationListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: ApplicationState = {
  applicationList: null,
  applicationAll: null,
  applicationByProperties: null,
  applicationById: null,
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
  on(ApplicationAction.getApplicationAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ApplicationAction.getApplicationAllSuccess, (state, { payload }) => ({
    ...state,
    applicationAll: payload.entity,
    loading: false,
  })),
  on(ApplicationAction.getApplicationAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(ApplicationAction.getApplicationList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(ApplicationAction.getApplicationListSuccess, (state, { payload }) => ({
    ...state,
    applicationList: payload.entity,
    loading: false,
  })),
  on(ApplicationAction.getApplicationListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(ApplicationAction.getApplicationById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ApplicationAction.getApplicationByIdSuccess, (state, { payload }) => ({
    ...state,
    applicationById: payload.entity,
    loading: false,
  })),
  on(ApplicationAction.getApplicationByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(ApplicationAction.getApplicationByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ApplicationAction.getApplicationByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    applicationByProperties: payload.entity,
    loading: false,
  })),
  on(ApplicationAction.getApplicationByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(ApplicationAction.applicationExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ApplicationAction.applicationExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(ApplicationAction.applicationExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(ApplicationAction.applicationCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ApplicationAction.applicationCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(ApplicationAction.applicationCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(ApplicationAction.createApplication, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(ApplicationAction.createApplicationSuccess, (state, { payload }) => ({
    ...state,
    applicationList: state.applicationList
      ? {
          ...state.applicationList,
          data: [...state.applicationList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(ApplicationAction.createApplicationFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(ApplicationAction.updateApplication, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(ApplicationAction.updateApplicationSuccess, (state, { payload }) => ({
    ...state,
    applicationList: state.applicationList
      ? {
          ...state.applicationList,
          data: state.applicationList.data.map((item: ApplicationListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    applicationById:
      state.applicationById?.id === payload.entity.id
        ? payload.entity
        : state.applicationById,
    loading: false,
    updateSuccess: true,
  })),
  on(ApplicationAction.updateApplicationFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(ApplicationAction.deleteApplication, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ApplicationAction.deleteApplicationSuccess, (state) => ({
    ...state,
    applicationById: null,
    applicationList: state.applicationList
      ? {
          ...state.applicationList,
          data: state.applicationList.data.filter((item) => item.id !== state.applicationById?.id),
        }
      : null,
    loading: false,
  })),
  on(ApplicationAction.deleteApplicationFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(ApplicationAction.createManyApplications, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ApplicationAction.createManyApplicationsSuccess, (state, { payload }) => ({
    ...state,
    applicationList: state.applicationList
      ? {
          ...state.applicationList,
          data: [...state.applicationList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(ApplicationAction.createManyApplicationsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(ApplicationAction.updateManyApplications, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ApplicationAction.updateManyApplicationsSuccess, (state, { payload }) => ({
    ...state,
    applicationList: state.applicationList
      ? {
          ...state.applicationList,
          data: state.applicationList.data.map((item: ApplicationListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(ApplicationAction.updateManyApplicationsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(ApplicationAction.deleteManyApplications, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ApplicationAction.deleteManyApplicationsSuccess, (state) => ({
    ...state,
    applicationList: null,
    loading: false,
  })),
  on(ApplicationAction.deleteManyApplicationsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectApplicationState = createFeatureSelector<ApplicationState>(
  applicationFeatureKey
);

export const getApplicationList = (state: ApplicationState) => state.applicationList;
export const getApplicationAll = (state: ApplicationState) => state.applicationAll;
export const getApplicationByProperties = (state: ApplicationState) =>
  state.applicationByProperties;
export const getApplicationById = (state: ApplicationState) => state.applicationById;
export const getExists = (state: ApplicationState) => state.exists;
export const getCount = (state: ApplicationState) => state.count;
export const getLoading = (state: ApplicationState) => state.loading;
export const getError = (state: ApplicationState) => state.error;
export const getCreateSuccess = (state: ApplicationState) => state.createSuccess;
export const getUpdateSuccess = (state: ApplicationState) => state.updateSuccess;
