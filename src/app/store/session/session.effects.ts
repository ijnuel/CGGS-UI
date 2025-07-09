import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as SessionAction from './session.actions';
import { environment } from '../../../environments/environment';
import {
  SessionListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  SessionFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class SessionEffect {
  // Get All (non-paginated)
  $sessionAll = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.getSessionAll),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<SessionListInterface[]>>(
            `${environment.baseUrl}/Session/GetAll`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SessionAction.getSessionAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(SessionAction.getSessionAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $sessionList = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.getSessionList),
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
          .get<GenericResponseInterface<PaginatedResponseInterface<SessionListInterface[]>>>(
            `${environment.baseUrl}/Session/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<SessionListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return SessionAction.getSessionListSuccess({ 
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
              return of(SessionAction.getSessionListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $sessionById = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.getSessionById),
      switchMap(({ sessionId }) =>
        this.http
          .get<GenericResponseInterface<SessionListInterface>>(
            `${environment.baseUrl}/Session/GetById`,
            {
              params: { id: sessionId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              SessionAction.getSessionByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(SessionAction.getSessionByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $sessionByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.getSessionByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<SessionListInterface[]>>(
            `${environment.baseUrl}/Session/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SessionAction.getSessionByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(SessionAction.getSessionByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $sessionExists = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.sessionExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Session/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SessionAction.sessionExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SessionAction.sessionExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $sessionCount = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.sessionCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/Session/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SessionAction.sessionCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(SessionAction.sessionCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createSession = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.createSession),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SessionListInterface>>(
            `${environment.baseUrl}/Session/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SessionAction.createSessionSuccess({ payload })
            ),
            catchError((error) => {
              return of(SessionAction.createSessionFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateSession = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.updateSession),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<SessionListInterface>>(
            `${environment.baseUrl}/Session/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SessionAction.updateSessionSuccess({ payload })
            ),
            catchError((error) => {
              return of(SessionAction.updateSessionFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteSession = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.deleteSession),
      switchMap(({ sessionId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Session/Delete`,
            {
              params: { id: sessionId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              SessionAction.deleteSessionSuccess({ payload })
            ),
            catchError((error) => {
              return of(SessionAction.deleteSessionFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManySessions = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.createManySessions),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SessionListInterface[]>>(
            `${environment.baseUrl}/Session/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SessionAction.createManySessionsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SessionAction.createManySessionsFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManySessions = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.updateManySessions),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SessionListInterface[]>>(
            `${environment.baseUrl}/Session/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SessionAction.updateManySessionsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SessionAction.updateManySessionsFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManySessions = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.deleteManySessions),
      switchMap(({ sessionIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Session/DeleteMany`,
            {
              params: { ids: sessionIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              SessionAction.deleteManySessionsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SessionAction.deleteManySessionsFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $sessionLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          SessionAction.createSession,
          SessionAction.updateSession,
          SessionAction.deleteSession,
          SessionAction.createManySessions,
          SessionAction.updateManySessions,
          SessionAction.deleteManySessions
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $sessionLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          SessionAction.createSessionSuccess,
          SessionAction.createSessionFail,
          SessionAction.updateSessionSuccess,
          SessionAction.updateSessionFail,
          SessionAction.deleteSessionSuccess,
          SessionAction.deleteSessionFail,
          SessionAction.createManySessionsSuccess,
          SessionAction.createManySessionsFail,
          SessionAction.updateManySessionsSuccess,
          SessionAction.updateManySessionsFail,
          SessionAction.deleteManySessionsSuccess,
          SessionAction.deleteManySessionsFail
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
