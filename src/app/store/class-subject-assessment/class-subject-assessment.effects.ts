import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ClassSubjectAssessmentAction from './class-subject-assessment.actions';
import { environment } from '../../../environments/environment';
import {
  ClassSubjectAssessmentListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  ClassSubjectAssessmentFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class ClassSubjectAssessmentEffect {
  // Get All (non-paginated)
  $classSubjectAssessmentAll = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.getClassSubjectAssessmentAll),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<ClassSubjectAssessmentListInterface[]>>(
            `${environment.baseUrl}/ClassSubjectAssessment/GetAll`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAssessmentAction.getClassSubjectAssessmentAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAssessmentAction.getClassSubjectAssessmentAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $classSubjectAssessmentList = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.getClassSubjectAssessmentList),
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
          .get<GenericResponseInterface<PaginatedResponseInterface<ClassSubjectAssessmentListInterface[]>>>(
            `${environment.baseUrl}/ClassSubjectAssessment/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<ClassSubjectAssessmentListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return ClassSubjectAssessmentAction.getClassSubjectAssessmentListSuccess({ 
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
              return of(ClassSubjectAssessmentAction.getClassSubjectAssessmentListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $classSubjectAssessmentById = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.getClassSubjectAssessmentById),
      switchMap(({ classSubjectAssessmentId }) =>
        this.http
          .get<GenericResponseInterface<ClassSubjectAssessmentListInterface>>(
            `${environment.baseUrl}/ClassSubjectAssessment/GetById`,
            {
              params: { id: classSubjectAssessmentId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAssessmentAction.getClassSubjectAssessmentByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAssessmentAction.getClassSubjectAssessmentByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $classSubjectAssessmentByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.getClassSubjectAssessmentByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<ClassSubjectAssessmentListInterface[]>>(
            `${environment.baseUrl}/ClassSubjectAssessment/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAssessmentAction.getClassSubjectAssessmentByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAssessmentAction.getClassSubjectAssessmentByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $classSubjectAssessmentExists = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.classSubjectAssessmentExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ClassSubjectAssessment/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAssessmentAction.classSubjectAssessmentExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAssessmentAction.classSubjectAssessmentExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $classSubjectAssessmentCount = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.classSubjectAssessmentCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/ClassSubjectAssessment/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAssessmentAction.classSubjectAssessmentCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAssessmentAction.classSubjectAssessmentCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createClassSubjectAssessment = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.createClassSubjectAssessment),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassSubjectAssessmentListInterface>>(
            `${environment.baseUrl}/ClassSubjectAssessment/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAssessmentAction.createClassSubjectAssessmentSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAssessmentAction.createClassSubjectAssessmentFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateClassSubjectAssessment = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.updateClassSubjectAssessment),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<ClassSubjectAssessmentListInterface>>(
            `${environment.baseUrl}/ClassSubjectAssessment/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAssessmentAction.updateClassSubjectAssessmentSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAssessmentAction.updateClassSubjectAssessmentFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteClassSubjectAssessment = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.deleteClassSubjectAssessment),
      switchMap(({ classSubjectAssessmentId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ClassSubjectAssessment/Delete`,
            {
              params: { id: classSubjectAssessmentId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAssessmentAction.deleteClassSubjectAssessmentSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAssessmentAction.deleteClassSubjectAssessmentFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyClassSubjectAssessments = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.createManyClassSubjectAssessments),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassSubjectAssessmentListInterface[]>>(
            `${environment.baseUrl}/ClassSubjectAssessment/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAssessmentAction.createManyClassSubjectAssessmentsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAssessmentAction.createManyClassSubjectAssessmentsFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyClassSubjectAssessments = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.updateManyClassSubjectAssessments),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassSubjectAssessmentListInterface[]>>(
            `${environment.baseUrl}/ClassSubjectAssessment/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAssessmentAction.updateManyClassSubjectAssessmentsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAssessmentAction.updateManyClassSubjectAssessmentsFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyClassSubjectAssessments = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.deleteManyClassSubjectAssessments),
      switchMap(({ classSubjectAssessmentIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ClassSubjectAssessment/DeleteMany`,
            {
              params: { ids: classSubjectAssessmentIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ClassSubjectAssessmentAction.deleteManyClassSubjectAssessmentsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectAssessmentAction.deleteManyClassSubjectAssessmentsFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $classSubjectAssessmentLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ClassSubjectAssessmentAction.createClassSubjectAssessment,
          ClassSubjectAssessmentAction.updateClassSubjectAssessment,
          ClassSubjectAssessmentAction.deleteClassSubjectAssessment,
          ClassSubjectAssessmentAction.createManyClassSubjectAssessments,
          ClassSubjectAssessmentAction.updateManyClassSubjectAssessments,
          ClassSubjectAssessmentAction.deleteManyClassSubjectAssessments
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $classSubjectAssessmentLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ClassSubjectAssessmentAction.createClassSubjectAssessmentSuccess,
          ClassSubjectAssessmentAction.createClassSubjectAssessmentFail,
          ClassSubjectAssessmentAction.updateClassSubjectAssessmentSuccess,
          ClassSubjectAssessmentAction.updateClassSubjectAssessmentFail,
          ClassSubjectAssessmentAction.deleteClassSubjectAssessmentSuccess,
          ClassSubjectAssessmentAction.deleteClassSubjectAssessmentFail,
          ClassSubjectAssessmentAction.createManyClassSubjectAssessmentsSuccess,
          ClassSubjectAssessmentAction.createManyClassSubjectAssessmentsFail,
          ClassSubjectAssessmentAction.updateManyClassSubjectAssessmentsSuccess,
          ClassSubjectAssessmentAction.updateManyClassSubjectAssessmentsFail,
          ClassSubjectAssessmentAction.deleteManyClassSubjectAssessmentsSuccess,
          ClassSubjectAssessmentAction.deleteManyClassSubjectAssessmentsFail
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
