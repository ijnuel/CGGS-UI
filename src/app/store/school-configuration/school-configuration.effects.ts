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
  SchoolConfigurationFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class SchoolConfigurationEffect {
  // Get All (non-paginated)
  $schoolConfigurationAll = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.getSchoolConfigurationAll),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<SchoolConfigurationListInterface[]>>(
            `${environment.baseUrl}/SchoolConfiguration/GetAll`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.getSchoolConfigurationAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.getSchoolConfigurationAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $schoolConfigurationList = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.getSchoolConfigurationList),
      switchMap(({ pageQuery }) => {
        const params: { [key: string]: string | number } = {
          start: pageQuery.start,
          recordsPerPage: pageQuery.recordsPerPage,
          pageIndex: pageQuery.pageIndex || 0
        };

        if (pageQuery.searchText) {
          params['searchText'] = pageQuery.searchText;
        }

        if (pageQuery.queryProperties && pageQuery.queryProperties.length > 0) {
          params['queryProperties'] = JSON.stringify(pageQuery.queryProperties);
        }

        return this.http
          .get<GenericResponseInterface<PaginatedResponseInterface<SchoolConfigurationListInterface[]>>>(
            `${environment.baseUrl}/SchoolConfiguration/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<SchoolConfigurationListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return SchoolConfigurationAction.getSchoolConfigurationListSuccess({ 
                payload: { 
                  entity: paginatedResponse,
                  error: response.error,
                  exceptionError: response.exceptionError,
                  message: response.message,
                  messages: response.messages,
                  succeeded: response.succeeded
                } 
              });
            }),
            catchError((error) => {
              return of(SchoolConfigurationAction.getSchoolConfigurationListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $schoolConfigurationById = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.getSchoolConfigurationById),
      switchMap(({ schoolConfigurationId }) =>
        this.http
          .get<GenericResponseInterface<SchoolConfigurationListInterface>>(
            `${environment.baseUrl}/SchoolConfiguration/GetById`,
            {
              params: { id: schoolConfigurationId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.getSchoolConfigurationByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.getSchoolConfigurationByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $schoolConfigurationByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.getSchoolConfigurationByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<SchoolConfigurationListInterface[]>>(
            `${environment.baseUrl}/SchoolConfiguration/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.getSchoolConfigurationByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.getSchoolConfigurationByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $schoolConfigurationExists = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.schoolConfigurationExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/SchoolConfiguration/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.schoolConfigurationExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.schoolConfigurationExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $schoolConfigurationCount = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.schoolConfigurationCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/SchoolConfiguration/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.schoolConfigurationCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.schoolConfigurationCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createSchoolConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.createSchoolConfiguration),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SchoolConfigurationListInterface>>(
            `${environment.baseUrl}/SchoolConfiguration/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.createSchoolConfigurationSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.createSchoolConfigurationFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateSchoolConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.updateSchoolConfiguration),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<SchoolConfigurationListInterface>>(
            `${environment.baseUrl}/SchoolConfiguration/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.updateSchoolConfigurationSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.updateSchoolConfigurationFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteSchoolConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.deleteSchoolConfiguration),
      switchMap(({ schoolConfigurationId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/SchoolConfiguration/Delete`,
            {
              params: { id: schoolConfigurationId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.deleteSchoolConfigurationSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.deleteSchoolConfigurationFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManySchoolConfigurations = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.createManySchoolConfigurations),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SchoolConfigurationListInterface[]>>(
            `${environment.baseUrl}/SchoolConfiguration/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.createManySchoolConfigurationsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.createManySchoolConfigurationsFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManySchoolConfigurations = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.updateManySchoolConfigurations),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SchoolConfigurationListInterface[]>>(
            `${environment.baseUrl}/SchoolConfiguration/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.updateManySchoolConfigurationsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.updateManySchoolConfigurationsFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManySchoolConfigurations = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolConfigurationAction.deleteManySchoolConfigurations),
      switchMap(({ schoolConfigurationIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/SchoolConfiguration/DeleteMany`,
            {
              params: { ids: schoolConfigurationIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              SchoolConfigurationAction.deleteManySchoolConfigurationsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolConfigurationAction.deleteManySchoolConfigurationsFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $schoolConfigurationLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          SchoolConfigurationAction.createSchoolConfiguration,
          SchoolConfigurationAction.updateSchoolConfiguration,
          SchoolConfigurationAction.deleteSchoolConfiguration,
          SchoolConfigurationAction.createManySchoolConfigurations,
          SchoolConfigurationAction.updateManySchoolConfigurations,
          SchoolConfigurationAction.deleteManySchoolConfigurations
        ),
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
          SchoolConfigurationAction.updateSchoolConfigurationSuccess,
          SchoolConfigurationAction.updateSchoolConfigurationFail,
          SchoolConfigurationAction.deleteSchoolConfigurationSuccess,
          SchoolConfigurationAction.deleteSchoolConfigurationFail,
          SchoolConfigurationAction.createManySchoolConfigurationsSuccess,
          SchoolConfigurationAction.createManySchoolConfigurationsFail,
          SchoolConfigurationAction.updateManySchoolConfigurationsSuccess,
          SchoolConfigurationAction.updateManySchoolConfigurationsFail,
          SchoolConfigurationAction.deleteManySchoolConfigurationsSuccess,
          SchoolConfigurationAction.deleteManySchoolConfigurationsFail
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
