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
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class ClassEffect {
  $classList = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.getClassList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<ClassListInterface[]>
            >
          >(`${environment.baseUrl}/Class/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              ClassAction.getClassListSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassAction.getClassListFail({ error }));
            })
          )
      )
    )
  );

  $classById = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.getClassById),
      switchMap(({ classId }) =>
        this.http
          .get<GenericResponseInterface<ClassListInterface>>(
            `${environment.baseUrl}/Class/GetById`,
            {
              params: { classId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ClassAction.getClassByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(ClassAction.getClassByIdFail({ error }));
            })
          )
      )
    )
  );

  $createClass = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.createClass),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassListInterface>>(
            `${environment.baseUrl}/Class/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassAction.createClassSuccess({
                message: 'Class created successfully',
                class: payload.entity,
              })
            ),
            catchError((error) => {
              return of(ClassAction.createClassFail({ error }));
            })
          )
      )
    )
  );

  $updateClass = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassAction.editClass),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassListInterface>>(
            `${environment.baseUrl}/Class/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassAction.editClassSuccess({
                message: 'Class updated successfully',
                class: payload.entity,
              })
            ),
            catchError((error) => {
              return of(ClassAction.editClassFail({ error }));
            })
          )
      )
    )
  );

  $classLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ClassAction.createClass, ClassAction.editClass),
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
          ClassAction.editClassSuccess,
          ClassAction.editClassFail
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
