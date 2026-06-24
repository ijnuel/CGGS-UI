import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PaymentGatewaySetupListInterface, PaymentGatewaySetupFormInterface } from '../../types/payment-gateway-setup';
import { PageQueryInterface, PaginatedResponseInterface, QueryInterface } from '../../types';
import * as PaymentGatewaySetupAction from './payment-gateway-setup.actions';
import {
  selectPaymentGatewaySetupAll,
  selectPaymentGatewaySetupList,
  selectPaymentGatewaySetupById,
  selectPaymentGatewaySetupLoading,
  selectPaymentGatewaySetupError,
  selectPaymentGatewaySetupCreateSuccess,
  selectPaymentGatewaySetupUpdateSuccess,
  selectPaymentGatewaySetupDeleteSuccess,
} from './payment-gateway-setup.selector';
import { PaymentGatewaySetupState } from './payment-gateway-setup.reducer';

@Injectable({ providedIn: 'root' })
export class PaymentGatewaySetupFacade {
  paymentGatewaySetupAll$: Observable<PaymentGatewaySetupListInterface[] | null>;
  paymentGatewaySetupList$: Observable<PaginatedResponseInterface<PaymentGatewaySetupListInterface[]> | null>;
  paymentGatewaySetupById$: Observable<PaymentGatewaySetupListInterface | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  deleteSuccess$: Observable<boolean>;

  constructor(private store: Store<{ paymentGatewaySetup: PaymentGatewaySetupState }>) {
    this.paymentGatewaySetupAll$ = this.store.select(selectPaymentGatewaySetupAll);
    this.paymentGatewaySetupList$ = this.store.select(selectPaymentGatewaySetupList);
    this.paymentGatewaySetupById$ = this.store.select(selectPaymentGatewaySetupById);
    this.loading$ = this.store.select(selectPaymentGatewaySetupLoading);
    this.error$ = this.store.select(selectPaymentGatewaySetupError);
    this.createSuccess$ = this.store.select(selectPaymentGatewaySetupCreateSuccess);
    this.updateSuccess$ = this.store.select(selectPaymentGatewaySetupUpdateSuccess);
    this.deleteSuccess$ = this.store.select(selectPaymentGatewaySetupDeleteSuccess);
  }

  getPaymentGatewaySetupAll(query?: QueryInterface): void {
    this.store.dispatch(PaymentGatewaySetupAction.getPaymentGatewaySetupAll({ query }));
  }

  getPaymentGatewaySetupList(pageQuery: PageQueryInterface): void {
    this.store.dispatch(PaymentGatewaySetupAction.getPaymentGatewaySetupList({ pageQuery }));
  }

  getPaymentGatewaySetupById(id: string): void {
    this.store.dispatch(PaymentGatewaySetupAction.getPaymentGatewaySetupById({ id }));
  }

  createPaymentGatewaySetup(payload: PaymentGatewaySetupFormInterface): void {
    this.store.dispatch(PaymentGatewaySetupAction.createPaymentGatewaySetup({ payload }));
  }

  updatePaymentGatewaySetup(payload: PaymentGatewaySetupFormInterface): void {
    this.store.dispatch(PaymentGatewaySetupAction.updatePaymentGatewaySetup({ payload }));
  }

  deletePaymentGatewaySetup(id: string): void {
    this.store.dispatch(PaymentGatewaySetupAction.deletePaymentGatewaySetup({ id }));
  }
}
