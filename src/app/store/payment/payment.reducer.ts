import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as PaymentAction from './payment.actions';
import { PaymentListInterface } from '../../types/fee';
import { PaginatedResponseInterface } from '../../types';

export const paymentFeatureKey = 'payment';

export interface PaymentState {
  paymentList: PaginatedResponseInterface<PaymentListInterface[]> | null;
  loading: boolean;
  error: string | null;
}

export const initialState: PaymentState = {
  paymentList: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(PaymentAction.getPaymentList, (state) => ({ ...state, loading: true, error: null })),
  on(PaymentAction.getPaymentListSuccess, (state, { payload }) => ({ ...state, paymentList: payload.entity, loading: false })),
  on(PaymentAction.getPaymentListFail, (state, { error }) => ({ ...state, loading: false, error })),
);

export const selectPaymentState = createFeatureSelector<PaymentState>(paymentFeatureKey);

export const getPaymentList = (state: PaymentState) => state.paymentList;
export const getLoading = (state: PaymentState) => state.loading;
export const getError = (state: PaymentState) => state.error;
