import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ParentAction from './parent.actions';
import { environment } from '../../../environments/environment';
import {
  ParentListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class ParentEffect {
  $parentList = createEffect(() =>
    this.actions$.pipe(
      ofType(ParentAction.getParentList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<ParentListInterface[]>
            >
          >(`${environment.baseUrl}/Parent/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              ParentAction.getParentListSuccess({ payload })
            ),
            catchError((error) => {
              return of(ParentAction.getParentListFail({ error }));
            })
          )
      )
    )
  );

  $parentById = createEffect(() =>
    this.actions$.pipe(
      ofType(ParentAction.getParentById),
      switchMap(({ parentId }) =>
        this.http
          .get<GenericResponseInterface<ParentListInterface>>(
            `${environment.baseUrl}/Parent/GetById`,
            {
              params: { parentId },
              // withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ParentAction.getParentByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(ParentAction.getParentByIdFail({ error }));
            })
          )
      )
    )
  );

  $createParent = createEffect(() =>
    this.actions$.pipe(
      ofType(ParentAction.createParent),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ParentListInterface>>(
            `${environment.baseUrl}/Parent/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ParentAction.createParentSuccess({
                message: 'Parent created successfully',
                parent: payload.entity,
              })
            ),
            catchError((error) => {
              return of(ParentAction.createParentFail({ error }));
            })
          )
      )
    )
  );

  $updateParent = createEffect(() =>
    this.actions$.pipe(
      ofType(ParentAction.editParent),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ParentListInterface>>(
            `${environment.baseUrl}/Parent/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ParentAction.editParentSuccess({
                message: 'Parent updated successfully',
                parent: payload.entity,
              })
            ),
            catchError((error) => {
              return of(ParentAction.editParentFail({ error }));
            })
          )
      )
    )
  );

  $parentLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ParentAction.createParent, ParentAction.editParent),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $parentLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ParentAction.createParentSuccess,
          ParentAction.createParentFail,
          ParentAction.editParentSuccess,
          ParentAction.editParentFail
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
