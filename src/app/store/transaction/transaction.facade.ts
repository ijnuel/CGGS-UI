import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TransactionListInterface } from '../../types/transaction';
import { PageQueryInterface, PaginatedResponseInterface, QueryInterface } from '../../types';
import * as TransactionAction from './transaction.actions';
import {
  selectTransactionAll,
  selectTransactionList,
  selectTransactionById,
  selectTransactionLoading,
  selectTransactionVerifying,
  selectTransactionError,
} from './transaction.selector';
import { TransactionState } from './transaction.reducer';

@Injectable({ providedIn: 'root' })
export class TransactionFacade {
  transactionAll$: Observable<TransactionListInterface[] | null>;
  transactionList$: Observable<PaginatedResponseInterface<TransactionListInterface[]> | null>;
  transactionById$: Observable<TransactionListInterface | null>;
  loading$: Observable<boolean>;
  verifying$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ transaction: TransactionState }>) {
    this.transactionAll$ = this.store.select(selectTransactionAll);
    this.transactionList$ = this.store.select(selectTransactionList);
    this.transactionById$ = this.store.select(selectTransactionById);
    this.loading$ = this.store.select(selectTransactionLoading);
    this.verifying$ = this.store.select(selectTransactionVerifying);
    this.error$ = this.store.select(selectTransactionError);
  }

  getTransactionAll(query?: QueryInterface): void {
    this.store.dispatch(TransactionAction.getTransactionAll({ query }));
  }

  getTransactionList(pageQuery: PageQueryInterface): void {
    this.store.dispatch(TransactionAction.getTransactionList({ pageQuery }));
  }

  getTransactionById(id: string): void {
    this.store.dispatch(TransactionAction.getTransactionById({ id }));
  }

  verifyTransaction(id: string): void {
    this.store.dispatch(TransactionAction.verifyTransaction({ id }));
  }
}
