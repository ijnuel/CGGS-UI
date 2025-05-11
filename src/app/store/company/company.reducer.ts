import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as CompanyAction from './company.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  CompanyListInterface,
} from '../../types';

export const companyFeatureKey = 'company';

export interface CompanyState {
  companyList: PaginatedResponseInterface<CompanyListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  companyById: CompanyListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CompanyState = {
  companyList: null,
  pageQuery: null,
  companyById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(CompanyAction.getCompanyList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(CompanyAction.getCompanyListSuccess, (state, action) => {
    return {
      ...state,
      companyList: action.payload?.entity,
      loading: false,
    };
  }),
  on(CompanyAction.getCompanyListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getCompanyList = (state: CompanyState) => state.companyList;

export const getCompanyById = (state: CompanyState) => state.companyById;

export const getLoading = (state: CompanyState) => state.loading;

export const getError = (state: CompanyState) => state.error;

export const selectCompanyState =
  createFeatureSelector<CompanyState>(companyFeatureKey);
