import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ApplicationAction from './application.actions';
import { environment } from '../../../environments/environment';
import {
  ApplicationListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  ApplicationFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class ApplicationEffect {
  // Get All (non-paginated)
  $applicationAll = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.getApplicationAll),
      switchMap(() =>
        this.http
          .post<GenericResponseInterface<ApplicationListInterface[]>>(
            `${environment.baseUrl}/Application/GetAll`,
            {},
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.getApplicationAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(ApplicationAction.getApplicationAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $applicationList = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.getApplicationList),
      switchMap(({ pageQuery }) => {
        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<ApplicationListInterface[]>>>(
            `${environment.baseUrl}/Application/GetAllPaginated`,
            pageQuery,
            { withCredentials: true }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<ApplicationListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return ApplicationAction.getApplicationListSuccess({ 
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
              return of(ApplicationAction.getApplicationListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $applicationById = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.getApplicationById),
      switchMap(({ applicationId }) =>
        this.http
          .get<GenericResponseInterface<ApplicationListInterface>>(
            `${environment.baseUrl}/Application/GetById`,
            {
              params: { id: applicationId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.getApplicationByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(ApplicationAction.getApplicationByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $applicationByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.getApplicationByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<ApplicationListInterface[]>>(
            `${environment.baseUrl}/Application/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.getApplicationByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(ApplicationAction.getApplicationByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $applicationExists = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.applicationExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Application/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.applicationExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ApplicationAction.applicationExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $applicationCount = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.applicationCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/Application/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.applicationCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(ApplicationAction.applicationCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createApplication = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.createApplication),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ApplicationListInterface>>(
            `${environment.baseUrl}/Application/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.createApplicationSuccess({ payload })
            ),
            catchError((error) => {
              return of(ApplicationAction.createApplicationFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateApplication = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.updateApplication),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<ApplicationListInterface>>(
            `${environment.baseUrl}/Application/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.updateApplicationSuccess({ payload })
            ),
            catchError((error) => {
              return of(ApplicationAction.updateApplicationFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteApplication = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.deleteApplication),
      switchMap(({ applicationId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Application/Delete`,
            {
              params: { id: applicationId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.deleteApplicationSuccess({ payload })
            ),
            catchError((error) => {
              return of(ApplicationAction.deleteApplicationFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyApplications = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.createManyApplications),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ApplicationListInterface[]>>(
            `${environment.baseUrl}/Application/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.createManyApplicationsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ApplicationAction.createManyApplicationsFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyApplications = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.updateManyApplications),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ApplicationListInterface[]>>(
            `${environment.baseUrl}/Application/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.updateManyApplicationsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ApplicationAction.updateManyApplicationsFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyApplications = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.deleteManyApplications),
      switchMap(({ applicationIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Application/DeleteMany`,
            {
              params: { ids: applicationIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.deleteManyApplicationsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ApplicationAction.deleteManyApplicationsFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $applicationLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ApplicationAction.createApplication,
          ApplicationAction.updateApplication,
          ApplicationAction.deleteApplication,
          ApplicationAction.createManyApplications,
          ApplicationAction.updateManyApplications,
          ApplicationAction.deleteManyApplications
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $applicationLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ApplicationAction.createApplicationSuccess,
          ApplicationAction.createApplicationFail,
          ApplicationAction.updateApplicationSuccess,
          ApplicationAction.updateApplicationFail,
          ApplicationAction.deleteApplicationSuccess,
          ApplicationAction.deleteApplicationFail,
          ApplicationAction.createManyApplicationsSuccess,
          ApplicationAction.createManyApplicationsFail,
          ApplicationAction.updateManyApplicationsSuccess,
          ApplicationAction.updateManyApplicationsFail,
          ApplicationAction.deleteManyApplicationsSuccess,
          ApplicationAction.deleteManyApplicationsFail
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
