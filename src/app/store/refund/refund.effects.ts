import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as RefundAction from './refund.actions';
import { environment } from '../../../environments/environment';
import { GenericResponseInterface } from '../../types';
import { RefundInterface } from '../../types/refund';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RefundEffect {
  $refundAll = createEffect(() =>
    this.actions$.pipe(
      ofType(RefundAction.getRefundAll),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<RefundInterface[]>>(
            `${environment.baseUrl}/Refund/GetAll`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) => RefundAction.getRefundAllSuccess({ payload })),
            catchError((error) => of(RefundAction.getRefundAllFail({ error })))
          )
      )
    )
  );

  $processRefund = createEffect(() =>
    this.actions$.pipe(
      ofType(RefundAction.processRefund),
      switchMap(({ id }) =>
        this.http
          .put<any>(
            `${environment.baseUrl}/Refund/ProcessRefund?id=${id}`,
            {},
            { withCredentials: true }
          )
          .pipe(
            mergeMap(() => [
              RefundAction.processRefundSuccess(),
              RefundAction.getRefundAll(),
            ]),
            catchError((error) => of(RefundAction.processRefundFail({ error })))
          )
      )
    )
  );

  $rejectRefund = createEffect(() =>
    this.actions$.pipe(
      ofType(RefundAction.rejectRefund),
      switchMap(({ id, notes }) =>
        this.http
          .put<any>(
            `${environment.baseUrl}/Refund/RejectRefund?id=${id}`,
            JSON.stringify(notes),
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
          )
          .pipe(
            mergeMap(() => [
              RefundAction.rejectRefundSuccess(),
              RefundAction.getRefundAll(),
            ]),
            catchError((error) => of(RefundAction.rejectRefundFail({ error })))
          )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
