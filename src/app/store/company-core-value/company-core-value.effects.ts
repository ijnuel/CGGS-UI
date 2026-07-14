import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';
import * as CompanyCoreValueActions from './company-core-value.actions';

const base = `${environment.baseUrl}/CompanyCoreValue`;

@Injectable()
export class CompanyCoreValueEffect {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private errorLoadingFacade: GlobalLoadingFacade,
  ) {}

  getCompanyCoreValueAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyCoreValueActions.getCompanyCoreValueAll),
      switchMap(({ query }) =>
        this.http.post<any>(`${base}/GetAll`, query ?? {}, { withCredentials: true }).pipe(
          map(payload => CompanyCoreValueActions.getCompanyCoreValueAllSuccess({ payload })),
          catchError(error => of(CompanyCoreValueActions.getCompanyCoreValueAllFail({ error: error.message }))),
        ),
      ),
    ),
  );

  getCompanyCoreValueList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyCoreValueActions.getCompanyCoreValueList),
      switchMap(({ pageQuery }) =>
        this.http.post<any>(`${base}/GetAllPaginated`, pageQuery, { withCredentials: true }).pipe(
          map(response => CompanyCoreValueActions.getCompanyCoreValueListSuccess({
            payload: {
              ...response,
              entity: {
                currentPage: response.entity?.currentPage,
                recordPerPage: response.entity?.recordPerPage,
                totalPages: response.entity?.totalPages,
                totalCount: response.entity?.totalCount,
                data: response.entity?.data,
              },
            },
          })),
          catchError(error => of(CompanyCoreValueActions.getCompanyCoreValueListFail({ error: error.message }))),
        ),
      ),
    ),
  );

  getCompanyCoreValueById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyCoreValueActions.getCompanyCoreValueById),
      switchMap(({ companyCoreValueId }) =>
        this.http.get<any>(`${base}/GetById`, { params: { id: companyCoreValueId }, withCredentials: true }).pipe(
          map(payload => CompanyCoreValueActions.getCompanyCoreValueByIdSuccess({ payload })),
          catchError(error => of(CompanyCoreValueActions.getCompanyCoreValueByIdFail({ error: error.message }))),
        ),
      ),
    ),
  );

  createCompanyCoreValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyCoreValueActions.createCompanyCoreValue),
      switchMap(({ payload }) =>
        this.http.post<any>(`${base}/Create`, payload, { withCredentials: true }).pipe(
          map(res => CompanyCoreValueActions.createCompanyCoreValueSuccess({ payload: res })),
          catchError(error => of(CompanyCoreValueActions.createCompanyCoreValueFail({ error: error.message }))),
        ),
      ),
    ),
  );

  updateCompanyCoreValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyCoreValueActions.updateCompanyCoreValue),
      switchMap(({ payload }) =>
        this.http.put<any>(`${base}/Update`, payload, { withCredentials: true }).pipe(
          map(res => CompanyCoreValueActions.updateCompanyCoreValueSuccess({ payload: res })),
          catchError(error => of(CompanyCoreValueActions.updateCompanyCoreValueFail({ error: error.message }))),
        ),
      ),
    ),
  );

  deleteCompanyCoreValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyCoreValueActions.deleteCompanyCoreValue),
      switchMap(({ companyCoreValueId }) =>
        this.http.delete<any>(`${base}/Delete`, { params: { id: companyCoreValueId }, withCredentials: true }).pipe(
          map(res => CompanyCoreValueActions.deleteCompanyCoreValueSuccess({ payload: res })),
          catchError(error => of(CompanyCoreValueActions.deleteCompanyCoreValueFail({ error: error.message }))),
        ),
      ),
    ),
  );

  $companyCoreValueLoading = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CompanyCoreValueActions.createCompanyCoreValue,
        CompanyCoreValueActions.updateCompanyCoreValue,
        CompanyCoreValueActions.deleteCompanyCoreValue,
      ),
      tap(action => this.errorLoadingFacade.globalLoadingShow(action.type)),
    ),
    { dispatch: false },
  );

  $companyCoreValueLoadingHide = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CompanyCoreValueActions.createCompanyCoreValueSuccess,
        CompanyCoreValueActions.createCompanyCoreValueFail,
        CompanyCoreValueActions.updateCompanyCoreValueSuccess,
        CompanyCoreValueActions.updateCompanyCoreValueFail,
        CompanyCoreValueActions.deleteCompanyCoreValueSuccess,
        CompanyCoreValueActions.deleteCompanyCoreValueFail,
      ),
      tap(() => this.errorLoadingFacade.globalLoadingHide()),
    ),
    { dispatch: false },
  );
}
