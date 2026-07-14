import { createSelector } from '@ngrx/store';
import {
  getFeeAll,
  getFeeLineAll,
  getFeeList,
  getFeeByProperties,
  getLoading,
  getGenerating,
  getGenerateSuccess,
  getError,
  FeeState,
} from './fee.reducer';

export const selectFeeState = (state: { fee: FeeState }) => state.fee;

export const selectFeeAll = createSelector(selectFeeState, getFeeAll);
export const selectFeeLineAll = createSelector(selectFeeState, getFeeLineAll);
export const selectFeeList = createSelector(selectFeeState, getFeeList);
export const selectFeeByProperties = createSelector(selectFeeState, getFeeByProperties);
export const selectFeeLoading = createSelector(selectFeeState, getLoading);
export const selectFeeGenerating = createSelector(selectFeeState, getGenerating);
export const selectFeeGenerateSuccess = createSelector(selectFeeState, getGenerateSuccess);
export const selectFeeError = createSelector(selectFeeState, getError);
