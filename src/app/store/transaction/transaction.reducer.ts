import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as TransactionAction from './transaction.actions';
import { TransactionListInterface } from '../../types/transaction';
import { PaginatedResponseInterface } from '../../types';

export const transactionFeatureKey = 'transaction';

export interface TransactionState {
  transactionList: PaginatedResponseInterface<TransactionListInterface[]> | null;
  transactionById: TransactionListInterface | null;
  loading: boolean;
  verifying: boolean;
  error: string | null;
}

export const initialState: TransactionState = {
  transactionList: null,
  transactionById: null,
  loading: false,
  verifying: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(TransactionAction.getTransactionList, (state) => ({ ...state, loading: true, error: null })),
  on(TransactionAction.getTransactionListSuccess, (state, { payload }) => ({ ...state, transactionList: payload.entity, loading: false })),
  on(TransactionAction.getTransactionListFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(TransactionAction.getTransactionById, (state) => ({ ...state, loading: true, error: null })),
  on(TransactionAction.getTransactionByIdSuccess, (state, { payload }) => ({ ...state, transactionById: payload.entity, loading: false })),
  on(TransactionAction.getTransactionByIdFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(TransactionAction.verifyTransaction, (state) => ({ ...state, verifying: true, error: null })),
  on(TransactionAction.verifyTransactionSuccess, (state) => ({ ...state, verifying: false })),
  on(TransactionAction.verifyTransactionFail, (state, { error }) => ({ ...state, verifying: false, error })),
);

export const selectTransactionState = createFeatureSelector<TransactionState>(transactionFeatureKey);

export const getTransactionList = (state: TransactionState) => state.transactionList;
export const getTransactionById = (state: TransactionState) => state.transactionById;
export const getLoading = (state: TransactionState) => state.loading;
export const getVerifying = (state: TransactionState) => state.verifying;
export const getError = (state: TransactionState) => state.error;
