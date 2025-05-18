import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AdministratorAction from './administrator.actions';
import { environment } from '../../../environments/environment';
import {
  AdministratorListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class AdministratorEffect {
  $administratorList = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.getAdministratorList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<AdministratorListInterface[]>
            >
          >(`${environment.baseUrl}/Administrator/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              AdministratorAction.getAdministratorListSuccess({ payload })
            ),
            catchError((error) => {
              return of(AdministratorAction.getAdministratorListFail({ error }));
            })
          )
      )
    )
  );

  $administratorById = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.getAdministratorById),
      switchMap(({ administratorId }) =>
        this.http
          .get<GenericResponseInterface<AdministratorListInterface>>(
            `${environment.baseUrl}/Administrator/GetById`,
            {
              params: { administratorId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.getAdministratorByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(AdministratorAction.getAdministratorByIdFail({ error }));
            })
          )
      )
    )
  );

  $createAdministrator = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.createAdministrator),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<AdministratorListInterface>>(
            `${environment.baseUrl}/Administrator/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.createAdministratorSuccess({
                message: 'Administrator created successfully',
                administrator: payload.entity,
              })
            ),
            catchError((error) => {
              return of(AdministratorAction.createAdministratorFail({ error }));
            })
          )
      )
    )
  );

  $updateAdministrator = createEffect(() =>
    this.actions$.pipe(
      ofType(AdministratorAction.editAdministrator),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<AdministratorListInterface>>(
            `${environment.baseUrl}/Administrator/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              AdministratorAction.editAdministratorSuccess({
                message: 'Administrator updated successfully',
                administrator: payload.entity,
              })
            ),
            catchError((error) => {
              return of(AdministratorAction.editAdministratorFail({ error }));
            })
          )
      )
    )
  );

  $administratorLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdministratorAction.createAdministrator, AdministratorAction.editAdministrator),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $administratorLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AdministratorAction.createAdministratorSuccess,
          AdministratorAction.createAdministratorFail,
          AdministratorAction.editAdministratorSuccess,
          AdministratorAction.editAdministratorFail
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
