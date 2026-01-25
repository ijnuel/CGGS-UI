import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ClassLevelAction from './class-level.actions';
import { environment } from '../../../environments/environment';
import {
  ClassLevelListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  ClassLevelFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class ClassLevelEffect {
  // Get All (non-paginated)
  $classLevelAll = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.getClassLevelAll),
      switchMap(({ query }) =>
        this.http
          .post<GenericResponseInterface<ClassLevelListInterface[]>>(
            `${environment.baseUrl}/ClassLevel/GetAll`,
            query ?? {},
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.getClassLevelAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassLevelAction.getClassLevelAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $classLevelList = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.getClassLevelList),
      switchMap(({ pageQuery }) => {
        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<ClassLevelListInterface[]>>>(
            `${environment.baseUrl}/ClassLevel/GetAllPaginated`,
            pageQuery,
            { withCredentials: true }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<ClassLevelListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return ClassLevelAction.getClassLevelListSuccess({ 
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
              return of(ClassLevelAction.getClassLevelListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $classLevelById = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.getClassLevelById),
      switchMap(({ classLevelId }) =>
        this.http
          .get<GenericResponseInterface<ClassLevelListInterface>>(
            `${environment.baseUrl}/ClassLevel/GetById`,
            {
              params: { id: classLevelId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.getClassLevelByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassLevelAction.getClassLevelByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $classLevelByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.getClassLevelByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<ClassLevelListInterface[]>>(
            `${environment.baseUrl}/ClassLevel/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.getClassLevelByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassLevelAction.getClassLevelByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $classLevelExists = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.classLevelExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ClassLevel/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.classLevelExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassLevelAction.classLevelExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $classLevelCount = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.classLevelCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/ClassLevel/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.classLevelCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassLevelAction.classLevelCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createClassLevel = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.createClassLevel),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassLevelListInterface>>(
            `${environment.baseUrl}/ClassLevel/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.createClassLevelSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassLevelAction.createClassLevelFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateClassLevel = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.updateClassLevel),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<ClassLevelListInterface>>(
            `${environment.baseUrl}/ClassLevel/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.updateClassLevelSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassLevelAction.updateClassLevelFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteClassLevel = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.deleteClassLevel),
      switchMap(({ classLevelId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ClassLevel/Delete`,
            {
              params: { id: classLevelId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.deleteClassLevelSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassLevelAction.deleteClassLevelFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyClassLevels = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.createManyClassLevels),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassLevelListInterface[]>>(
            `${environment.baseUrl}/ClassLevel/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.createManyClassLevelsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassLevelAction.createManyClassLevelsFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyClassLevels = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.updateManyClassLevels),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassLevelListInterface[]>>(
            `${environment.baseUrl}/ClassLevel/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.updateManyClassLevelsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassLevelAction.updateManyClassLevelsFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyClassLevels = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.deleteManyClassLevels),
      switchMap(({ classLevelIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ClassLevel/DeleteMany`,
            {
              params: { ids: classLevelIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.deleteManyClassLevelsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassLevelAction.deleteManyClassLevelsFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $classLevelLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ClassLevelAction.createClassLevel,
          ClassLevelAction.updateClassLevel,
          ClassLevelAction.deleteClassLevel,
          ClassLevelAction.createManyClassLevels,
          ClassLevelAction.updateManyClassLevels,
          ClassLevelAction.deleteManyClassLevels
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $classLevelLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ClassLevelAction.createClassLevelSuccess,
          ClassLevelAction.createClassLevelFail,
          ClassLevelAction.updateClassLevelSuccess,
          ClassLevelAction.updateClassLevelFail,
          ClassLevelAction.deleteClassLevelSuccess,
          ClassLevelAction.deleteClassLevelFail,
          ClassLevelAction.createManyClassLevelsSuccess,
          ClassLevelAction.createManyClassLevelsFail,
          ClassLevelAction.updateManyClassLevelsSuccess,
          ClassLevelAction.updateManyClassLevelsFail,
          ClassLevelAction.deleteManyClassLevelsSuccess,
          ClassLevelAction.deleteManyClassLevelsFail
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
