import { createSelector } from '@ngrx/store';
import {
  getFeeSetupAll,
  getFeeSetupList,
  getFeeSetupById,
  getLoading,
  getError,
  getCreateSuccess,
  getUpdateSuccess,
  getDeleteSuccess,
  FeeSetupState,
} from './fee-setup.reducer';

export const selectFeeSetupState = (state: { feeSetup: FeeSetupState }) => state.feeSetup;

export const selectFeeSetupAll = createSelector(selectFeeSetupState, getFeeSetupAll);
export const selectFeeSetupList = createSelector(selectFeeSetupState, getFeeSetupList);
export const selectFeeSetupById = createSelector(selectFeeSetupState, getFeeSetupById);
export const selectFeeSetupLoading = createSelector(selectFeeSetupState, getLoading);
export const selectFeeSetupError = createSelector(selectFeeSetupState, getError);
export const selectFeeSetupCreateSuccess = createSelector(selectFeeSetupState, getCreateSuccess);
export const selectFeeSetupUpdateSuccess = createSelector(selectFeeSetupState, getUpdateSuccess);
export const selectFeeSetupDeleteSuccess = createSelector(selectFeeSetupState, getDeleteSuccess);
