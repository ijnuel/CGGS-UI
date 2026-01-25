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
  LocalGovernmentAreaFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class LocalGovernmentAreaEffect {
  // Get All (non-paginated)
  $localGovernmentAreaAll = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.getLocalGovernmentAreaAll),
      switchMap(() =>
        this.http
          .post<GenericResponseInterface<LocalGovernmentAreaListInterface[]>>(
            `${environment.baseUrl}/LocalGovernmentArea/GetAll`,
            {},
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.getLocalGovernmentAreaAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.getLocalGovernmentAreaAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $localGovernmentAreaList = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.getLocalGovernmentAreaList),
      switchMap(({ pageQuery }) => {
        

        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<LocalGovernmentAreaListInterface[]>>>(
            `${environment.baseUrl}/LocalGovernmentArea/GetAllPaginated`,
            pageQuery,
            { withCredentials: true }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<LocalGovernmentAreaListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return LocalGovernmentAreaAction.getLocalGovernmentAreaListSuccess({ 
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
              return of(LocalGovernmentAreaAction.getLocalGovernmentAreaListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $localGovernmentAreaById = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.getLocalGovernmentAreaById),
      switchMap(({ localGovernmentAreaId }) =>
        this.http
          .get<GenericResponseInterface<LocalGovernmentAreaListInterface>>(
            `${environment.baseUrl}/LocalGovernmentArea/GetById`,
            {
              params: { id: localGovernmentAreaId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.getLocalGovernmentAreaByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.getLocalGovernmentAreaByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $localGovernmentAreaByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.getLocalGovernmentAreaByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<LocalGovernmentAreaListInterface[]>>(
            `${environment.baseUrl}/LocalGovernmentArea/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.getLocalGovernmentAreaByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.getLocalGovernmentAreaByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $localGovernmentAreaExists = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.localGovernmentAreaExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/LocalGovernmentArea/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.localGovernmentAreaExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.localGovernmentAreaExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $localGovernmentAreaCount = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.localGovernmentAreaCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/LocalGovernmentArea/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.localGovernmentAreaCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.localGovernmentAreaCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createLocalGovernmentArea = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.createLocalGovernmentArea),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<LocalGovernmentAreaListInterface>>(
            `${environment.baseUrl}/LocalGovernmentArea/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.createLocalGovernmentAreaSuccess({ payload })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.createLocalGovernmentAreaFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateLocalGovernmentArea = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.updateLocalGovernmentArea),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<LocalGovernmentAreaListInterface>>(
            `${environment.baseUrl}/LocalGovernmentArea/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.updateLocalGovernmentAreaSuccess({ payload })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.updateLocalGovernmentAreaFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteLocalGovernmentArea = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.deleteLocalGovernmentArea),
      switchMap(({ localGovernmentAreaId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/LocalGovernmentArea/Delete`,
            {
              params: { id: localGovernmentAreaId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.deleteLocalGovernmentAreaSuccess({ payload })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.deleteLocalGovernmentAreaFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyLocalGovernmentAreas = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.createManyLocalGovernmentAreas),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<LocalGovernmentAreaListInterface[]>>(
            `${environment.baseUrl}/LocalGovernmentArea/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.createManyLocalGovernmentAreasSuccess({ payload })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.createManyLocalGovernmentAreasFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyLocalGovernmentAreas = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.updateManyLocalGovernmentAreas),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<LocalGovernmentAreaListInterface[]>>(
            `${environment.baseUrl}/LocalGovernmentArea/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.updateManyLocalGovernmentAreasSuccess({ payload })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.updateManyLocalGovernmentAreasFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyLocalGovernmentAreas = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalGovernmentAreaAction.deleteManyLocalGovernmentAreas),
      switchMap(({ localGovernmentAreaIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/LocalGovernmentArea/DeleteMany`,
            {
              params: { ids: localGovernmentAreaIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              LocalGovernmentAreaAction.deleteManyLocalGovernmentAreasSuccess({ payload })
            ),
            catchError((error) => {
              return of(LocalGovernmentAreaAction.deleteManyLocalGovernmentAreasFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $localGovernmentAreaLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          LocalGovernmentAreaAction.createLocalGovernmentArea,
          LocalGovernmentAreaAction.updateLocalGovernmentArea,
          LocalGovernmentAreaAction.deleteLocalGovernmentArea,
          LocalGovernmentAreaAction.createManyLocalGovernmentAreas,
          LocalGovernmentAreaAction.updateManyLocalGovernmentAreas,
          LocalGovernmentAreaAction.deleteManyLocalGovernmentAreas
        ),
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
          LocalGovernmentAreaAction.updateLocalGovernmentAreaSuccess,
          LocalGovernmentAreaAction.updateLocalGovernmentAreaFail,
          LocalGovernmentAreaAction.deleteLocalGovernmentAreaSuccess,
          LocalGovernmentAreaAction.deleteLocalGovernmentAreaFail,
          LocalGovernmentAreaAction.createManyLocalGovernmentAreasSuccess,
          LocalGovernmentAreaAction.createManyLocalGovernmentAreasFail,
          LocalGovernmentAreaAction.updateManyLocalGovernmentAreasSuccess,
          LocalGovernmentAreaAction.updateManyLocalGovernmentAreasFail,
          LocalGovernmentAreaAction.deleteManyLocalGovernmentAreasSuccess,
          LocalGovernmentAreaAction.deleteManyLocalGovernmentAreasFail
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
