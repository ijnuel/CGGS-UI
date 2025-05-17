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
  pageQuery: PageQueryInterface | null;
  familyById: FamilyListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: FamilyState = {
  familyList: null,
  pageQuery: null,
  familyById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(FamilyAction.getFamilyList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(FamilyAction.getFamilyListSuccess, (state, action) => {
    return {
      ...state,
      familyList: action.payload?.entity,
      loading: false,
    };
  }),
  on(FamilyAction.getFamilyListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getFamilyList = (state: FamilyState) => state.familyList;

export const getFamilyById = (state: FamilyState) => state.familyById;

export const getLoading = (state: FamilyState) => state.loading;

export const getError = (state: FamilyState) => state.error;

export const selectFamilyState =
  createFeatureSelector<FamilyState>(familyFeatureKey);
