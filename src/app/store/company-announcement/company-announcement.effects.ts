import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';
import * as CompanyAnnouncementActions from './company-announcement.actions';

const base = `${environment.baseUrl}/CompanyAnnouncement`;

@Injectable()
export class CompanyAnnouncementEffect {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private errorLoadingFacade: GlobalLoadingFacade,
  ) {}

  getCompanyAnnouncementAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAnnouncementActions.getCompanyAnnouncementAll),
      switchMap(({ query }) =>
        this.http.post<any>(`${base}/GetAll`, query ?? {}, { withCredentials: true }).pipe(
          map(payload => CompanyAnnouncementActions.getCompanyAnnouncementAllSuccess({ payload })),
          catchError(error => of(CompanyAnnouncementActions.getCompanyAnnouncementAllFail({ error: error.message }))),
        ),
      ),
    ),
  );

  getCompanyAnnouncementList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAnnouncementActions.getCompanyAnnouncementList),
      switchMap(({ pageQuery }) =>
        this.http.post<any>(`${base}/GetAllPaginated`, pageQuery, { withCredentials: true }).pipe(
          map(response => CompanyAnnouncementActions.getCompanyAnnouncementListSuccess({
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
          catchError(error => of(CompanyAnnouncementActions.getCompanyAnnouncementListFail({ error: error.message }))),
        ),
      ),
    ),
  );

  getCompanyAnnouncementById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAnnouncementActions.getCompanyAnnouncementById),
      switchMap(({ companyAnnouncementId }) =>
        this.http.get<any>(`${base}/GetById`, { params: { id: companyAnnouncementId }, withCredentials: true }).pipe(
          map(payload => CompanyAnnouncementActions.getCompanyAnnouncementByIdSuccess({ payload })),
          catchError(error => of(CompanyAnnouncementActions.getCompanyAnnouncementByIdFail({ error: error.message }))),
        ),
      ),
    ),
  );

  createCompanyAnnouncement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAnnouncementActions.createCompanyAnnouncement),
      switchMap(({ payload }) =>
        this.http.post<any>(`${base}/Create`, payload, { withCredentials: true }).pipe(
          map(res => CompanyAnnouncementActions.createCompanyAnnouncementSuccess({ payload: res })),
          catchError(error => of(CompanyAnnouncementActions.createCompanyAnnouncementFail({ error: error.message }))),
        ),
      ),
    ),
  );

  updateCompanyAnnouncement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAnnouncementActions.updateCompanyAnnouncement),
      switchMap(({ payload }) =>
        this.http.put<any>(`${base}/Update`, payload, { withCredentials: true }).pipe(
          map(res => CompanyAnnouncementActions.updateCompanyAnnouncementSuccess({ payload: res })),
          catchError(error => of(CompanyAnnouncementActions.updateCompanyAnnouncementFail({ error: error.message }))),
        ),
      ),
    ),
  );

  deleteCompanyAnnouncement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyAnnouncementActions.deleteCompanyAnnouncement),
      switchMap(({ companyAnnouncementId }) =>
        this.http.delete<any>(`${base}/Delete`, { params: { id: companyAnnouncementId }, withCredentials: true }).pipe(
          map(res => CompanyAnnouncementActions.deleteCompanyAnnouncementSuccess({ payload: res })),
          catchError(error => of(CompanyAnnouncementActions.deleteCompanyAnnouncementFail({ error: error.message }))),
        ),
      ),
    ),
  );

  $companyAnnouncementLoading = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CompanyAnnouncementActions.createCompanyAnnouncement,
        CompanyAnnouncementActions.updateCompanyAnnouncement,
        CompanyAnnouncementActions.deleteCompanyAnnouncement,
      ),
      tap(action => this.errorLoadingFacade.globalLoadingShow(action.type)),
    ),
    { dispatch: false },
  );

  $companyAnnouncementLoadingHide = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CompanyAnnouncementActions.createCompanyAnnouncementSuccess,
        CompanyAnnouncementActions.createCompanyAnnouncementFail,
        CompanyAnnouncementActions.updateCompanyAnnouncementSuccess,
        CompanyAnnouncementActions.updateCompanyAnnouncementFail,
        CompanyAnnouncementActions.deleteCompanyAnnouncementSuccess,
        CompanyAnnouncementActions.deleteCompanyAnnouncementFail,
      ),
      tap(() => this.errorLoadingFacade.globalLoadingHide()),
    ),
    { dispatch: false },
  );
}
