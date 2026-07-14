import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';
import * as CompanyGalleryImageActions from './company-gallery-image.actions';

const base = `${environment.baseUrl}/CompanyGalleryImage`;

@Injectable()
export class CompanyGalleryImageEffect {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private errorLoadingFacade: GlobalLoadingFacade,
  ) {}

  getCompanyGalleryImageAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyGalleryImageActions.getCompanyGalleryImageAll),
      switchMap(({ query }) =>
        this.http.post<any>(`${base}/GetAll`, query ?? {}, { withCredentials: true }).pipe(
          map(payload => CompanyGalleryImageActions.getCompanyGalleryImageAllSuccess({ payload })),
          catchError(error => of(CompanyGalleryImageActions.getCompanyGalleryImageAllFail({ error: error.message }))),
        ),
      ),
    ),
  );

  getCompanyGalleryImageList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyGalleryImageActions.getCompanyGalleryImageList),
      switchMap(({ pageQuery }) =>
        this.http.post<any>(`${base}/GetAllPaginated`, pageQuery, { withCredentials: true }).pipe(
          map(response => CompanyGalleryImageActions.getCompanyGalleryImageListSuccess({
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
          catchError(error => of(CompanyGalleryImageActions.getCompanyGalleryImageListFail({ error: error.message }))),
        ),
      ),
    ),
  );

  getCompanyGalleryImageById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyGalleryImageActions.getCompanyGalleryImageById),
      switchMap(({ companyGalleryImageId }) =>
        this.http.get<any>(`${base}/GetById`, { params: { id: companyGalleryImageId }, withCredentials: true }).pipe(
          map(payload => CompanyGalleryImageActions.getCompanyGalleryImageByIdSuccess({ payload })),
          catchError(error => of(CompanyGalleryImageActions.getCompanyGalleryImageByIdFail({ error: error.message }))),
        ),
      ),
    ),
  );

  createCompanyGalleryImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyGalleryImageActions.createCompanyGalleryImage),
      switchMap(({ payload }) =>
        this.http.post<any>(`${base}/Create`, payload, { withCredentials: true }).pipe(
          map(res => CompanyGalleryImageActions.createCompanyGalleryImageSuccess({ payload: res })),
          catchError(error => of(CompanyGalleryImageActions.createCompanyGalleryImageFail({ error: error.message }))),
        ),
      ),
    ),
  );

  updateCompanyGalleryImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyGalleryImageActions.updateCompanyGalleryImage),
      switchMap(({ payload }) =>
        this.http.put<any>(`${base}/Update`, payload, { withCredentials: true }).pipe(
          map(res => CompanyGalleryImageActions.updateCompanyGalleryImageSuccess({ payload: res })),
          catchError(error => of(CompanyGalleryImageActions.updateCompanyGalleryImageFail({ error: error.message }))),
        ),
      ),
    ),
  );

  deleteCompanyGalleryImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyGalleryImageActions.deleteCompanyGalleryImage),
      switchMap(({ companyGalleryImageId }) =>
        this.http.delete<any>(`${base}/Delete`, { params: { id: companyGalleryImageId }, withCredentials: true }).pipe(
          map(res => CompanyGalleryImageActions.deleteCompanyGalleryImageSuccess({ payload: res })),
          catchError(error => of(CompanyGalleryImageActions.deleteCompanyGalleryImageFail({ error: error.message }))),
        ),
      ),
    ),
  );

  $companyGalleryImageLoading = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CompanyGalleryImageActions.createCompanyGalleryImage,
        CompanyGalleryImageActions.updateCompanyGalleryImage,
        CompanyGalleryImageActions.deleteCompanyGalleryImage,
      ),
      tap(action => this.errorLoadingFacade.globalLoadingShow(action.type)),
    ),
    { dispatch: false },
  );

  $companyGalleryImageLoadingHide = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CompanyGalleryImageActions.createCompanyGalleryImageSuccess,
        CompanyGalleryImageActions.createCompanyGalleryImageFail,
        CompanyGalleryImageActions.updateCompanyGalleryImageSuccess,
        CompanyGalleryImageActions.updateCompanyGalleryImageFail,
        CompanyGalleryImageActions.deleteCompanyGalleryImageSuccess,
        CompanyGalleryImageActions.deleteCompanyGalleryImageFail,
      ),
      tap(() => this.errorLoadingFacade.globalLoadingHide()),
    ),
    { dispatch: false },
  );
}
