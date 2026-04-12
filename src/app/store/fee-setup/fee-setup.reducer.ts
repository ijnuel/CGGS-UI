import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as FeeSetupAction from './fee-setup.actions';
import { FeeSetupListInterface } from '../../types/fee';
import { PaginatedResponseInterface } from '../../types';

export const feeSetupFeatureKey = 'feeSetup';

export interface FeeSetupState {
  feeSetupAll: FeeSetupListInterface[] | null;
  feeSetupList: PaginatedResponseInterface<FeeSetupListInterface[]> | null;
  feeSetupById: FeeSetupListInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
}

export const initialState: FeeSetupState = {
  feeSetupAll: null,
  feeSetupList: null,
  feeSetupById: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

export const reducer = createReducer(
  initialState,

  on(FeeSetupAction.invalidateCache, (state) => ({ ...state, loading: true, error: null })),
  on(FeeSetupAction.invalidateCacheSuccess, () => ({ ...initialState })),
  on(FeeSetupAction.invalidateCacheFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(FeeSetupAction.getFeeSetupAll, (state) => ({ ...state, loading: true, error: null })),
  on(FeeSetupAction.getFeeSetupAllSuccess, (state, { payload }) => ({ ...state, feeSetupAll: payload.entity, loading: false })),
  on(FeeSetupAction.getFeeSetupAllFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(FeeSetupAction.getFeeSetupList, (state) => ({ ...state, loading: true, error: null, createSuccess: false, updateSuccess: false, deleteSuccess: false })),
  on(FeeSetupAction.getFeeSetupListSuccess, (state, { payload }) => ({ ...state, feeSetupList: payload.entity, loading: false })),
  on(FeeSetupAction.getFeeSetupListFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(FeeSetupAction.getFeeSetupById, (state) => ({ ...state, loading: true, error: null, createSuccess: false, updateSuccess: false })),
  on(FeeSetupAction.getFeeSetupByIdSuccess, (state, { payload }) => ({ ...state, feeSetupById: payload.entity, loading: false })),
  on(FeeSetupAction.getFeeSetupByIdFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(FeeSetupAction.createFeeSetup, (state) => ({ ...state, loading: true, error: null, createSuccess: false })),
  on(FeeSetupAction.createFeeSetupSuccess, (state) => ({ ...state, loading: false, createSuccess: true })),
  on(FeeSetupAction.createFeeSetupFail, (state, { error }) => ({ ...state, loading: false, error, createSuccess: false })),

  on(FeeSetupAction.updateFeeSetup, (state) => ({ ...state, loading: true, error: null, updateSuccess: false })),
  on(FeeSetupAction.updateFeeSetupSuccess, (state) => ({ ...state, loading: false, updateSuccess: true })),
  on(FeeSetupAction.updateFeeSetupFail, (state, { error }) => ({ ...state, loading: false, error, updateSuccess: false })),

  on(FeeSetupAction.deleteFeeSetup, (state) => ({ ...state, loading: true, error: null, deleteSuccess: false })),
  on(FeeSetupAction.deleteFeeSetupSuccess, (state) => ({ ...state, loading: false, deleteSuccess: true })),
  on(FeeSetupAction.deleteFeeSetupFail, (state, { error }) => ({ ...state, loading: false, error, deleteSuccess: false })),
);

export const selectFeeSetupState = createFeatureSelector<FeeSetupState>(feeSetupFeatureKey);

export const getFeeSetupAll = (state: FeeSetupState) => state.feeSetupAll;
export const getFeeSetupList = (state: FeeSetupState) => state.feeSetupList;
export const getFeeSetupById = (state: FeeSetupState) => state.feeSetupById;
export const getLoading = (state: FeeSetupState) => state.loading;
export const getError = (state: FeeSetupState) => state.error;
export const getCreateSuccess = (state: FeeSetupState) => state.createSuccess;
export const getUpdateSuccess = (state: FeeSetupState) => state.updateSuccess;
export const getDeleteSuccess = (state: FeeSetupState) => state.deleteSuccess;
