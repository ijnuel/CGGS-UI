import { createSelector } from '@ngrx/store';
import {
  getFeeTypeAll,
  getFeeTypeList,
  getFeeTypeById,
  getLoading,
  getError,
  getCreateSuccess,
  getUpdateSuccess,
  getDeleteSuccess,
  FeeTypeState,
} from './fee-type.reducer';

export const selectFeeTypeState = (state: { feeType: FeeTypeState }) => state.feeType;

export const selectFeeTypeAll = createSelector(selectFeeTypeState, getFeeTypeAll);
export const selectFeeTypeList = createSelector(selectFeeTypeState, getFeeTypeList);
export const selectFeeTypeById = createSelector(selectFeeTypeState, getFeeTypeById);
export const selectFeeTypeLoading = createSelector(selectFeeTypeState, getLoading);
export const selectFeeTypeError = createSelector(selectFeeTypeState, getError);
export const selectFeeTypeCreateSuccess = createSelector(selectFeeTypeState, getCreateSuccess);
export const selectFeeTypeUpdateSuccess = createSelector(selectFeeTypeState, getUpdateSuccess);
export const selectFeeTypeDeleteSuccess = createSelector(selectFeeTypeState, getDeleteSuccess);
