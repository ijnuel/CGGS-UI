import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as LocalGovernmentAreaAction from './local-government-area.actions';
import { environment } from '../../../environments/environment';
import {
  LocalGovernmentAreaListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class LocalGovernmentAreaEffect {
  $localGovernmentAreaList = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.getLocalGovernmentAreaList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<LocalGovernmentAreaListInterface[]>
            >
          >(`${environment.baseUrl}/LocalGovernmentArea/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.getLocalGovernmentAreaListSuccess({ payload })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.getLocalGovernmentAreaListFail({ error }));
            })
          )
      )
    )
  );

  $localGovernmentAreaById = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.getLocalGovernmentAreaById),
      switchMap(({ localGovernmentAreaId }) =>
        this.http
          .get<GenericResponseInterface<LocalGovernmentAreaListInterface>>(
            `${environment.baseUrl}/LocalGovernmentArea/GetById`,
            {
              params: { localGovernmentAreaId },
              // withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.getLocalGovernmentAreaByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.getLocalGovernmentAreaByIdFail({ error }));
            })
          )
      )
    )
  );

  $createLocalGovernmentArea = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.createLocalGovernmentArea),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<LocalGovernmentAreaListInterface>>(
            `${environment.baseUrl}/LocalGovernmentArea/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.createLocalGovernmentAreaSuccess({
                message: 'LocalGovernmentArea created successfully',
                localGovernmentArea: payload.entity,
              })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.createLocalGovernmentAreaFail({ error }));
            })
          )
      )
    )
  );

  $updateLocalGovernmentArea = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.editLocalGovernmentArea),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<LocalGovernmentAreaListInterface>>(
            `${environment.baseUrl}/LocalGovernmentArea/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.editLocalGovernmentAreaSuccess({
                message: 'LocalGovernmentArea updated successfully',
                localGovernmentArea: payload.entity,
              })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.editLocalGovernmentAreaFail({ error }));
            })
          )
      )
    )
  );

  $localGovernmentAreaLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocalGovernmentAreaAction.createLocalGovernmentArea, LocalGovernmentAreaAction.editLocalGovernmentArea),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $localGovernmentAreaLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          LocalGovernmentAreaAction.createLocalGovernmentAreaSuccess,
          LocalGovernmentAreaAction.createLocalGovernmentAreaFail,
          LocalGovernmentAreaAction.editLocalGovernmentAreaSuccess,
          LocalGovernmentAreaAction.editLocalGovernmentAreaFail
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
