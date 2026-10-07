import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WalletTransactionInterface } from '../../types/wallet-transaction';
import { QueryInterface } from '../../types';
import * as WalletTransactionAction from './wallet-transaction.actions';
import {
  selectWalletTransactionAll,
  selectWalletTransactionLoading,
  selectWalletTransactionError,
} from './wallet-transaction.selector';
import { WalletTransactionState } from './wallet-transaction.reducer';

@Injectable({ providedIn: 'root' })
export class WalletTransactionFacade {
  walletTransactionAll$: Observable<WalletTransactionInterface[] | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ walletTransaction: WalletTransactionState }>) {
    this.walletTransactionAll$ = this.store.select(selectWalletTransactionAll);
    this.loading$ = this.store.select(selectWalletTransactionLoading);
    this.error$ = this.store.select(selectWalletTransactionError);
  }

  getWalletTransactionAll(query: QueryInterface): void {
    this.store.dispatch(WalletTransactionAction.getWalletTransactionAll({ query }));
  }
}
