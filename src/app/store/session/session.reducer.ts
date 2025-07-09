import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as SessionAction from './session.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  SessionListInterface,
} from '../../types';

export const sessionFeatureKey = 'session';

export interface SessionState {
  sessionList: PaginatedResponseInterface<SessionListInterface[]> | null;
  sessionAll: SessionListInterface[] | null;
  sessionByProperties: SessionListInterface[] | null;
  sessionById: SessionListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: SessionState = {
  sessionList: null,
  sessionAll: null,
  sessionByProperties: null,
  sessionById: null,
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
  on(SessionAction.getSessionAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SessionAction.getSessionAllSuccess, (state, { payload }) => ({
    ...state,
    sessionAll: payload.entity,
    loading: false,
  })),
  on(SessionAction.getSessionAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(SessionAction.getSessionList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(SessionAction.getSessionListSuccess, (state, { payload }) => ({
    ...state,
    sessionList: payload.entity,
    loading: false,
  })),
  on(SessionAction.getSessionListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(SessionAction.getSessionById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SessionAction.getSessionByIdSuccess, (state, { payload }) => ({
    ...state,
    sessionById: payload.entity,
    loading: false,
  })),
  on(SessionAction.getSessionByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(SessionAction.getSessionByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SessionAction.getSessionByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    sessionByProperties: payload.entity,
    loading: false,
  })),
  on(SessionAction.getSessionByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(SessionAction.sessionExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SessionAction.sessionExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(SessionAction.sessionExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(SessionAction.sessionCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SessionAction.sessionCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(SessionAction.sessionCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(SessionAction.createSession, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(SessionAction.createSessionSuccess, (state, { payload }) => ({
    ...state,
    sessionList: state.sessionList
      ? {
          ...state.sessionList,
          data: [...state.sessionList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(SessionAction.createSessionFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(SessionAction.updateSession, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(SessionAction.updateSessionSuccess, (state, { payload }) => ({
    ...state,
    sessionList: state.sessionList
      ? {
          ...state.sessionList,
          data: state.sessionList.data.map((item: SessionListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    sessionById:
      state.sessionById?.id === payload.entity.id
        ? payload.entity
        : state.sessionById,
    loading: false,
    updateSuccess: true,
  })),
  on(SessionAction.updateSessionFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(SessionAction.deleteSession, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SessionAction.deleteSessionSuccess, (state) => ({
    ...state,
    sessionById: null,
    sessionList: state.sessionList
      ? {
          ...state.sessionList,
          data: state.sessionList.data.filter((item) => item.id !== state.sessionById?.id),
        }
      : null,
    loading: false,
  })),
  on(SessionAction.deleteSessionFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(SessionAction.createManySessions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SessionAction.createManySessionsSuccess, (state, { payload }) => ({
    ...state,
    sessionList: state.sessionList
      ? {
          ...state.sessionList,
          data: [...state.sessionList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(SessionAction.createManySessionsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(SessionAction.updateManySessions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SessionAction.updateManySessionsSuccess, (state, { payload }) => ({
    ...state,
    sessionList: state.sessionList
      ? {
          ...state.sessionList,
          data: state.sessionList.data.map((item: SessionListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(SessionAction.updateManySessionsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(SessionAction.deleteManySessions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SessionAction.deleteManySessionsSuccess, (state) => ({
    ...state,
    sessionList: null,
    loading: false,
  })),
  on(SessionAction.deleteManySessionsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectSessionState = createFeatureSelector<SessionState>(
  sessionFeatureKey
);

export const getSessionList = (state: SessionState) => state.sessionList;
export const getSessionAll = (state: SessionState) => state.sessionAll;
export const getSessionByProperties = (state: SessionState) =>
  state.sessionByProperties;
export const getSessionById = (state: SessionState) => state.sessionById;
export const getExists = (state: SessionState) => state.exists;
export const getCount = (state: SessionState) => state.count;
export const getLoading = (state: SessionState) => state.loading;
export const getError = (state: SessionState) => state.error;
export const getCreateSuccess = (state: SessionState) => state.createSuccess;
export const getUpdateSuccess = (state: SessionState) => state.updateSuccess;
