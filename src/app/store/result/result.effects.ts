import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StudentAssessmentScoreInterface } from '../../types/result';
import { GenericResponseInterface } from '../../types';
import * as ResultActions from './result.actions';

@Injectable()
export class ResultEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  getResultMarkSheet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultActions.getResultMarkSheet),
      mergeMap(({ schoolTermSessionId, classId, subjectId }) => {
        const params = new HttpParams()
          .set('schoolTermSessionId', schoolTermSessionId)
          .set('classId', classId)
          .set('subjectId', subjectId);

        return this.http
          .get<GenericResponseInterface<StudentAssessmentScoreInterface[]>>(
            `${environment.baseUrl}/Result/GetResultMarkSheet`,
            { params, withCredentials: true }
          )
          .pipe(
            map((response) => ResultActions.getResultMarkSheetSuccess({ payload: response })),
            catchError((error) => of(ResultActions.getResultMarkSheetFail({ error: error.message })))
          );
      })
    )
  );

  updateResultMarkSheet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultActions.updateResultMarkSheet),
      mergeMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<StudentAssessmentScoreInterface[]>>(
            `${environment.baseUrl}/Result/UpdateResultMarkSheet`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((response) => ResultActions.updateResultMarkSheetSuccess({ payload: response })),
            catchError((error) => of(ResultActions.updateResultMarkSheetFail({ error: error.message })))
          )
      )
    )
  );

  generateStudentResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultActions.generateStudentResult),
      mergeMap(({ schoolTermSessionId, studentId, hideOverallPosition }) => {
        const params = new HttpParams()
          .set('schoolTermSessionId', schoolTermSessionId)
          .set('studentId', studentId)
          .set('hideOverallPosition', hideOverallPosition.toString());

        return this.http
          .get(`${environment.baseUrl}/Result/GenerateStudentResult`, {
            params,
            responseType: 'blob',
            withCredentials: true,
          })
          .pipe(
            map((blob) => ResultActions.generateStudentResultSuccess({ payload: blob })),
            catchError((error) =>
              of(ResultActions.generateStudentResultFail({ error: error.message }))
            )
          );
      })
    )
  );

  generateClassResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultActions.generateClassResult),
      mergeMap(({ schoolTermSessionId, classId, hideOverallPosition }) => {
        const params = new HttpParams()
          .set('schoolTermSessionId', schoolTermSessionId)
          .set('classId', classId)
          .set('hideOverallPosition', hideOverallPosition.toString());

        return this.http
          .get(`${environment.baseUrl}/Result/GenerateClassResult`, {
            params,
            responseType: 'blob',
            withCredentials: true,
          })
          .pipe(
            map((blob) => ResultActions.generateClassResultSuccess({ payload: blob })),
            catchError((error) =>
              of(ResultActions.generateClassResultFail({ error: error.message }))
            )
          );
      })
    )
  );

  generateBroadSheet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResultActions.generateBroadSheet),
      mergeMap(({ schoolTermSessionId, classId }) => {
        const params = new HttpParams()
          .set('schoolTermSessionId', schoolTermSessionId)
          .set('classId', classId)

        return this.http
          .get(`${environment.baseUrl}/Result/GenerateBroadSheet`, {
            params,
            responseType: 'blob',
            withCredentials: true,
          })
          .pipe(
            map((blob) => ResultActions.generateBroadSheetSuccess({ payload: blob })),
            catchError((error) =>
              of(ResultActions.generateBroadSheetFail({ error: error.message }))
            )
          );
      })
    )
  );
} 