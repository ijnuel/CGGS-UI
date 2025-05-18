import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as SchoolConfigurationAction from './school-configuration.actions';
import { environment } from '../../../environments/environment';
import {
  SchoolConfigurationListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class SchoolConfigurationEffect {
  $schoolConfigurationList = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.getSchoolConfigurationList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<SchoolConfigurationListInterface[]>
            >
          >(`${environment.baseUrl}/SchoolConfiguration/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.getSchoolConfigurationListSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.getSchoolConfigurationListFail({ error }));
            })
          )
      )
    )
  );

  $schoolConfigurationById = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.getSchoolConfigurationById),
      switchMap(({ schoolConfigurationId }) =>
        this.http
          .get<GenericResponseInterface<SchoolConfigurationListInterface>>(
            `${environment.baseUrl}/SchoolConfiguration/GetById`,
            {
              params: { schoolConfigurationId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.getSchoolConfigurationByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.getSchoolConfigurationByIdFail({ error }));
            })
          )
      )
    )
  );

  $createSchoolConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.createSchoolConfiguration),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SchoolConfigurationListInterface>>(
            `${environment.baseUrl}/SchoolConfiguration/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.createSchoolConfigurationSuccess({
                message: 'SchoolConfiguration created successfully',
                schoolConfiguration: payload.entity,
              })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.createSchoolConfigurationFail({ error }));
            })
          )
      )
    )
  );

  $updateSchoolConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.editSchoolConfiguration),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SchoolConfigurationListInterface>>(
            `${environment.baseUrl}/SchoolConfiguration/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.editSchoolConfigurationSuccess({
                message: 'SchoolConfiguration updated successfully',
                schoolConfiguration: payload.entity,
              })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.editSchoolConfigurationFail({ error }));
            })
          )
      )
    )
  );

  $schoolConfigurationLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SchoolConfigurationAction.createSchoolConfiguration, SchoolConfigurationAction.editSchoolConfiguration),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $schoolConfigurationLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          SchoolConfigurationAction.createSchoolConfigurationSuccess,
          SchoolConfigurationAction.createSchoolConfigurationFail,
          SchoolConfigurationAction.editSchoolConfigurationSuccess,
          SchoolConfigurationAction.editSchoolConfigurationFail
        ),
        tap(() => {
          this.errorLoadingFacade.globalLoadingHide();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private errorLoadingFacade: GlobalLoadingFacade
  ) {}
}
