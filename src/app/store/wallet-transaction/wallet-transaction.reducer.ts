import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as WalletTransactionAction from './wallet-transaction.actions';
import { WalletTransactionInterface } from '../../types/wallet-transaction';

export const walletTransactionFeatureKey = 'walletTransaction';

export interface WalletTransactionState {
  walletTransactionAll: WalletTransactionInterface[] | null;
  loading: boolean;
  error: string | null;
}

export const initialState: WalletTransactionState = {
  walletTransactionAll: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(WalletTransactionAction.getWalletTransactionAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(WalletTransactionAction.getWalletTransactionAllSuccess, (state, { payload }) => ({
    ...state,
    walletTransactionAll: payload.entity,
    loading: false,
  })),
  on(WalletTransactionAction.getWalletTransactionAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectWalletTransactionState =
  createFeatureSelector<WalletTransactionState>(walletTransactionFeatureKey);

export const getWalletTransactionAll = (state: WalletTransactionState) =>
  state.walletTransactionAll;
export const getLoading = (state: WalletTransactionState) => state.loading;
export const getError = (state: WalletTransactionState) => state.error;
