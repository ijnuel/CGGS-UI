import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ClassSubjectAction from './class-subject.actions';
import { environment } from '../../../environments/environment';
import {
  ClassSubjectListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  ClassSubjectFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class ClassSubjectEffect {
  // Get All (non-paginated)
  $classSubjectAll = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAction.getClassSubjectAll),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<ClassSubjectListInterface[]>>(
            `${environment.baseUrl}/ClassSubject/GetAll`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAction.getClassSubjectAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAction.getClassSubjectAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $classSubjectList = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAction.getClassSubjectList),
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
          .get<GenericResponseInterface<PaginatedResponseInterface<ClassSubjectListInterface[]>>>(
            `${environment.baseUrl}/ClassSubject/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<ClassSubjectListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return ClassSubjectAction.getClassSubjectListSuccess({ 
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
              return of(ClassSubjectAction.getClassSubjectListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $classSubjectById = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAction.getClassSubjectById),
      switchMap(({ classSubjectId }) =>
        this.http
          .get<GenericResponseInterface<ClassSubjectListInterface>>(
            `${environment.baseUrl}/ClassSubject/GetById`,
            {
              params: { id: classSubjectId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAction.getClassSubjectByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAction.getClassSubjectByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $classSubjectByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAction.getClassSubjectByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<ClassSubjectListInterface[]>>(
            `${environment.baseUrl}/ClassSubject/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAction.getClassSubjectByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAction.getClassSubjectByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $classSubjectExists = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAction.classSubjectExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ClassSubject/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAction.classSubjectExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAction.classSubjectExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $classSubjectCount = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAction.classSubjectCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/ClassSubject/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAction.classSubjectCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAction.classSubjectCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createClassSubject = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAction.createClassSubject),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassSubjectListInterface>>(
            `${environment.baseUrl}/ClassSubject/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAction.createClassSubjectSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAction.createClassSubjectFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateClassSubject = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAction.updateClassSubject),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<ClassSubjectListInterface>>(
            `${environment.baseUrl}/ClassSubject/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAction.updateClassSubjectSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAction.updateClassSubjectFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteClassSubject = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAction.deleteClassSubject),
      switchMap(({ classSubjectId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ClassSubject/Delete`,
            {
              params: { id: classSubjectId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAction.deleteClassSubjectSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAction.deleteClassSubjectFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyClassSubjects = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAction.createManyClassSubjects),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassSubjectListInterface[]>>(
            `${environment.baseUrl}/ClassSubject/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAction.createManyClassSubjectsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAction.createManyClassSubjectsFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyClassSubjects = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAction.updateManyClassSubjects),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassSubjectListInterface[]>>(
            `${environment.baseUrl}/ClassSubject/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAction.updateManyClassSubjectsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAction.updateManyClassSubjectsFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyClassSubjects = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAction.deleteManyClassSubjects),
      switchMap(({ classSubjectIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ClassSubject/DeleteMany`,
            {
              params: { ids: classSubjectIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAction.deleteManyClassSubjectsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAction.deleteManyClassSubjectsFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $classSubjectLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ClassSubjectAction.createClassSubject,
          ClassSubjectAction.updateClassSubject,
          ClassSubjectAction.deleteClassSubject,
          ClassSubjectAction.createManyClassSubjects,
          ClassSubjectAction.updateManyClassSubjects,
          ClassSubjectAction.deleteManyClassSubjects
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $classSubjectLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ClassSubjectAction.createClassSubjectSuccess,
          ClassSubjectAction.createClassSubjectFail,
          ClassSubjectAction.updateClassSubjectSuccess,
          ClassSubjectAction.updateClassSubjectFail,
          ClassSubjectAction.deleteClassSubjectSuccess,
          ClassSubjectAction.deleteClassSubjectFail,
          ClassSubjectAction.createManyClassSubjectsSuccess,
          ClassSubjectAction.createManyClassSubjectsFail,
          ClassSubjectAction.updateManyClassSubjectsSuccess,
          ClassSubjectAction.updateManyClassSubjectsFail,
          ClassSubjectAction.deleteManyClassSubjectsSuccess,
          ClassSubjectAction.deleteManyClassSubjectsFail
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
