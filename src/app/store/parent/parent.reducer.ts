import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ParentAction from './parent.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ParentListInterface,
} from '../../types';

export const parentFeatureKey = 'parent';

export interface ParentState {
  parentList: PaginatedResponseInterface<ParentListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  parentById: ParentListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ParentState = {
  parentList: null,
  pageQuery: null,
  parentById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ParentAction.getParentList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(ParentAction.getParentListSuccess, (state, action) => {
    return {
      ...state,
      parentList: action.payload?.entity,
      loading: false,
    };
  }),
  on(ParentAction.getParentListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getParentList = (state: ParentState) => state.parentList;

export const getParentById = (state: ParentState) => state.parentById;

export const getLoading = (state: ParentState) => state.loading;

export const getError = (state: ParentState) => state.error;

export const selectParentState =
  createFeatureSelector<ParentState>(parentFeatureKey);
