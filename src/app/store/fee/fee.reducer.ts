import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as FeeAction from './fee.actions';
import { FeeListInterface } from '../../types/fee';
import { PaginatedResponseInterface } from '../../types';

export const feeFeatureKey = 'fee';

export interface FeeState {
  feeAll: FeeListInterface[] | null;
  feeList: PaginatedResponseInterface<FeeListInterface[]> | null;
  feeByProperties: FeeListInterface[] | null;
  loading: boolean;
  generating: boolean;
  generateSuccess: boolean;
  error: string | null;
}

export const initialState: FeeState = {
  feeAll: null,
  feeList: null,
  feeByProperties: null,
  loading: false,
  generating: false,
  generateSuccess: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(FeeAction.getFeeAll, (state) => ({ ...state, loading: true, error: null })),
  on(FeeAction.getFeeAllSuccess, (state, { payload }) => ({ ...state, feeAll: payload.entity, loading: false })),
  on(FeeAction.getFeeAllFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(FeeAction.getFeeList, (state) => ({ ...state, loading: true, error: null })),
  on(FeeAction.getFeeListSuccess, (state, { payload }) => ({ ...state, feeList: payload.entity, loading: false })),
  on(FeeAction.getFeeListFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(FeeAction.getFeeByProperties, (state) => ({ ...state, loading: true, error: null })),
  on(FeeAction.getFeeByPropertiesSuccess, (state, { payload }) => ({ ...state, feeByProperties: payload.entity, loading: false })),
  on(FeeAction.getFeeByPropertiesFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(FeeAction.generateFeesByTermSession, (state) => ({ ...state, generating: true, generateSuccess: false, error: null })),
  on(FeeAction.generateFeesByTermSessionSuccess, (state) => ({ ...state, generating: false, generateSuccess: true })),
  on(FeeAction.generateFeesByTermSessionFail, (state, { error }) => ({ ...state, generating: false, error })),

  on(FeeAction.generateFeesBySessionAndTerm, (state) => ({ ...state, generating: true, generateSuccess: false, error: null })),
  on(FeeAction.generateFeesBySessionAndTermSuccess, (state) => ({ ...state, generating: false, generateSuccess: true })),
  on(FeeAction.generateFeesBySessionAndTermFail, (state, { error }) => ({ ...state, generating: false, error })),

  on(FeeAction.generateFeesByTermSessionForStudent, (state) => ({ ...state, generating: true, generateSuccess: false, error: null })),
  on(FeeAction.generateFeesByTermSessionForStudentSuccess, (state) => ({ ...state, generating: false, generateSuccess: true })),
  on(FeeAction.generateFeesByTermSessionForStudentFail, (state, { error }) => ({ ...state, generating: false, error })),

  on(FeeAction.generateFeesBySessionAndTermForStudent, (state) => ({ ...state, generating: true, generateSuccess: false, error: null })),
  on(FeeAction.generateFeesBySessionAndTermForStudentSuccess, (state) => ({ ...state, generating: false, generateSuccess: true })),
  on(FeeAction.generateFeesBySessionAndTermForStudentFail, (state, { error }) => ({ ...state, generating: false, error })),
);

export const selectFeeState = createFeatureSelector<FeeState>(feeFeatureKey);

export const getFeeAll = (state: FeeState) => state.feeAll;
export const getFeeList = (state: FeeState) => state.feeList;
export const getFeeByProperties = (state: FeeState) => state.feeByProperties;
export const getLoading = (state: FeeState) => state.loading;
export const getGenerating = (state: FeeState) => state.generating;
export const getGenerateSuccess = (state: FeeState) => state.generateSuccess;
export const getError = (state: FeeState) => state.error;
