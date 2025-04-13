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
  pageQuery: PageQueryInterface | null;
  administratorById: AdministratorListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AdministratorState = {
  administratorList: null,
  pageQuery: null,
  administratorById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(AdministratorAction.getAdministratorList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(AdministratorAction.getAdministratorListSuccess, (state, action) => {
    return {
      ...state,
      administratorList: action.payload?.entity,
      loading: false,
    };
  }),
  on(AdministratorAction.getAdministratorListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getAdministratorList = (state: AdministratorState) => state.administratorList;

export const getAdministratorById = (state: AdministratorState) => state.administratorById;

export const getLoading = (state: AdministratorState) => state.loading;

export const getError = (state: AdministratorState) => state.error;

export const selectAdministratorState =
  createFeatureSelector<AdministratorState>(administratorFeatureKey);
