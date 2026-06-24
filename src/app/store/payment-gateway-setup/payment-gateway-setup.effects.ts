import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as PaymentGatewaySetupAction from './payment-gateway-setup.actions';
import { environment } from '../../../environments/environment';
import { PaymentGatewaySetupListInterface } from '../../types/payment-gateway-setup';
import { GenericResponseInterface, PaginatedResponseInterface } from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class PaymentGatewaySetupEffect {
  $paymentGatewaySetupAll = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentGatewaySetupAction.getPaymentGatewaySetupAll),
      switchMap(({ query }) =>
        this.http.post<GenericResponseInterface<PaymentGatewaySetupListInterface[]>>(
          `${environment.baseUrl}/PaymentGatewaySetup/GetAll`,
          query ?? {},
          { withCredentials: true }
        ).pipe(
          map((payload) => PaymentGatewaySetupAction.getPaymentGatewaySetupAllSuccess({ payload })),
          catchError((error) => of(PaymentGatewaySetupAction.getPaymentGatewaySetupAllFail({ error })))
        )
      )
    )
  );

  $paymentGatewaySetupList = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentGatewaySetupAction.getPaymentGatewaySetupList),
      switchMap(({ pageQuery }) =>
        this.http.post<GenericResponseInterface<PaginatedResponseInterface<PaymentGatewaySetupListInterface[]>>>(
          `${environment.baseUrl}/PaymentGatewaySetup/GetAllPaginated`,
          pageQuery,
          { withCredentials: true }
        ).pipe(
          map((response) => PaymentGatewaySetupAction.getPaymentGatewaySetupListSuccess({ payload: response })),
          catchError((error) => of(PaymentGatewaySetupAction.getPaymentGatewaySetupListFail({ error })))
        )
      )
    )
  );

  $paymentGatewaySetupById = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentGatewaySetupAction.getPaymentGatewaySetupById),
      switchMap(({ id }) =>
        this.http.get<GenericResponseInterface<PaymentGatewaySetupListInterface>>(
          `${environment.baseUrl}/PaymentGatewaySetup/GetById`,
          { params: { id }, withCredentials: true }
        ).pipe(
          map((payload) => PaymentGatewaySetupAction.getPaymentGatewaySetupByIdSuccess({ payload })),
          catchError((error) => of(PaymentGatewaySetupAction.getPaymentGatewaySetupByIdFail({ error })))
        )
      )
    )
  );

  $createPaymentGatewaySetup = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentGatewaySetupAction.createPaymentGatewaySetup),
      switchMap(({ payload }) =>
        this.http.post<GenericResponseInterface<any>>(
          `${environment.baseUrl}/PaymentGatewaySetup/Create`,
          payload,
          { withCredentials: true }
        ).pipe(
          map((response) => PaymentGatewaySetupAction.createPaymentGatewaySetupSuccess({ payload: response })),
          catchError((error) => of(PaymentGatewaySetupAction.createPaymentGatewaySetupFail({ error })))
        )
      )
    )
  );

  $updatePaymentGatewaySetup = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentGatewaySetupAction.updatePaymentGatewaySetup),
      switchMap(({ payload }) =>
        this.http.put<GenericResponseInterface<any>>(
          `${environment.baseUrl}/PaymentGatewaySetup/Update`,
          payload,
          { withCredentials: true }
        ).pipe(
          map((response) => PaymentGatewaySetupAction.updatePaymentGatewaySetupSuccess({ payload: response })),
          catchError((error) => of(PaymentGatewaySetupAction.updatePaymentGatewaySetupFail({ error })))
        )
      )
    )
  );

  $deletePaymentGatewaySetup = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentGatewaySetupAction.deletePaymentGatewaySetup),
      switchMap(({ id }) =>
        this.http.delete<GenericResponseInterface<any>>(
          `${environment.baseUrl}/PaymentGatewaySetup/Delete/${id}`,
          { withCredentials: true }
        ).pipe(
          map((payload) => PaymentGatewaySetupAction.deletePaymentGatewaySetupSuccess({ payload })),
          catchError((error) => of(PaymentGatewaySetupAction.deletePaymentGatewaySetupFail({ error })))
        )
      )
    )
  );

  $loading = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PaymentGatewaySetupAction.createPaymentGatewaySetup,
        PaymentGatewaySetupAction.updatePaymentGatewaySetup,
        PaymentGatewaySetupAction.deletePaymentGatewaySetup,
      ),
      tap((action) => this.globalLoadingFacade.globalLoadingShow(action.type))
    ), { dispatch: false }
  );

  $loadingHide = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PaymentGatewaySetupAction.createPaymentGatewaySetupSuccess, PaymentGatewaySetupAction.createPaymentGatewaySetupFail,
        PaymentGatewaySetupAction.updatePaymentGatewaySetupSuccess, PaymentGatewaySetupAction.updatePaymentGatewaySetupFail,
        PaymentGatewaySetupAction.deletePaymentGatewaySetupSuccess, PaymentGatewaySetupAction.deletePaymentGatewaySetupFail,
      ),
      tap(() => this.globalLoadingFacade.globalLoadingHide())
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private globalLoadingFacade: GlobalLoadingFacade
  ) {}
}
