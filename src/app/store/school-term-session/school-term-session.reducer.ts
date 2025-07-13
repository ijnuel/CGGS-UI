import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as SchoolTermSessionAction from './school-term-session.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  SchoolTermSessionListInterface,
} from '../../types';

export const schoolTermSessionFeatureKey = 'schoolTermSession';

export interface SchoolTermSessionState {
  schoolTermSessionList: PaginatedResponseInterface<SchoolTermSessionListInterface[]> | null;
  schoolTermSessionAll: SchoolTermSessionListInterface[] | null;
  schoolTermSessionByProperties: SchoolTermSessionListInterface[] | null;
  schoolTermSessionById: SchoolTermSessionListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: SchoolTermSessionState = {
  schoolTermSessionList: null,
  schoolTermSessionAll: null,
  schoolTermSessionByProperties: null,
  schoolTermSessionById: null,
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
  on(SchoolTermSessionAction.getSchoolTermSessionAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolTermSessionAction.getSchoolTermSessionAllSuccess, (state, { payload }) => ({
    ...state,
    schoolTermSessionAll: payload.entity,
    loading: false,
  })),
  on(SchoolTermSessionAction.getSchoolTermSessionAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(SchoolTermSessionAction.getSchoolTermSessionList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(SchoolTermSessionAction.getSchoolTermSessionListSuccess, (state, { payload }) => ({
    ...state,
    schoolTermSessionList: payload.entity,
    loading: false,
  })),
  on(SchoolTermSessionAction.getSchoolTermSessionListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(SchoolTermSessionAction.getSchoolTermSessionById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolTermSessionAction.getSchoolTermSessionByIdSuccess, (state, { payload }) => ({
    ...state,
    schoolTermSessionById: payload.entity,
    loading: false,
  })),
  on(SchoolTermSessionAction.getSchoolTermSessionByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(SchoolTermSessionAction.getSchoolTermSessionByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolTermSessionAction.getSchoolTermSessionByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    schoolTermSessionByProperties: payload.entity,
    loading: false,
  })),
  on(SchoolTermSessionAction.getSchoolTermSessionByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(SchoolTermSessionAction.schoolTermSessionExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolTermSessionAction.schoolTermSessionExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(SchoolTermSessionAction.schoolTermSessionExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(SchoolTermSessionAction.schoolTermSessionCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolTermSessionAction.schoolTermSessionCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(SchoolTermSessionAction.schoolTermSessionCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(SchoolTermSessionAction.createSchoolTermSession, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(SchoolTermSessionAction.createSchoolTermSessionSuccess, (state, { payload }) => ({
    ...state,
    schoolTermSessionList: state.schoolTermSessionList
      ? {
          ...state.schoolTermSessionList,
          data: [...state.schoolTermSessionList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(SchoolTermSessionAction.createSchoolTermSessionFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(SchoolTermSessionAction.updateSchoolTermSession, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(SchoolTermSessionAction.updateSchoolTermSessionSuccess, (state, { payload }) => ({
    ...state,
    schoolTermSessionList: state.schoolTermSessionList
      ? {
          ...state.schoolTermSessionList,
          data: state.schoolTermSessionList.data.map((item: SchoolTermSessionListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    schoolTermSessionById:
      state.schoolTermSessionById?.id === payload.entity.id
        ? payload.entity
        : state.schoolTermSessionById,
    loading: false,
    updateSuccess: true,
  })),
  on(SchoolTermSessionAction.updateSchoolTermSessionFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(SchoolTermSessionAction.deleteSchoolTermSession, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolTermSessionAction.deleteSchoolTermSessionSuccess, (state) => ({
    ...state,
    schoolTermSessionById: null,
    schoolTermSessionList: state.schoolTermSessionList
      ? {
          ...state.schoolTermSessionList,
          data: state.schoolTermSessionList.data.filter((item) => item.id !== state.schoolTermSessionById?.id),
        }
      : null,
    loading: false,
  })),
  on(SchoolTermSessionAction.deleteSchoolTermSessionFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(SchoolTermSessionAction.createManySchoolTermSessions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolTermSessionAction.createManySchoolTermSessionsSuccess, (state, { payload }) => ({
    ...state,
    schoolTermSessionList: state.schoolTermSessionList
      ? {
          ...state.schoolTermSessionList,
          data: [...state.schoolTermSessionList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(SchoolTermSessionAction.createManySchoolTermSessionsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(SchoolTermSessionAction.updateManySchoolTermSessions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolTermSessionAction.updateManySchoolTermSessionsSuccess, (state, { payload }) => ({
    ...state,
    schoolTermSessionList: state.schoolTermSessionList
      ? {
          ...state.schoolTermSessionList,
          data: state.schoolTermSessionList.data.map((item: SchoolTermSessionListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(SchoolTermSessionAction.updateManySchoolTermSessionsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(SchoolTermSessionAction.deleteManySchoolTermSessions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SchoolTermSessionAction.deleteManySchoolTermSessionsSuccess, (state) => ({
    ...state,
    schoolTermSessionList: null,
    loading: false,
  })),
  on(SchoolTermSessionAction.deleteManySchoolTermSessionsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectSchoolTermSessionState = createFeatureSelector<SchoolTermSessionState>(
  schoolTermSessionFeatureKey
);

export const getSchoolTermSessionList = (state: SchoolTermSessionState) => state.schoolTermSessionList;
export const getSchoolTermSessionAll = (state: SchoolTermSessionState) => state.schoolTermSessionAll;
export const getSchoolTermSessionByProperties = (state: SchoolTermSessionState) =>
  state.schoolTermSessionByProperties;
export const getSchoolTermSessionById = (state: SchoolTermSessionState) => state.schoolTermSessionById;
export const getExists = (state: SchoolTermSessionState) => state.exists;
export const getCount = (state: SchoolTermSessionState) => state.count;
export const getLoading = (state: SchoolTermSessionState) => state.loading;
export const getError = (state: SchoolTermSessionState) => state.error;
export const getCreateSuccess = (state: SchoolTermSessionState) => state.createSuccess;
export const getUpdateSuccess = (state: SchoolTermSessionState) => state.updateSuccess;
