import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as FeeSetupAction from './fee-setup.actions';
import { environment } from '../../../environments/environment';
import { FeeSetupListInterface } from '../../types/fee';
import { GenericResponseInterface, PaginatedResponseInterface } from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class FeeSetupEffect {
  $feeSetupAll = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeSetupAction.getFeeSetupAll),
      switchMap(({ query }) =>
        this.http.post<GenericResponseInterface<FeeSetupListInterface[]>>(
          `${environment.baseUrl}/FeeSetup/GetAll`,
          query ?? {},
          { withCredentials: true }
        ).pipe(
          map((payload) => FeeSetupAction.getFeeSetupAllSuccess({ payload })),
          catchError((error) => of(FeeSetupAction.getFeeSetupAllFail({ error })))
        )
      )
    )
  );

  $feeSetupList = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeSetupAction.getFeeSetupList),
      switchMap(({ pageQuery }) =>
        this.http.post<GenericResponseInterface<PaginatedResponseInterface<FeeSetupListInterface[]>>>(
          `${environment.baseUrl}/FeeSetup/GetAllPaginated`,
          pageQuery,
          { withCredentials: true }
        ).pipe(
          map((response) => FeeSetupAction.getFeeSetupListSuccess({
            payload: {
              entity: response.entity,
              error: response.error,
              exceptionError: response.exceptionError,
              message: response.message,
              messages: response.messages,
              succeeded: response.succeeded,
            }
          })),
          catchError((error) => of(FeeSetupAction.getFeeSetupListFail({ error })))
        )
      )
    )
  );

  $feeSetupById = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeSetupAction.getFeeSetupById),
      switchMap(({ id }) =>
        this.http.get<GenericResponseInterface<FeeSetupListInterface>>(
          `${environment.baseUrl}/FeeSetup/GetById`,
          { params: { id }, withCredentials: true }
        ).pipe(
          map((payload) => FeeSetupAction.getFeeSetupByIdSuccess({ payload })),
          catchError((error) => of(FeeSetupAction.getFeeSetupByIdFail({ error })))
        )
      )
    )
  );

  $createFeeSetup = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeSetupAction.createFeeSetup),
      switchMap(({ payload }) =>
        this.http.post<GenericResponseInterface<any>>(
          `${environment.baseUrl}/FeeSetup/Create`,
          payload,
          { withCredentials: true }
        ).pipe(
          map((response) => FeeSetupAction.createFeeSetupSuccess({ payload: response })),
          catchError((error) => of(FeeSetupAction.createFeeSetupFail({ error })))
        )
      )
    )
  );

  $updateFeeSetup = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeSetupAction.updateFeeSetup),
      switchMap(({ payload }) =>
        this.http.put<GenericResponseInterface<any>>(
          `${environment.baseUrl}/FeeSetup/Update`,
          payload,
          { withCredentials: true }
        ).pipe(
          map((response) => FeeSetupAction.updateFeeSetupSuccess({ payload: response })),
          catchError((error) => of(FeeSetupAction.updateFeeSetupFail({ error })))
        )
      )
    )
  );

  $deleteFeeSetup = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeSetupAction.deleteFeeSetup),
      switchMap(({ id }) =>
        this.http.delete<GenericResponseInterface<any>>(
          `${environment.baseUrl}/FeeSetup/Delete/${id}`,
          { withCredentials: true }
        ).pipe(
          map((payload) => FeeSetupAction.deleteFeeSetupSuccess({ payload })),
          catchError((error) => of(FeeSetupAction.deleteFeeSetupFail({ error })))
        )
      )
    )
  );

  $loading = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeSetupAction.createFeeSetup, FeeSetupAction.updateFeeSetup, FeeSetupAction.deleteFeeSetup, FeeSetupAction.invalidateCache),
      tap((action) => this.globalLoadingFacade.globalLoadingShow(action.type))
    ), { dispatch: false }
  );

  $loadingHide = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FeeSetupAction.createFeeSetupSuccess, FeeSetupAction.createFeeSetupFail,
        FeeSetupAction.updateFeeSetupSuccess, FeeSetupAction.updateFeeSetupFail,
        FeeSetupAction.deleteFeeSetupSuccess, FeeSetupAction.deleteFeeSetupFail,
        FeeSetupAction.invalidateCacheSuccess, FeeSetupAction.invalidateCacheFail,
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
