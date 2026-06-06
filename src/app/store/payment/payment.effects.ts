import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PaymentAction from './payment.actions';
import { environment } from '../../../environments/environment';
import { PaymentListInterface } from '../../types/fee';
import { GenericResponseInterface, PaginatedResponseInterface } from '../../types';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentEffect {
  $paymentList = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentAction.getPaymentList),
      switchMap(({ pageQuery }) =>
        this.http.post<GenericResponseInterface<PaginatedResponseInterface<PaymentListInterface[]>>>(
          `${environment.baseUrl}/Payment/GetAllPaginated`,
          pageQuery,
          { withCredentials: true }
        ).pipe(
          map((payload) => PaymentAction.getPaymentListSuccess({ payload })),
          catchError((error) => of(PaymentAction.getPaymentListFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}
}
