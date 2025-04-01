import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as StudentsAction from './students.actions';
import { environment } from '../../../environments/environment';
import {
  StudentsListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class StudentsEffect {
  $studentsList = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsAction.getStudentsList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<StudentsListInterface[]>
            >
          >(`${environment.baseUrl}/Student/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              StudentsAction.getStudentsListSuccess({ payload })
            ),
            catchError((error) => {
              return of(StudentsAction.getStudentsListFail({ error }));
            })
          )
      )
    )
  );

  $studentById = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsAction.getStudentById),
      switchMap(({ studentId }) =>
        this.http
          .get<GenericResponseInterface<StudentsListInterface>>(
            `${environment.baseUrl}/Student/GetById`,
            {
              params: { studentId },
              // withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              StudentsAction.getStudentByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(StudentsAction.getStudentByIdFail({ error }));
            })
          )
      )
    )
  );

  $createStudent = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsAction.createStudent),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StudentsListInterface>>(
            `${environment.baseUrl}/Student/Create`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StudentsAction.createStudentSuccess({
                message: 'Student created successfully',
                student: payload.entity,
              })
            ),
            catchError((error) => {
              return of(StudentsAction.createStudentFail({ error }));
            })
          )
      )
    )
  );

  $updateStudent = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsAction.editStudent),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StudentsListInterface>>(
            `${environment.baseUrl}/Student/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StudentsAction.editStudentSuccess({
                message: 'Student updated successfully',
                student: payload.entity,
              })
            ),
            catchError((error) => {
              return of(StudentsAction.editStudentFail({ error }));
            })
          )
      )
    )
  );

  $studentLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudentsAction.createStudent, StudentsAction.editStudent),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $studentLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          StudentsAction.createStudentSuccess,
          StudentsAction.createStudentFail,
          StudentsAction.editStudentSuccess,
          StudentsAction.editStudentFail
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
