import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as StateAction from './state.actions';
import { environment } from '../../../environments/environment';
import {
  StateListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class StateEffect {
  $stateList = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.getStateList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<StateListInterface[]>
            >
          >(`${environment.baseUrl}/State/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              StateAction.getStateListSuccess({ payload })
            ),
            catchError((error) => {
              return of(StateAction.getStateListFail({ error }));
            })
          )
      )
    )
  );

  $stateById = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.getStateById),
      switchMap(({ stateId }) =>
        this.http
          .get<GenericResponseInterface<StateListInterface>>(
            `${environment.baseUrl}/State/GetById`,
            {
              params: { stateId },
              // withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              StateAction.getStateByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(StateAction.getStateByIdFail({ error }));
            })
          )
      )
    )
  );

  $createState = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.createState),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StateListInterface>>(
            `${environment.baseUrl}/State/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StateAction.createStateSuccess({
                message: 'State created successfully',
                state: payload.entity,
              })
            ),
            catchError((error) => {
              return of(StateAction.createStateFail({ error }));
            })
          )
      )
    )
  );

  $updateState = createEffect(() =>
    this.actions$.pipe(
      ofType(StateAction.editState),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StateListInterface>>(
            `${environment.baseUrl}/State/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StateAction.editStateSuccess({
                message: 'State updated successfully',
                state: payload.entity,
              })
            ),
            catchError((error) => {
              return of(StateAction.editStateFail({ error }));
            })
          )
      )
    )
  );

  $stateLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StateAction.createState, StateAction.editState),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $stateLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          StateAction.createStateSuccess,
          StateAction.createStateFail,
          StateAction.editStateSuccess,
          StateAction.editStateFail
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
