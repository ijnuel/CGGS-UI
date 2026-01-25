import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as SchoolTermSessionAction from './school-term-session.actions';
import { environment } from '../../../environments/environment';
import {
  SchoolTermSessionListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  SchoolTermSessionFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class SchoolTermSessionEffect {
  // Get All (non-paginated)
  $schoolTermSessionAll = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolTermSessionAction.getSchoolTermSessionAll),
      switchMap(() =>
        this.http
          .post<GenericResponseInterface<SchoolTermSessionListInterface[]>>(
            `${environment.baseUrl}/SchoolTermSession/GetAll`,
            {},
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolTermSessionAction.getSchoolTermSessionAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolTermSessionAction.getSchoolTermSessionAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $schoolTermSessionList = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolTermSessionAction.getSchoolTermSessionList),
      switchMap(({ pageQuery }) => {
        

        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<SchoolTermSessionListInterface[]>>>(
            `${environment.baseUrl}/SchoolTermSession/GetAllPaginated`,
            pageQuery,
            { withCredentials: true }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<SchoolTermSessionListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return SchoolTermSessionAction.getSchoolTermSessionListSuccess({ 
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
              return of(SchoolTermSessionAction.getSchoolTermSessionListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $schoolTermSessionById = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolTermSessionAction.getSchoolTermSessionById),
      switchMap(({ schoolTermSessionId }) =>
        this.http
          .get<GenericResponseInterface<SchoolTermSessionListInterface>>(
            `${environment.baseUrl}/SchoolTermSession/GetById`,
            {
              params: { id: schoolTermSessionId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              SchoolTermSessionAction.getSchoolTermSessionByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolTermSessionAction.getSchoolTermSessionByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $schoolTermSessionByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolTermSessionAction.getSchoolTermSessionByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<SchoolTermSessionListInterface[]>>(
            `${environment.baseUrl}/SchoolTermSession/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolTermSessionAction.getSchoolTermSessionByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolTermSessionAction.getSchoolTermSessionByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $schoolTermSessionExists = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolTermSessionAction.schoolTermSessionExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/SchoolTermSession/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolTermSessionAction.schoolTermSessionExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolTermSessionAction.schoolTermSessionExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $schoolTermSessionCount = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolTermSessionAction.schoolTermSessionCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/SchoolTermSession/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolTermSessionAction.schoolTermSessionCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolTermSessionAction.schoolTermSessionCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createSchoolTermSession = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolTermSessionAction.createSchoolTermSession),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SchoolTermSessionListInterface>>(
            `${environment.baseUrl}/SchoolTermSession/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolTermSessionAction.createSchoolTermSessionSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolTermSessionAction.createSchoolTermSessionFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateSchoolTermSession = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolTermSessionAction.updateSchoolTermSession),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<SchoolTermSessionListInterface>>(
            `${environment.baseUrl}/SchoolTermSession/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolTermSessionAction.updateSchoolTermSessionSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolTermSessionAction.updateSchoolTermSessionFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteSchoolTermSession = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolTermSessionAction.deleteSchoolTermSession),
      switchMap(({ schoolTermSessionId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/SchoolTermSession/Delete`,
            {
              params: { id: schoolTermSessionId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              SchoolTermSessionAction.deleteSchoolTermSessionSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolTermSessionAction.deleteSchoolTermSessionFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManySchoolTermSessions = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolTermSessionAction.createManySchoolTermSessions),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SchoolTermSessionListInterface[]>>(
            `${environment.baseUrl}/SchoolTermSession/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolTermSessionAction.createManySchoolTermSessionsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolTermSessionAction.createManySchoolTermSessionsFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManySchoolTermSessions = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolTermSessionAction.updateManySchoolTermSessions),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SchoolTermSessionListInterface[]>>(
            `${environment.baseUrl}/SchoolTermSession/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SchoolTermSessionAction.updateManySchoolTermSessionsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolTermSessionAction.updateManySchoolTermSessionsFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManySchoolTermSessions = createEffect(() =>
    this.actions$.pipe(
      ofType(SchoolTermSessionAction.deleteManySchoolTermSessions),
      switchMap(({ schoolTermSessionIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/SchoolTermSession/DeleteMany`,
            {
              params: { ids: schoolTermSessionIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              SchoolTermSessionAction.deleteManySchoolTermSessionsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SchoolTermSessionAction.deleteManySchoolTermSessionsFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $schoolTermSessionLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          SchoolTermSessionAction.createSchoolTermSession,
          SchoolTermSessionAction.updateSchoolTermSession,
          SchoolTermSessionAction.deleteSchoolTermSession,
          SchoolTermSessionAction.createManySchoolTermSessions,
          SchoolTermSessionAction.updateManySchoolTermSessions,
          SchoolTermSessionAction.deleteManySchoolTermSessions
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $schoolTermSessionLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          SchoolTermSessionAction.createSchoolTermSessionSuccess,
          SchoolTermSessionAction.createSchoolTermSessionFail,
          SchoolTermSessionAction.updateSchoolTermSessionSuccess,
          SchoolTermSessionAction.updateSchoolTermSessionFail,
          SchoolTermSessionAction.deleteSchoolTermSessionSuccess,
          SchoolTermSessionAction.deleteSchoolTermSessionFail,
          SchoolTermSessionAction.createManySchoolTermSessionsSuccess,
          SchoolTermSessionAction.createManySchoolTermSessionsFail,
          SchoolTermSessionAction.updateManySchoolTermSessionsSuccess,
          SchoolTermSessionAction.updateManySchoolTermSessionsFail,
          SchoolTermSessionAction.deleteManySchoolTermSessionsSuccess,
          SchoolTermSessionAction.deleteManySchoolTermSessionsFail
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
