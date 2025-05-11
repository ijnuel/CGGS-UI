import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as StudentClassAction from './student-class.actions';
import { environment } from '../../../environments/environment';
import {
  StudentClassListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class StudentClassEffect {
  $studentClassList = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassAction.getStudentClassList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<StudentClassListInterface[]>
            >
          >(`${environment.baseUrl}/StudentClass/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              StudentClassAction.getStudentClassListSuccess({ payload })
            ),
            catchError((error) => {
              return of(StudentClassAction.getStudentClassListFail({ error }));
            })
          )
      )
    )
  );

  $studentClassById = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassAction.getStudentClassById),
      switchMap(({ studentClassId }) =>
        this.http
          .get<GenericResponseInterface<StudentClassListInterface>>(
            `${environment.baseUrl}/StudentClass/GetById`,
            {
              params: { studentClassId },
              // withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              StudentClassAction.getStudentClassByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(StudentClassAction.getStudentClassByIdFail({ error }));
            })
          )
      )
    )
  );

  $createStudentClass = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassAction.createStudentClass),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StudentClassListInterface>>(
            `${environment.baseUrl}/StudentClass/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StudentClassAction.createStudentClassSuccess({
                message: 'StudentClass created successfully',
                studentClass: payload.entity,
              })
            ),
            catchError((error) => {
              return of(StudentClassAction.createStudentClassFail({ error }));
            })
          )
      )
    )
  );

  $updateStudentClass = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentClassAction.editStudentClass),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StudentClassListInterface>>(
            `${environment.baseUrl}/StudentClass/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StudentClassAction.editStudentClassSuccess({
                message: 'StudentClass updated successfully',
                studentClass: payload.entity,
              })
            ),
            catchError((error) => {
              return of(StudentClassAction.editStudentClassFail({ error }));
            })
          )
      )
    )
  );

  $studentClassLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudentClassAction.createStudentClass, StudentClassAction.editStudentClass),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $studentClassLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          StudentClassAction.createStudentClassSuccess,
          StudentClassAction.createStudentClassFail,
          StudentClassAction.editStudentClassSuccess,
          StudentClassAction.editStudentClassFail
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
