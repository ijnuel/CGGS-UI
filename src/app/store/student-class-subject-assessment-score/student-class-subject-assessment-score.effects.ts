import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { 
  StudentClassSubjectAssessmentScoreListInterface, 
  StudentClassSubjectAssessmentScoreFormInterface 
} from '../../types/student-class-subject-assessment-score';
import { GenericResponseInterface, PaginatedResponseInterface, PageQueryInterface } from '../../types';
import * as StudentClassSubjectAssessmentScoreActions from './student-class-subject-assessment-score.actions';

@Injectable()
export class StudentClassSubjectAssessmentScoreEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  // Get All
  getStudentClassSubjectAssessmentScoreAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreAll),
      mergeMap(() =>
        this.http
          .post<GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]>>(
            `${environment.baseUrl}/StudentClassSubjectAssessmentScore/GetAll`,
            [],
            { withCredentials: true }
          )
          .pipe(
            map((response) => StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreAllSuccess({ payload: response })),
            catchError((error) => of(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreAllFail({ error: error.message })))
          )
      )
    )
  );

  // Get List (Paginated)
  getStudentClassSubjectAssessmentScoreList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreList),
      switchMap(({ pageQuery }) => {
        const params: { [key: string]: string | number } = {
          start: pageQuery.start,
          recordsPerPage: pageQuery.recordsPerPage,
          pageIndex: pageQuery.pageIndex || 0
        };
        if (pageQuery.searchText) { params['searchText'] = pageQuery.searchText; }
        if (pageQuery.queryProperties && pageQuery.queryProperties.length > 0) { params['queryProperties'] = JSON.stringify(pageQuery.queryProperties); }
        
        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]>>>(
            `${environment.baseUrl}/StudentClassSubjectAssessmentScore/GetAllPaginated`,
            pageQuery,
            { withCredentials: true }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreListSuccess({
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
            catchError((error) => of(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreListFail({ error: error.message })))
          );
      })
    )
  );

  // Get By Id
  getStudentClassSubjectAssessmentScoreById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreById),
      mergeMap(({ id }) => {
        const params = new HttpParams().set('id', id);
        return this.http
          .get<GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface>>(
            `${environment.baseUrl}/StudentClassSubjectAssessmentScore/GetById`,
            { params, withCredentials: true }
          )
          .pipe(
            map((response) => StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreByIdSuccess({ payload: response })),
            catchError((error) => of(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreByIdFail({ error: error.message })))
          );
      })
    )
  );

  // Get By Properties
  getStudentClassSubjectAssessmentScoreByProperties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreByProperties),
      mergeMap(({ properties }) => {
        const params = new HttpParams().set('properties', JSON.stringify(properties));
        return this.http
          .get<GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]>>(
            `${environment.baseUrl}/StudentClassSubjectAssessmentScore/GetByProperties`,
            { params, withCredentials: true }
          )
          .pipe(
            map((response) => StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreByPropertiesSuccess({ payload: response })),
            catchError((error) => of(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreByPropertiesFail({ error: error.message })))
          );
      })
    )
  );

  // Exists
  studentClassSubjectAssessmentScoreExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreExists),
      mergeMap(({ properties }) => {
        const params = new HttpParams().set('properties', JSON.stringify(properties));
        return this.http
          .get<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/StudentClassSubjectAssessmentScore/Exists`,
            { params, withCredentials: true }
          )
          .pipe(
            map((response) => StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreExistsSuccess({ payload: response })),
            catchError((error) => of(StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreExistsFail({ error: error.message })))
          );
      })
    )
  );

  // Count
  studentClassSubjectAssessmentScoreCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreCount),
      mergeMap(({ properties }) => {
        const params = new HttpParams().set('properties', JSON.stringify(properties));
        return this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/StudentClassSubjectAssessmentScore/Count`,
            { params, withCredentials: true }
          )
          .pipe(
            map((response) => StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreCountSuccess({ payload: response })),
            catchError((error) => of(StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreCountFail({ error: error.message })))
          );
      })
    )
  );

  // Create
  createStudentClassSubjectAssessmentScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassSubjectAssessmentScoreActions.createStudentClassSubjectAssessmentScore),
      mergeMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface>>(
            `${environment.baseUrl}/StudentClassSubjectAssessmentScore/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((response) => StudentClassSubjectAssessmentScoreActions.createStudentClassSubjectAssessmentScoreSuccess({ payload: response })),
            catchError((error) => of(StudentClassSubjectAssessmentScoreActions.createStudentClassSubjectAssessmentScoreFail({ error: error.message })))
          )
      )
    )
  );

  // Update
  updateStudentClassSubjectAssessmentScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassSubjectAssessmentScoreActions.updateStudentClassSubjectAssessmentScore),
      mergeMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface>>(
            `${environment.baseUrl}/StudentClassSubjectAssessmentScore/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((response) => StudentClassSubjectAssessmentScoreActions.updateStudentClassSubjectAssessmentScoreSuccess({ payload: response })),
            catchError((error) => of(StudentClassSubjectAssessmentScoreActions.updateStudentClassSubjectAssessmentScoreFail({ error: error.message })))
          )
      )
    )
  );

  // Delete
  deleteStudentClassSubjectAssessmentScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassSubjectAssessmentScoreActions.deleteStudentClassSubjectAssessmentScore),
      mergeMap(({ id }) => {
        const params = new HttpParams().set('id', id);
        return this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/StudentClassSubjectAssessmentScore/Delete`,
            { params, withCredentials: true }
          )
          .pipe(
            map((response) => StudentClassSubjectAssessmentScoreActions.deleteStudentClassSubjectAssessmentScoreSuccess({ payload: response })),
            catchError((error) => of(StudentClassSubjectAssessmentScoreActions.deleteStudentClassSubjectAssessmentScoreFail({ error: error.message })))
          );
      })
    )
  );

  // Create Many
  createManyStudentClassSubjectAssessmentScores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassSubjectAssessmentScoreActions.createManyStudentClassSubjectAssessmentScores),
      mergeMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]>>(
            `${environment.baseUrl}/StudentClassSubjectAssessmentScore/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((response) => StudentClassSubjectAssessmentScoreActions.createManyStudentClassSubjectAssessmentScoresSuccess({ payload: response })),
            catchError((error) => of(StudentClassSubjectAssessmentScoreActions.createManyStudentClassSubjectAssessmentScoresFail({ error: error.message })))
          )
      )
    )
  );

  // Update Many
  updateManyStudentClassSubjectAssessmentScores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassSubjectAssessmentScoreActions.updateManyStudentClassSubjectAssessmentScores),
      mergeMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]>>(
            `${environment.baseUrl}/StudentClassSubjectAssessmentScore/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((response) => StudentClassSubjectAssessmentScoreActions.updateManyStudentClassSubjectAssessmentScoresSuccess({ payload: response })),
            catchError((error) => of(StudentClassSubjectAssessmentScoreActions.updateManyStudentClassSubjectAssessmentScoresFail({ error: error.message })))
          )
      )
    )
  );

  // Delete Many
  deleteManyStudentClassSubjectAssessmentScores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassSubjectAssessmentScoreActions.deleteManyStudentClassSubjectAssessmentScores),
      mergeMap(({ ids }) => {
        const params = new HttpParams().set('ids', JSON.stringify(ids));
        return this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/StudentClassSubjectAssessmentScore/DeleteMany`,
            { params, withCredentials: true }
          )
          .pipe(
            map((response) => StudentClassSubjectAssessmentScoreActions.deleteManyStudentClassSubjectAssessmentScoresSuccess({ payload: response })),
            catchError((error) => of(StudentClassSubjectAssessmentScoreActions.deleteManyStudentClassSubjectAssessmentScoresFail({ error: error.message })))
          );
      })
    )
  );
}
