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
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class SessionEffect {
  $sessionList = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.getSessionList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<SessionListInterface[]>
            >
          >(`${environment.baseUrl}/Session/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              SessionAction.getSessionListSuccess({ payload })
            ),
            catchError((error) => {
              return of(SessionAction.getSessionListFail({ error }));
            })
          )
      )
    )
  );

  $sessionById = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.getSessionById),
      switchMap(({ sessionId }) =>
        this.http
          .get<GenericResponseInterface<SessionListInterface>>(
            `${environment.baseUrl}/Session/GetById`,
            {
              params: { sessionId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              SessionAction.getSessionByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(SessionAction.getSessionByIdFail({ error }));
            })
          )
      )
    )
  );

  $createSession = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.createSession),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SessionListInterface>>(
            `${environment.baseUrl}/Session/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SessionAction.createSessionSuccess({
                message: 'Session created successfully',
                session: payload.entity,
              })
            ),
            catchError((error) => {
              return of(SessionAction.createSessionFail({ error }));
            })
          )
      )
    )
  );

  $updateSession = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionAction.editSession),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SessionListInterface>>(
            `${environment.baseUrl}/Session/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SessionAction.editSessionSuccess({
                message: 'Session updated successfully',
                session: payload.entity,
              })
            ),
            catchError((error) => {
              return of(SessionAction.editSessionFail({ error }));
            })
          )
      )
    )
  );

  $sessionLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SessionAction.createSession, SessionAction.editSession),
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
          SessionAction.editSessionSuccess,
          SessionAction.editSessionFail
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
