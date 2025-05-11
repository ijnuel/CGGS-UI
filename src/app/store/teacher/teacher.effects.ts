import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as TeacherAction from './teacher.actions';
import { environment } from '../../../environments/environment';
import {
  TeacherListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class TeacherEffect {
  $teacherList = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherAction.getTeacherList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<TeacherListInterface[]>
            >
          >(`${environment.baseUrl}/Teacher/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              TeacherAction.getTeacherListSuccess({ payload })
            ),
            catchError((error) => {
              return of(TeacherAction.getTeacherListFail({ error }));
            })
          )
      )
    )
  );

  $teacherById = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherAction.getTeacherById),
      switchMap(({ teacherId }) =>
        this.http
          .get<GenericResponseInterface<TeacherListInterface>>(
            `${environment.baseUrl}/Teacher/GetById`,
            {
              params: { teacherId },
              // withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              TeacherAction.getTeacherByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(TeacherAction.getTeacherByIdFail({ error }));
            })
          )
      )
    )
  );

  $createTeacher = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherAction.createTeacher),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<TeacherListInterface>>(
            `${environment.baseUrl}/Teacher/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TeacherAction.createTeacherSuccess({
                message: 'Teacher created successfully',
                teacher: payload.entity,
              })
            ),
            catchError((error) => {
              return of(TeacherAction.createTeacherFail({ error }));
            })
          )
      )
    )
  );

  $updateTeacher = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherAction.editTeacher),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<TeacherListInterface>>(
            `${environment.baseUrl}/Teacher/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              TeacherAction.editTeacherSuccess({
                message: 'Teacher updated successfully',
                teacher: payload.entity,
              })
            ),
            catchError((error) => {
              return of(TeacherAction.editTeacherFail({ error }));
            })
          )
      )
    )
  );

  $teacherLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TeacherAction.createTeacher, TeacherAction.editTeacher),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $teacherLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TeacherAction.createTeacherSuccess,
          TeacherAction.createTeacherFail,
          TeacherAction.editTeacherSuccess,
          TeacherAction.editTeacherFail
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
