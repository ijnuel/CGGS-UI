import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as RefundAction from './refund.actions';
import { RefundInterface } from '../../types/refund';

export const refundFeatureKey = 'refund';

export interface RefundState {
  refundAll: RefundInterface[] | null;
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
}

export const initialState: RefundState = {
  refundAll: null,
  loading: false,
  actionLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(RefundAction.getRefundAll, (state) => ({ ...state, loading: true, error: null })),
  on(RefundAction.getRefundAllSuccess, (state, { payload }) => ({
    ...state,
    refundAll: payload.entity,
    loading: false,
  })),
  on(RefundAction.getRefundAllFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(RefundAction.processRefund, (state) => ({ ...state, actionLoading: true, error: null })),
  on(RefundAction.processRefundSuccess, (state) => ({ ...state, actionLoading: false })),
  on(RefundAction.processRefundFail, (state, { error }) => ({ ...state, actionLoading: false, error })),

  on(RefundAction.rejectRefund, (state) => ({ ...state, actionLoading: true, error: null })),
  on(RefundAction.rejectRefundSuccess, (state) => ({ ...state, actionLoading: false })),
  on(RefundAction.rejectRefundFail, (state, { error }) => ({ ...state, actionLoading: false, error }))
);

export const selectRefundState = createFeatureSelector<RefundState>(refundFeatureKey);

export const getRefundAll = (state: RefundState) => state.refundAll;
export const getLoading = (state: RefundState) => state.loading;
export const getActionLoading = (state: RefundState) => state.actionLoading;
export const getError = (state: RefundState) => state.error;
