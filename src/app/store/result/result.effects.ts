import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResultMarkSheetInterface } from '../../types/result';
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
          .get<GenericResponseInterface<ResultMarkSheetInterface>>(
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
          .put<GenericResponseInterface<ResultMarkSheetInterface>>(
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
} 