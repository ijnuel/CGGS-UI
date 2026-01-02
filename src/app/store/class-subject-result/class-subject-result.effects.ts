import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as ClassSubjectResultActions from './class-subject-result.actions';
import { ClassSubjectResultInterface, ClassSubjectResultFormInterface } from '../../types/class-subject-result';
import { GenericResponseInterface, PaginatedResponseInterface } from '../../types';

@Injectable()
export class ClassSubjectResultEffects {
  loadClassSubjectResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectResultActions.loadClassSubjectResults),
      switchMap(() =>
        this.http.get<GenericResponseInterface<ClassSubjectResultInterface[]>>(
          `${environment.baseUrl}/ClassSubjectResult/GetAll`,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectResultActions.loadClassSubjectResultsSuccess({ payload })),
          catchError(error => of(ClassSubjectResultActions.loadClassSubjectResultsFail({ error })))
        )
      )
    )
  );

  loadClassSubjectResultsPaginated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectResultActions.loadClassSubjectResultsPaginated),
      switchMap(({ pageQuery }) => {
        

        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<ClassSubjectResultInterface[]>>>(
            `${environment.baseUrl}/ClassSubjectResult/GetAllPaginated`,
            pageQuery,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ClassSubjectResultActions.loadClassSubjectResultsPaginatedSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectResultActions.loadClassSubjectResultsPaginatedFail({ error }));
            })
          );
      })
    )
  );

  getClassSubjectResultById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectResultActions.getClassSubjectResultById),
      switchMap(({ id }) =>
        this.http.get<GenericResponseInterface<ClassSubjectResultInterface>>(
          `${environment.baseUrl}/ClassSubjectResult/GetById?id=${id}`,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectResultActions.getClassSubjectResultByIdSuccess({ payload })),
          catchError(error => of(ClassSubjectResultActions.getClassSubjectResultByIdFail({ error })))
        )
      )
    )
  );

  getClassSubjectResultByProperties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectResultActions.getClassSubjectResultByProperties),
      switchMap(({ properties }) =>
        this.http.post<GenericResponseInterface<ClassSubjectResultInterface[]>>(
          `${environment.baseUrl}/ClassSubjectResult/GetByProperties`,
          properties,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectResultActions.getClassSubjectResultByPropertiesSuccess({ payload })),
          catchError(error => of(ClassSubjectResultActions.getClassSubjectResultByPropertiesFail({ error })))
        )
      )
    )
  );

  classSubjectResultExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectResultActions.classSubjectResultExists),
      switchMap(({ properties }) =>
        this.http.post<GenericResponseInterface<boolean>>(
          `${environment.baseUrl}/ClassSubjectResult/Exists`,
          properties,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectResultActions.classSubjectResultExistsSuccess({ payload })),
          catchError(error => of(ClassSubjectResultActions.classSubjectResultExistsFail({ error })))
        )
      )
    )
  );

  classSubjectResultCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectResultActions.classSubjectResultCount),
      switchMap(() =>
        this.http.get<GenericResponseInterface<number>>(
          `${environment.baseUrl}/ClassSubjectResult/Count`,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectResultActions.classSubjectResultCountSuccess({ payload })),
          catchError(error => of(ClassSubjectResultActions.classSubjectResultCountFail({ error })))
        )
      )
    )
  );

  createClassSubjectResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectResultActions.createClassSubjectResult),
      switchMap(({ form }) =>
        this.http.post<GenericResponseInterface<ClassSubjectResultInterface>>(
          `${environment.baseUrl}/ClassSubjectResult/Create`,
          form,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectResultActions.createClassSubjectResultSuccess({ payload })),
          catchError(error => of(ClassSubjectResultActions.createClassSubjectResultFail({ error })))
        )
      )
    )
  );

  updateClassSubjectResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectResultActions.updateClassSubjectResult),
      switchMap(({ id, form }) =>
        this.http.put<GenericResponseInterface<ClassSubjectResultInterface>>(
          `${environment.baseUrl}/ClassSubjectResult/Update?id=${id}`,
          form,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectResultActions.updateClassSubjectResultSuccess({ payload })),
          catchError(error => of(ClassSubjectResultActions.updateClassSubjectResultFail({ error })))
        )
      )
    )
  );

  deleteClassSubjectResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectResultActions.deleteClassSubjectResult),
      switchMap(({ id }) =>
        this.http.delete<GenericResponseInterface<any>>(
          `${environment.baseUrl}/ClassSubjectResult/Delete?id=${id}`,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectResultActions.deleteClassSubjectResultSuccess({ payload })),
          catchError(error => of(ClassSubjectResultActions.deleteClassSubjectResultFail({ error })))
        )
      )
    )
  );

  createManyClassSubjectResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectResultActions.createManyClassSubjectResults),
      switchMap(({ forms }) =>
        this.http.post<GenericResponseInterface<ClassSubjectResultInterface[]>>(
          `${environment.baseUrl}/ClassSubjectResult/CreateMany`,
          forms,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectResultActions.createManyClassSubjectResultsSuccess({ payload })),
          catchError(error => of(ClassSubjectResultActions.createManyClassSubjectResultsFail({ error })))
        )
      )
    )
  );

  updateManyClassSubjectResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectResultActions.updateManyClassSubjectResults),
      switchMap(({ forms }) =>
        this.http.put<GenericResponseInterface<ClassSubjectResultInterface[]>>(
          `${environment.baseUrl}/ClassSubjectResult/UpdateMany`,
          forms,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectResultActions.updateManyClassSubjectResultsSuccess({ payload })),
          catchError(error => of(ClassSubjectResultActions.updateManyClassSubjectResultsFail({ error })))
        )
      )
    )
  );

  deleteManyClassSubjectResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectResultActions.deleteManyClassSubjectResults),
      switchMap(({ ids }) =>
        this.http.request<GenericResponseInterface<any>>('delete', `${environment.baseUrl}/ClassSubjectResult/DeleteMany`, {
          body: ids,
          withCredentials: true
        }).pipe(
          map(payload => ClassSubjectResultActions.deleteManyClassSubjectResultsSuccess({ payload })),
          catchError(error => of(ClassSubjectResultActions.deleteManyClassSubjectResultsFail({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
} 