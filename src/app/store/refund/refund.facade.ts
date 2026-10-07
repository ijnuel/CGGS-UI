import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { RefundInterface } from '../../types/refund';
import * as RefundAction from './refund.actions';
import {
  selectRefundAll,
  selectRefundLoading,
  selectRefundActionLoading,
  selectRefundError,
} from './refund.selector';
import { RefundState } from './refund.reducer';

@Injectable({ providedIn: 'root' })
export class RefundFacade {
  refundAll$: Observable<RefundInterface[] | null>;
  loading$: Observable<boolean>;
  actionLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  processSuccess$ = this.actions$.pipe(ofType(RefundAction.processRefundSuccess));
  rejectSuccess$ = this.actions$.pipe(ofType(RefundAction.rejectRefundSuccess));

  constructor(
    private store: Store<{ refund: RefundState }>,
    private actions$: Actions
  ) {
    this.refundAll$ = this.store.select(selectRefundAll);
    this.loading$ = this.store.select(selectRefundLoading);
    this.actionLoading$ = this.store.select(selectRefundActionLoading);
    this.error$ = this.store.select(selectRefundError);
  }

  getRefundAll(): void {
    this.store.dispatch(RefundAction.getRefundAll());
  }

  processRefund(id: string): void {
    this.store.dispatch(RefundAction.processRefund({ id }));
  }

  rejectRefund(id: string, notes: string): void {
    this.store.dispatch(RefundAction.rejectRefund({ id, notes }));
  }
}
