import { createSelector } from '@ngrx/store';
import {
  getRefundAll,
  getLoading,
  getActionLoading,
  getError,
  RefundState,
} from './refund.reducer';

export const selectRefundState = (state: { refund: RefundState }) => state.refund;

export const selectRefundAll = createSelector(selectRefundState, getRefundAll);
export const selectRefundLoading = createSelector(selectRefundState, getLoading);
export const selectRefundActionLoading = createSelector(selectRefundState, getActionLoading);
export const selectRefundError = createSelector(selectRefundState, getError);
