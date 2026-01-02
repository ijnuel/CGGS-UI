import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as SubjectAction from './subject.actions';
import { environment } from '../../../environments/environment';
import {
  SubjectListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  SubjectFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class SubjectEffect {
  // Get All (non-paginated)
  $subjectAll = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectAction.getSubjectAll),
      switchMap(() =>
        this.http
          .post<GenericResponseInterface<SubjectListInterface[]>>(
            `${environment.baseUrl}/Subject/GetAll`,
            [],
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SubjectAction.getSubjectAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(SubjectAction.getSubjectAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $subjectList = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectAction.getSubjectList),
      switchMap(({ pageQuery }) => {
        

        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<SubjectListInterface[]>>>(
            `${environment.baseUrl}/Subject/GetAllPaginated`,
            pageQuery,
            { withCredentials: true }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<SubjectListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return SubjectAction.getSubjectListSuccess({ 
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
              return of(SubjectAction.getSubjectListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $subjectById = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectAction.getSubjectById),
      switchMap(({ subjectId }) =>
        this.http
          .get<GenericResponseInterface<SubjectListInterface>>(
            `${environment.baseUrl}/Subject/GetById`,
            {
              params: { id: subjectId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              SubjectAction.getSubjectByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(SubjectAction.getSubjectByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $subjectByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectAction.getSubjectByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<SubjectListInterface[]>>(
            `${environment.baseUrl}/Subject/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SubjectAction.getSubjectByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(SubjectAction.getSubjectByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $subjectExists = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectAction.subjectExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Subject/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SubjectAction.subjectExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SubjectAction.subjectExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $subjectCount = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectAction.subjectCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/Subject/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SubjectAction.subjectCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(SubjectAction.subjectCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createSubject = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectAction.createSubject),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SubjectListInterface>>(
            `${environment.baseUrl}/Subject/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SubjectAction.createSubjectSuccess({ payload })
            ),
            catchError((error) => {
              return of(SubjectAction.createSubjectFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateSubject = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectAction.updateSubject),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<SubjectListInterface>>(
            `${environment.baseUrl}/Subject/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SubjectAction.updateSubjectSuccess({ payload })
            ),
            catchError((error) => {
              return of(SubjectAction.updateSubjectFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteSubject = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectAction.deleteSubject),
      switchMap(({ subjectId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Subject/Delete`,
            {
              params: { id: subjectId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              SubjectAction.deleteSubjectSuccess({ payload })
            ),
            catchError((error) => {
              return of(SubjectAction.deleteSubjectFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManySubjects = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectAction.createManySubjects),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SubjectListInterface[]>>(
            `${environment.baseUrl}/Subject/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SubjectAction.createManySubjectsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SubjectAction.createManySubjectsFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManySubjects = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectAction.updateManySubjects),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<SubjectListInterface[]>>(
            `${environment.baseUrl}/Subject/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              SubjectAction.updateManySubjectsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SubjectAction.updateManySubjectsFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManySubjects = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectAction.deleteManySubjects),
      switchMap(({ subjectIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Subject/DeleteMany`,
            {
              params: { ids: subjectIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              SubjectAction.deleteManySubjectsSuccess({ payload })
            ),
            catchError((error) => {
              return of(SubjectAction.deleteManySubjectsFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $subjectLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          SubjectAction.createSubject,
          SubjectAction.updateSubject,
          SubjectAction.deleteSubject,
          SubjectAction.createManySubjects,
          SubjectAction.updateManySubjects,
          SubjectAction.deleteManySubjects
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $subjectLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          SubjectAction.createSubjectSuccess,
          SubjectAction.createSubjectFail,
          SubjectAction.updateSubjectSuccess,
          SubjectAction.updateSubjectFail,
          SubjectAction.deleteSubjectSuccess,
          SubjectAction.deleteSubjectFail,
          SubjectAction.createManySubjectsSuccess,
          SubjectAction.createManySubjectsFail,
          SubjectAction.updateManySubjectsSuccess,
          SubjectAction.updateManySubjectsFail,
          SubjectAction.deleteManySubjectsSuccess,
          SubjectAction.deleteManySubjectsFail
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
