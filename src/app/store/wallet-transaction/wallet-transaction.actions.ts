import { createAction, props } from '@ngrx/store';
import { GenericResponseInterface, QueryInterface } from '../../types';
import { WalletTransactionInterface } from '../../types/wallet-transaction';

export const getWalletTransactionAll = createAction(
  '[WalletTransaction] Get All',
  props<{ query: QueryInterface }>()
);
export const getWalletTransactionAllSuccess = createAction(
  '[WalletTransaction/API] Get All Success',
  props<{ payload: GenericResponseInterface<WalletTransactionInterface[]> }>()
);
export const getWalletTransactionAllFail = createAction(
  '[WalletTransaction/API] Get All Fail',
  props<{ error: string }>()
);
