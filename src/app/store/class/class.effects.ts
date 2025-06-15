import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ClassAction from './class.actions';
import { environment } from '../../../environments/environment';
import {
  ClassListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  ClassFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class ClassEffect {
  // Get All (non-paginated)
  $classAll = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.getClassAll),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<ClassListInterface[]>>(
            `${environment.baseUrl}/Class/GetAll`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassAction.getClassAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassAction.getClassAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $classList = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.getClassList),
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
          .get<GenericResponseInterface<PaginatedResponseInterface<ClassListInterface[]>>>(
            `${environment.baseUrl}/Class/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<ClassListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return ClassAction.getClassListSuccess({ 
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
              return of(ClassAction.getClassListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $classById = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.getClassById),
      switchMap(({ classId }) =>
        this.http
          .get<GenericResponseInterface<ClassListInterface>>(
            `${environment.baseUrl}/Class/GetById`,
            {
              params: { id: classId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ClassAction.getClassByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassAction.getClassByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $classByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.getClassByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<ClassListInterface[]>>(
            `${environment.baseUrl}/Class/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassAction.getClassByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassAction.getClassByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $classExists = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.classExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Class/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassAction.classExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassAction.classExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $classCount = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.classCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/Class/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassAction.classCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassAction.classCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createClass = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.createClass),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassListInterface>>(
            `${environment.baseUrl}/Class/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassAction.createClassSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassAction.createClassFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateClass = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.updateClass),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<ClassListInterface>>(
            `${environment.baseUrl}/Class/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassAction.updateClassSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassAction.updateClassFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteClass = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.deleteClass),
      switchMap(({ classId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Class/Delete`,
            {
              params: { id: classId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ClassAction.deleteClassSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassAction.deleteClassFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyClasss = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.createManyClasss),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassListInterface[]>>(
            `${environment.baseUrl}/Class/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassAction.createManyClasssSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassAction.createManyClasssFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyClasss = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.updateManyClasss),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassListInterface[]>>(
            `${environment.baseUrl}/Class/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassAction.updateManyClasssSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassAction.updateManyClasssFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyClasss = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.deleteManyClasss),
      switchMap(({ classIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Class/DeleteMany`,
            {
              params: { ids: classIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ClassAction.deleteManyClasssSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassAction.deleteManyClasssFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $classLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ClassAction.createClass,
          ClassAction.updateClass,
          ClassAction.deleteClass,
          ClassAction.createManyClasss,
          ClassAction.updateManyClasss,
          ClassAction.deleteManyClasss
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $classLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ClassAction.createClassSuccess,
          ClassAction.createClassFail,
          ClassAction.updateClassSuccess,
          ClassAction.updateClassFail,
          ClassAction.deleteClassSuccess,
          ClassAction.deleteClassFail,
          ClassAction.createManyClasssSuccess,
          ClassAction.createManyClasssFail,
          ClassAction.updateManyClasssSuccess,
          ClassAction.updateManyClasssFail,
          ClassAction.deleteManyClasssSuccess,
          ClassAction.deleteManyClasssFail
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
