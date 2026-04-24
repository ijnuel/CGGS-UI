import { createSelector } from '@ngrx/store';
import { getPaymentList, getLoading, getError, PaymentState } from './payment.reducer';

export const selectPaymentState = (state: { payment: PaymentState }) => state.payment;

export const selectPaymentList = createSelector(selectPaymentState, getPaymentList);
export const selectPaymentLoading = createSelector(selectPaymentState, getLoading);
export const selectPaymentError = createSelector(selectPaymentState, getError);
