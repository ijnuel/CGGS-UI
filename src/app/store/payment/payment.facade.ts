import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PaymentListInterface } from '../../types/fee';
import { PageQueryInterface, PaginatedResponseInterface } from '../../types';
import * as PaymentAction from './payment.actions';
import { selectPaymentList, selectPaymentLoading, selectPaymentError } from './payment.selector';
import { PaymentState } from './payment.reducer';

@Injectable({ providedIn: 'root' })
export class PaymentFacade {
  paymentList$: Observable<PaginatedResponseInterface<PaymentListInterface[]> | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ payment: PaymentState }>) {
    this.paymentList$ = this.store.select(selectPaymentList);
    this.loading$ = this.store.select(selectPaymentLoading);
    this.error$ = this.store.select(selectPaymentError);
  }

  getPaymentList(pageQuery: PageQueryInterface): void {
    this.store.dispatch(PaymentAction.getPaymentList({ pageQuery }));
  }
}
