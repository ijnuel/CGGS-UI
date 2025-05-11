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
  pageQuery: PageQueryInterface | null;
  sessionById: SessionListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: SessionState = {
  sessionList: null,
  pageQuery: null,
  sessionById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(SessionAction.getSessionList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(SessionAction.getSessionListSuccess, (state, action) => {
    return {
      ...state,
      sessionList: action.payload?.entity,
      loading: false,
    };
  }),
  on(SessionAction.getSessionListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getSessionList = (state: SessionState) => state.sessionList;

export const getSessionById = (state: SessionState) => state.sessionById;

export const getLoading = (state: SessionState) => state.loading;

export const getError = (state: SessionState) => state.error;

export const selectSessionState =
  createFeatureSelector<SessionState>(sessionFeatureKey);
