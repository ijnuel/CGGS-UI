import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ProgramTypeAction from './program-type.actions';
import { environment } from '../../../environments/environment';
import {
  ProgramTypeListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  ProgramTypeFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class ProgramTypeEffect {
  // Get All (non-paginated)
  $programTypeAll = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.getProgramTypeAll),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<ProgramTypeListInterface[]>>(
            `${environment.baseUrl}/ProgramType/GetAll`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.getProgramTypeAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.getProgramTypeAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $programTypeList = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.getProgramTypeList),
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
          .get<GenericResponseInterface<PaginatedResponseInterface<ProgramTypeListInterface[]>>>(
            `${environment.baseUrl}/ProgramType/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<ProgramTypeListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return ProgramTypeAction.getProgramTypeListSuccess({ 
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
              return of(ProgramTypeAction.getProgramTypeListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $programTypeById = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.getProgramTypeById),
      switchMap(({ programTypeId }) =>
        this.http
          .get<GenericResponseInterface<ProgramTypeListInterface>>(
            `${environment.baseUrl}/ProgramType/GetById`,
            {
              params: { id: programTypeId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.getProgramTypeByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.getProgramTypeByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $programTypeByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.getProgramTypeByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<ProgramTypeListInterface[]>>(
            `${environment.baseUrl}/ProgramType/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.getProgramTypeByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.getProgramTypeByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $programTypeExists = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.programTypeExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ProgramType/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.programTypeExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.programTypeExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $programTypeCount = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.programTypeCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/ProgramType/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.programTypeCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.programTypeCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createProgramType = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.createProgramType),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ProgramTypeListInterface>>(
            `${environment.baseUrl}/ProgramType/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.createProgramTypeSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.createProgramTypeFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateProgramType = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.updateProgramType),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<ProgramTypeListInterface>>(
            `${environment.baseUrl}/ProgramType/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.updateProgramTypeSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.updateProgramTypeFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteProgramType = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.deleteProgramType),
      switchMap(({ programTypeId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ProgramType/Delete`,
            {
              params: { id: programTypeId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.deleteProgramTypeSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.deleteProgramTypeFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyProgramTypes = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.createManyProgramTypes),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ProgramTypeListInterface[]>>(
            `${environment.baseUrl}/ProgramType/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.createManyProgramTypesSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.createManyProgramTypesFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyProgramTypes = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.updateManyProgramTypes),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ProgramTypeListInterface[]>>(
            `${environment.baseUrl}/ProgramType/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.updateManyProgramTypesSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.updateManyProgramTypesFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyProgramTypes = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramTypeAction.deleteManyProgramTypes),
      switchMap(({ programTypeIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ProgramType/DeleteMany`,
            {
              params: { ids: programTypeIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ProgramTypeAction.deleteManyProgramTypesSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgramTypeAction.deleteManyProgramTypesFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $programTypeLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProgramTypeAction.createProgramType,
          ProgramTypeAction.updateProgramType,
          ProgramTypeAction.deleteProgramType,
          ProgramTypeAction.createManyProgramTypes,
          ProgramTypeAction.updateManyProgramTypes,
          ProgramTypeAction.deleteManyProgramTypes
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $programTypeLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProgramTypeAction.createProgramTypeSuccess,
          ProgramTypeAction.createProgramTypeFail,
          ProgramTypeAction.updateProgramTypeSuccess,
          ProgramTypeAction.updateProgramTypeFail,
          ProgramTypeAction.deleteProgramTypeSuccess,
          ProgramTypeAction.deleteProgramTypeFail,
          ProgramTypeAction.createManyProgramTypesSuccess,
          ProgramTypeAction.createManyProgramTypesFail,
          ProgramTypeAction.updateManyProgramTypesSuccess,
          ProgramTypeAction.updateManyProgramTypesFail,
          ProgramTypeAction.deleteManyProgramTypesSuccess,
          ProgramTypeAction.deleteManyProgramTypesFail
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
