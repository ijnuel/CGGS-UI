import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as FeeAction from './fee.actions';
import { environment } from '../../../environments/environment';
import { FeeListInterface } from '../../types/fee';
import { GenericResponseInterface, PaginatedResponseInterface } from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class FeeEffect {
  $feeAll = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeAction.getFeeAll),
      switchMap(({ query }) =>
        this.http.post<GenericResponseInterface<FeeListInterface[]>>(
          `${environment.baseUrl}/Fee/GetAll`,
          query ?? {},
          { withCredentials: true }
        ).pipe(
          map((payload) => FeeAction.getFeeAllSuccess({ payload })),
          catchError((error) => of(FeeAction.getFeeAllFail({ error })))
        )
      )
    )
  );

  $feeList = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeAction.getFeeList),
      switchMap(({ pageQuery }) =>
        this.http.post<GenericResponseInterface<PaginatedResponseInterface<FeeListInterface[]>>>(
          `${environment.baseUrl}/Fee/GetAllPaginated`,
          pageQuery,
          { withCredentials: true }
        ).pipe(
          map((response) => FeeAction.getFeeListSuccess({
            payload: {
              entity: response.entity,
              error: response.error,
              exceptionError: response.exceptionError,
              message: response.message,
              messages: response.messages,
              succeeded: response.succeeded,
            }
          })),
          catchError((error) => of(FeeAction.getFeeListFail({ error })))
        )
      )
    )
  );

  $feeByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeAction.getFeeByProperties),
      switchMap(({ query }) =>
        this.http.post<GenericResponseInterface<any>>(
          `${environment.baseUrl}/Fee/GetByProperties`,
          query,
          { withCredentials: true }
        ).pipe(
          map((response) => {
            // GetByProperties returns a paginated response; extract the data array
            const entity: FeeListInterface[] = response.entity?.data ?? response.entity ?? [];
            return FeeAction.getFeeByPropertiesSuccess({ payload: { ...response, entity } });
          }),
          catchError((error) => of(FeeAction.getFeeByPropertiesFail({ error })))
        )
      )
    )
  );

  $generateFeesByTermSession = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeAction.generateFeesByTermSession),
      switchMap(({ payload }) =>
        this.http.post<any>(
          `${environment.baseUrl}/Fee/GenerateFeesByTermSession`,
          payload,
          { withCredentials: true }
        ).pipe(
          map(() => FeeAction.generateFeesByTermSessionSuccess()),
          catchError((error) => of(FeeAction.generateFeesByTermSessionFail({ error })))
        )
      )
    )
  );

  $generateFeesBySessionAndTerm = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeAction.generateFeesBySessionAndTerm),
      switchMap(({ payload }) =>
        this.http.post<any>(
          `${environment.baseUrl}/Fee/GenerateFeesBySessionAndTerm`,
          payload,
          { withCredentials: true }
        ).pipe(
          map(() => FeeAction.generateFeesBySessionAndTermSuccess()),
          catchError((error) => of(FeeAction.generateFeesBySessionAndTermFail({ error })))
        )
      )
    )
  );

  $generateFeesByTermSessionForStudent = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeAction.generateFeesByTermSessionForStudent),
      switchMap(({ payload }) =>
        this.http.post<any>(
          `${environment.baseUrl}/Fee/GenerateFeesByTermSessionForStudent`,
          payload,
          { withCredentials: true }
        ).pipe(
          map(() => FeeAction.generateFeesByTermSessionForStudentSuccess()),
          catchError((error) => of(FeeAction.generateFeesByTermSessionForStudentFail({ error })))
        )
      )
    )
  );

  $generateFeesBySessionAndTermForStudent = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeAction.generateFeesBySessionAndTermForStudent),
      switchMap(({ payload }) =>
        this.http.post<any>(
          `${environment.baseUrl}/Fee/GenerateFeesBySessionAndTermForStudent`,
          payload,
          { withCredentials: true }
        ).pipe(
          map(() => FeeAction.generateFeesBySessionAndTermForStudentSuccess()),
          catchError((error) => of(FeeAction.generateFeesBySessionAndTermForStudentFail({ error })))
        )
      )
    )
  );

  // Loading effects for generate actions
  $loading = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FeeAction.generateFeesByTermSession,
        FeeAction.generateFeesBySessionAndTerm,
        FeeAction.generateFeesByTermSessionForStudent,
        FeeAction.generateFeesBySessionAndTermForStudent,
      ),
      tap((action) => this.globalLoadingFacade.globalLoadingShow(action.type))
    ), { dispatch: false }
  );

  $loadingHide = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FeeAction.generateFeesByTermSessionSuccess,
        FeeAction.generateFeesByTermSessionFail,
        FeeAction.generateFeesBySessionAndTermSuccess,
        FeeAction.generateFeesBySessionAndTermFail,
        FeeAction.generateFeesByTermSessionForStudentSuccess,
        FeeAction.generateFeesByTermSessionForStudentFail,
        FeeAction.generateFeesBySessionAndTermForStudentSuccess,
        FeeAction.generateFeesBySessionAndTermForStudentFail,
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
