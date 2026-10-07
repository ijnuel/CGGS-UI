import { createSelector } from '@ngrx/store';
import {
  getWalletTransactionAll,
  getLoading,
  getError,
  WalletTransactionState,
} from './wallet-transaction.reducer';

export const selectWalletTransactionState = (state: {
  walletTransaction: WalletTransactionState;
}) => state.walletTransaction;

export const selectWalletTransactionAll = createSelector(
  selectWalletTransactionState,
  getWalletTransactionAll
);
export const selectWalletTransactionLoading = createSelector(
  selectWalletTransactionState,
  getLoading
);
export const selectWalletTransactionError = createSelector(
  selectWalletTransactionState,
  getError
);
