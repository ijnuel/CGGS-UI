import { createSelector } from '@ngrx/store';
import { getTransactionAll, getTransactionList, getTransactionById, getLoading, getVerifying, getError, TransactionState } from './transaction.reducer';

export const selectTransactionState = (state: { transaction: TransactionState }) => state.transaction;

export const selectTransactionAll = createSelector(selectTransactionState, getTransactionAll);
export const selectTransactionList = createSelector(selectTransactionState, getTransactionList);
export const selectTransactionById = createSelector(selectTransactionState, getTransactionById);
export const selectTransactionLoading = createSelector(selectTransactionState, getLoading);
export const selectTransactionVerifying = createSelector(selectTransactionState, getVerifying);
export const selectTransactionError = createSelector(selectTransactionState, getError);
