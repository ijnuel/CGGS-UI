import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as FeeTypeAction from './fee-type.actions';
import { FeeTypeListInterface } from '../../types/fee';
import { PaginatedResponseInterface } from '../../types';

export const feeTypeFeatureKey = 'feeType';

export interface FeeTypeState {
  feeTypeAll: FeeTypeListInterface[] | null;
  feeTypeList: PaginatedResponseInterface<FeeTypeListInterface[]> | null;
  feeTypeById: FeeTypeListInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
}

export const initialState: FeeTypeState = {
  feeTypeAll: null,
  feeTypeList: null,
  feeTypeById: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

export const reducer = createReducer(
  initialState,

  // Invalidate Cache
  on(FeeTypeAction.invalidateCache, (state) => ({ ...state, loading: true, error: null })),
  on(FeeTypeAction.invalidateCacheSuccess, () => ({ ...initialState })),
  on(FeeTypeAction.invalidateCacheFail, (state, { error }) => ({ ...state, loading: false, error })),

  // Get All
  on(FeeTypeAction.getFeeTypeAll, (state) => ({ ...state, loading: true, error: null })),
  on(FeeTypeAction.getFeeTypeAllSuccess, (state, { payload }) => ({ ...state, feeTypeAll: payload.entity, loading: false })),
  on(FeeTypeAction.getFeeTypeAllFail, (state, { error }) => ({ ...state, loading: false, error })),

  // Get List (paginated)
  on(FeeTypeAction.getFeeTypeList, (state) => ({ ...state, loading: true, error: null, createSuccess: false, updateSuccess: false, deleteSuccess: false })),
  on(FeeTypeAction.getFeeTypeListSuccess, (state, { payload }) => ({ ...state, feeTypeList: payload.entity, loading: false })),
  on(FeeTypeAction.getFeeTypeListFail, (state, { error }) => ({ ...state, loading: false, error })),

  // Get By Id
  on(FeeTypeAction.getFeeTypeById, (state) => ({ ...state, loading: true, error: null, createSuccess: false, updateSuccess: false })),
  on(FeeTypeAction.getFeeTypeByIdSuccess, (state, { payload }) => ({ ...state, feeTypeById: payload.entity, loading: false })),
  on(FeeTypeAction.getFeeTypeByIdFail, (state, { error }) => ({ ...state, loading: false, error })),

  // Create
  on(FeeTypeAction.createFeeType, (state) => ({ ...state, loading: true, error: null, createSuccess: false })),
  on(FeeTypeAction.createFeeTypeSuccess, (state) => ({ ...state, loading: false, createSuccess: true })),
  on(FeeTypeAction.createFeeTypeFail, (state, { error }) => ({ ...state, loading: false, error, createSuccess: false })),

  // Update
  on(FeeTypeAction.updateFeeType, (state) => ({ ...state, loading: true, error: null, updateSuccess: false })),
  on(FeeTypeAction.updateFeeTypeSuccess, (state) => ({ ...state, loading: false, updateSuccess: true })),
  on(FeeTypeAction.updateFeeTypeFail, (state, { error }) => ({ ...state, loading: false, error, updateSuccess: false })),

  // Delete
  on(FeeTypeAction.deleteFeeType, (state) => ({ ...state, loading: true, error: null, deleteSuccess: false })),
  on(FeeTypeAction.deleteFeeTypeSuccess, (state) => ({ ...state, loading: false, deleteSuccess: true })),
  on(FeeTypeAction.deleteFeeTypeFail, (state, { error }) => ({ ...state, loading: false, error, deleteSuccess: false })),
);

export const selectFeeTypeState = createFeatureSelector<FeeTypeState>(feeTypeFeatureKey);

export const getFeeTypeAll = (state: FeeTypeState) => state.feeTypeAll;
export const getFeeTypeList = (state: FeeTypeState) => state.feeTypeList;
export const getFeeTypeById = (state: FeeTypeState) => state.feeTypeById;
export const getLoading = (state: FeeTypeState) => state.loading;
export const getError = (state: FeeTypeState) => state.error;
export const getCreateSuccess = (state: FeeTypeState) => state.createSuccess;
export const getUpdateSuccess = (state: FeeTypeState) => state.updateSuccess;
export const getDeleteSuccess = (state: FeeTypeState) => state.deleteSuccess;
