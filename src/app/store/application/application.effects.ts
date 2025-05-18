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
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class ApplicationEffect {
  $applicationList = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.getApplicationList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<ApplicationListInterface[]>
            >
          >(`${environment.baseUrl}/Application/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              ApplicationAction.getApplicationListSuccess({ payload })
            ),
            catchError((error) => {
              return of(ApplicationAction.getApplicationListFail({ error }));
            })
          )
      )
    )
  );

  $applicationById = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.getApplicationById),
      switchMap(({ applicationId }) =>
        this.http
          .get<GenericResponseInterface<ApplicationListInterface>>(
            `${environment.baseUrl}/Application/GetById`,
            {
              params: { applicationId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.getApplicationByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(ApplicationAction.getApplicationByIdFail({ error }));
            })
          )
      )
    )
  );

  $createApplication = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.createApplication),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ApplicationListInterface>>(
            `${environment.baseUrl}/Application/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.createApplicationSuccess({
                message: 'Application created successfully',
                application: payload.entity,
              })
            ),
            catchError((error) => {
              return of(ApplicationAction.createApplicationFail({ error }));
            })
          )
      )
    )
  );

  $updateApplication = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationAction.editApplication),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ApplicationListInterface>>(
            `${environment.baseUrl}/Application/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ApplicationAction.editApplicationSuccess({
                message: 'Application updated successfully',
                application: payload.entity,
              })
            ),
            catchError((error) => {
              return of(ApplicationAction.editApplicationFail({ error }));
            })
          )
      )
    )
  );

  $applicationLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ApplicationAction.createApplication, ApplicationAction.editApplication),
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
          ApplicationAction.editApplicationSuccess,
          ApplicationAction.editApplicationFail
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
