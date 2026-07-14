import { createReducer, on } from '@ngrx/store';
import { PaginatedResponseInterface, PageQueryInterface } from '../../types';
import { CompanyCoreValueListInterface } from '../../types/company-core-value';
import * as CompanyCoreValueActions from './company-core-value.actions';

export const companyCoreValueFeatureKey = 'companyCoreValue';

export interface CompanyCoreValueState {
  companyCoreValueList: PaginatedResponseInterface<CompanyCoreValueListInterface[]> | null;
  companyCoreValueAll: CompanyCoreValueListInterface[] | null;
  companyCoreValueById: CompanyCoreValueListInterface | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

const initialState: CompanyCoreValueState = {
  companyCoreValueList: null,
  companyCoreValueAll: null,
  companyCoreValueById: null,
  pageQuery: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
};

export const reducer = createReducer(
  initialState,

  on(CompanyCoreValueActions.getCompanyCoreValueAll, (state) => ({ ...state, loading: true, error: null })),
  on(CompanyCoreValueActions.getCompanyCoreValueAllSuccess, (state, { payload }) => ({ ...state, loading: false, companyCoreValueAll: payload.entity })),
  on(CompanyCoreValueActions.getCompanyCoreValueAllFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(CompanyCoreValueActions.getCompanyCoreValueList, (state, { pageQuery }) => ({ ...state, loading: true, error: null, pageQuery })),
  on(CompanyCoreValueActions.getCompanyCoreValueListSuccess, (state, { payload }) => ({ ...state, loading: false, companyCoreValueList: payload.entity })),
  on(CompanyCoreValueActions.getCompanyCoreValueListFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(CompanyCoreValueActions.getCompanyCoreValueById, (state) => ({ ...state, loading: true, error: null, companyCoreValueById: null })),
  on(CompanyCoreValueActions.getCompanyCoreValueByIdSuccess, (state, { payload }) => ({ ...state, loading: false, companyCoreValueById: payload.entity })),
  on(CompanyCoreValueActions.getCompanyCoreValueByIdFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(CompanyCoreValueActions.createCompanyCoreValue, (state) => ({ ...state, loading: true, error: null, createSuccess: false })),
  on(CompanyCoreValueActions.createCompanyCoreValueSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    createSuccess: true,
    companyCoreValueList: state.companyCoreValueList
      ? { ...state.companyCoreValueList, data: [payload.entity, ...(state.companyCoreValueList.data ?? [])] }
      : null,
  })),
  on(CompanyCoreValueActions.createCompanyCoreValueFail, (state, { error }) => ({ ...state, loading: false, error, createSuccess: false })),

  on(CompanyCoreValueActions.updateCompanyCoreValue, (state) => ({ ...state, loading: true, error: null, updateSuccess: false })),
  on(CompanyCoreValueActions.updateCompanyCoreValueSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    updateSuccess: true,
    companyCoreValueById: payload.entity,
    companyCoreValueList: state.companyCoreValueList
      ? { ...state.companyCoreValueList, data: (state.companyCoreValueList.data ?? []).map(i => i.id === payload.entity.id ? payload.entity : i) }
      : null,
  })),
  on(CompanyCoreValueActions.updateCompanyCoreValueFail, (state, { error }) => ({ ...state, loading: false, error, updateSuccess: false })),

  on(CompanyCoreValueActions.deleteCompanyCoreValue, (state) => ({ ...state, loading: true, error: null })),
  on(CompanyCoreValueActions.deleteCompanyCoreValueSuccess, (state) => ({ ...state, loading: false, companyCoreValueById: null })),
  on(CompanyCoreValueActions.deleteCompanyCoreValueFail, (state, { error }) => ({ ...state, loading: false, error })),
);

export const getCompanyCoreValueList = (state: CompanyCoreValueState) => state.companyCoreValueList;
export const getCompanyCoreValueAll = (state: CompanyCoreValueState) => state.companyCoreValueAll;
export const getCompanyCoreValueById = (state: CompanyCoreValueState) => state.companyCoreValueById;
export const getLoading = (state: CompanyCoreValueState) => state.loading;
export const getError = (state: CompanyCoreValueState) => state.error;
export const getCreateSuccess = (state: CompanyCoreValueState) => state.createSuccess;
export const getUpdateSuccess = (state: CompanyCoreValueState) => state.updateSuccess;
