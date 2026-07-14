import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as TransactionAction from './transaction.actions';
import { TransactionListInterface } from '../../types/transaction';
import { PaginatedResponseInterface } from '../../types';

export const transactionFeatureKey = 'transaction';

export interface TransactionState {
  transactionAll: TransactionListInterface[] | null;
  transactionList: PaginatedResponseInterface<TransactionListInterface[]> | null;
  transactionById: TransactionListInterface | null;
  loading: boolean;
  verifying: boolean;
  error: string | null;
}

export const initialState: TransactionState = {
  transactionAll: null,
  transactionList: null,
  transactionById: null,
  loading: false,
  verifying: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(TransactionAction.getTransactionAll, (state) => ({ ...state, error: null })),
  on(TransactionAction.getTransactionAllSuccess, (state, { payload }) => ({ ...state, transactionAll: payload.entity })),
  on(TransactionAction.getTransactionAllFail, (state, { error }) => ({ ...state, error })),

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

export const getTransactionAll = (state: TransactionState) => state.transactionAll;
export const getTransactionList = (state: TransactionState) => state.transactionList;
export const getTransactionById = (state: TransactionState) => state.transactionById;
export const getLoading = (state: TransactionState) => state.loading;
export const getVerifying = (state: TransactionState) => state.verifying;
export const getError = (state: TransactionState) => state.error;
