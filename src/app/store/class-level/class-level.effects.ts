import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ClassLevelAction from './class-level.actions';
import { environment } from '../../../environments/environment';
import {
  ClassLevelListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class ClassLevelEffect {
  $classLevelList = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.getClassLevelList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<ClassLevelListInterface[]>
            >
          >(`${environment.baseUrl}/ClassLevel/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              ClassLevelAction.getClassLevelListSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassLevelAction.getClassLevelListFail({ error }));
            })
          )
      )
    )
  );

  $classLevelById = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.getClassLevelById),
      switchMap(({ classLevelId }) =>
        this.http
          .get<GenericResponseInterface<ClassLevelListInterface>>(
            `${environment.baseUrl}/ClassLevel/GetById`,
            {
              params: { classLevelId },
              // withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.getClassLevelByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(ClassLevelAction.getClassLevelByIdFail({ error }));
            })
          )
      )
    )
  );

  $createClassLevel = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.createClassLevel),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassLevelListInterface>>(
            `${environment.baseUrl}/ClassLevel/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.createClassLevelSuccess({
                message: 'ClassLevel created successfully',
                classLevel: payload.entity,
              })
            ),
            catchError((error) => {
              return of(ClassLevelAction.createClassLevelFail({ error }));
            })
          )
      )
    )
  );

  $updateClassLevel = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassLevelAction.editClassLevel),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ClassLevelListInterface>>(
            `${environment.baseUrl}/ClassLevel/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassLevelAction.editClassLevelSuccess({
                message: 'ClassLevel updated successfully',
                classLevel: payload.entity,
              })
            ),
            catchError((error) => {
              return of(ClassLevelAction.editClassLevelFail({ error }));
            })
          )
      )
    )
  );

  $classLevelLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ClassLevelAction.createClassLevel, ClassLevelAction.editClassLevel),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $classLevelLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ClassLevelAction.createClassLevelSuccess,
          ClassLevelAction.createClassLevelFail,
          ClassLevelAction.editClassLevelSuccess,
          ClassLevelAction.editClassLevelFail
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
