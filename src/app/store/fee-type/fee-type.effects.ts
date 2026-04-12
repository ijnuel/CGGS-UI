import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as FeeTypeAction from './fee-type.actions';
import { environment } from '../../../environments/environment';
import { FeeTypeListInterface, FeeTypeFormInterface } from '../../types/fee';
import { GenericResponseInterface, PaginatedResponseInterface } from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class FeeTypeEffect {
  // Get All
  $feeTypeAll = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeAction.getFeeTypeAll),
      switchMap(({ query }) =>
        this.http.post<GenericResponseInterface<FeeTypeListInterface[]>>(
          `${environment.baseUrl}/FeeType/GetAll`,
          query ?? {},
          { withCredentials: true }
        ).pipe(
          map((payload) => FeeTypeAction.getFeeTypeAllSuccess({ payload })),
          catchError((error) => of(FeeTypeAction.getFeeTypeAllFail({ error })))
        )
      )
    )
  );

  // Get List Paginated
  $feeTypeList = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeAction.getFeeTypeList),
      switchMap(({ pageQuery }) =>
        this.http.post<GenericResponseInterface<PaginatedResponseInterface<FeeTypeListInterface[]>>>(
          `${environment.baseUrl}/FeeType/GetAllPaginated`,
          pageQuery,
          { withCredentials: true }
        ).pipe(
          map((response) => FeeTypeAction.getFeeTypeListSuccess({
            payload: {
              entity: response.entity,
              error: response.error,
              exceptionError: response.exceptionError,
              message: response.message,
              messages: response.messages,
              succeeded: response.succeeded,
            }
          })),
          catchError((error) => of(FeeTypeAction.getFeeTypeListFail({ error })))
        )
      )
    )
  );

  // Get By Id
  $feeTypeById = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeAction.getFeeTypeById),
      switchMap(({ id }) =>
        this.http.get<GenericResponseInterface<FeeTypeListInterface>>(
          `${environment.baseUrl}/FeeType/GetById`,
          { params: { id }, withCredentials: true }
        ).pipe(
          map((payload) => FeeTypeAction.getFeeTypeByIdSuccess({ payload })),
          catchError((error) => of(FeeTypeAction.getFeeTypeByIdFail({ error })))
        )
      )
    )
  );

  // Create
  $createFeeType = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeAction.createFeeType),
      switchMap(({ payload }) =>
        this.http.post<GenericResponseInterface<any>>(
          `${environment.baseUrl}/FeeType/Create`,
          payload,
          { withCredentials: true }
        ).pipe(
          map((response) => FeeTypeAction.createFeeTypeSuccess({ payload: response })),
          catchError((error) => of(FeeTypeAction.createFeeTypeFail({ error })))
        )
      )
    )
  );

  // Update
  $updateFeeType = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeAction.updateFeeType),
      switchMap(({ payload }) =>
        this.http.put<GenericResponseInterface<any>>(
          `${environment.baseUrl}/FeeType/Update`,
          payload,
          { withCredentials: true }
        ).pipe(
          map((response) => FeeTypeAction.updateFeeTypeSuccess({ payload: response })),
          catchError((error) => of(FeeTypeAction.updateFeeTypeFail({ error })))
        )
      )
    )
  );

  // Delete
  $deleteFeeType = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeAction.deleteFeeType),
      switchMap(({ id }) =>
        this.http.delete<GenericResponseInterface<any>>(
          `${environment.baseUrl}/FeeType/Delete/${id}`,
          { withCredentials: true }
        ).pipe(
          map((payload) => FeeTypeAction.deleteFeeTypeSuccess({ payload })),
          catchError((error) => of(FeeTypeAction.deleteFeeTypeFail({ error })))
        )
      )
    )
  );

  // Loading effects
  $loading = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeAction.createFeeType, FeeTypeAction.updateFeeType, FeeTypeAction.deleteFeeType, FeeTypeAction.invalidateCache),
      tap((action) => this.globalLoadingFacade.globalLoadingShow(action.type))
    ), { dispatch: false }
  );

  $loadingHide = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FeeTypeAction.createFeeTypeSuccess, FeeTypeAction.createFeeTypeFail,
        FeeTypeAction.updateFeeTypeSuccess, FeeTypeAction.updateFeeTypeFail,
        FeeTypeAction.deleteFeeTypeSuccess, FeeTypeAction.deleteFeeTypeFail,
        FeeTypeAction.invalidateCacheSuccess, FeeTypeAction.invalidateCacheFail,
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
