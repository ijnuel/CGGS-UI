import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as ClassSubjectActions from './class-subject.actions';
import { ClassSubjectInterface, ClassSubjectFormInterface } from '../../types/class-subject';
import { GenericResponseInterface, PaginatedResponseInterface } from '../../types';

@Injectable()
export class ClassSubjectEffects {
  addSubjectToClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.addSubjectToClass),
      switchMap(({ classId, subjectId }) =>
        this.http.post<GenericResponseInterface<any>>(
          `${environment.baseUrl}/ClassSubject/AddSubjectToClass`,
          { classId, subjectId },
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectActions.addSubjectToClassSuccess({ payload })),
          catchError(error => of(ClassSubjectActions.addSubjectToClassFail({ error })))
        )
      )
    )
  );

  loadClassSubjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.loadClassSubjects),
      switchMap(() =>
        this.http.get<GenericResponseInterface<ClassSubjectInterface[]>>(
          `${environment.baseUrl}/ClassSubject/GetAll`,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectActions.loadClassSubjectsSuccess({ payload })),
          catchError(error => of(ClassSubjectActions.loadClassSubjectsFail({ error })))
        )
      )
    )
  );

  loadClassSubjectsPaginated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.loadClassSubjectsPaginated),
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
          .get<GenericResponseInterface<PaginatedResponseInterface<ClassSubjectInterface[]>>>(
            `${environment.baseUrl}/ClassSubject/GetAllPaginated`,
            {
              params,
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ClassSubjectActions.loadClassSubjectsPaginatedSuccess({ payload })
            ),
            catchError((error) => {
              return of(ClassSubjectActions.loadClassSubjectsPaginatedFail({ error }));
            })
          );
      })
    )
  );

  getClassSubjectById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.getClassSubjectById),
      switchMap(({ id }) =>
        this.http.get<GenericResponseInterface<ClassSubjectInterface>>(
          `${environment.baseUrl}/ClassSubject/GetById?id=${id}`,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectActions.getClassSubjectByIdSuccess({ payload })),
          catchError(error => of(ClassSubjectActions.getClassSubjectByIdFail({ error })))
        )
      )
    )
  );

  getClassSubjectByProperties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.getClassSubjectByProperties),
      switchMap(({ properties }) =>
        this.http.post<GenericResponseInterface<ClassSubjectInterface[]>>(
          `${environment.baseUrl}/ClassSubject/GetByProperties`,
          properties,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectActions.getClassSubjectByPropertiesSuccess({ payload })),
          catchError(error => of(ClassSubjectActions.getClassSubjectByPropertiesFail({ error })))
        )
      )
    )
  );

  classSubjectExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.classSubjectExists),
      switchMap(({ properties }) =>
        this.http.post<GenericResponseInterface<boolean>>(
          `${environment.baseUrl}/ClassSubject/Exists`,
          properties,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectActions.classSubjectExistsSuccess({ payload })),
          catchError(error => of(ClassSubjectActions.classSubjectExistsFail({ error })))
        )
      )
    )
  );

  classSubjectCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.classSubjectCount),
      switchMap(() =>
        this.http.get<GenericResponseInterface<number>>(
          `${environment.baseUrl}/ClassSubject/Count`,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectActions.classSubjectCountSuccess({ payload })),
          catchError(error => of(ClassSubjectActions.classSubjectCountFail({ error })))
        )
      )
    )
  );

  createClassSubject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.createClassSubject),
      switchMap(({ form }) =>
        this.http.post<GenericResponseInterface<ClassSubjectInterface>>(
          `${environment.baseUrl}/ClassSubject/Create`,
          form,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectActions.createClassSubjectSuccess({ payload })),
          catchError(error => of(ClassSubjectActions.createClassSubjectFail({ error })))
        )
      )
    )
  );

  updateClassSubject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.updateClassSubject),
      switchMap(({ id, form }) =>
        this.http.put<GenericResponseInterface<ClassSubjectInterface>>(
          `${environment.baseUrl}/ClassSubject/Update?id=${id}`,
          form,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectActions.updateClassSubjectSuccess({ payload })),
          catchError(error => of(ClassSubjectActions.updateClassSubjectFail({ error })))
        )
      )
    )
  );

  deleteClassSubject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.deleteClassSubject),
      switchMap(({ id }) =>
        this.http.delete<GenericResponseInterface<any>>(
          `${environment.baseUrl}/ClassSubject/Delete?id=${id}`,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectActions.deleteClassSubjectSuccess({ payload })),
          catchError(error => of(ClassSubjectActions.deleteClassSubjectFail({ error })))
        )
      )
    )
  );

  createManyClassSubjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.createManyClassSubjects),
      switchMap(({ forms }) =>
        this.http.post<GenericResponseInterface<ClassSubjectInterface[]>>(
          `${environment.baseUrl}/ClassSubject/CreateMany`,
          forms,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectActions.createManyClassSubjectsSuccess({ payload })),
          catchError(error => of(ClassSubjectActions.createManyClassSubjectsFail({ error })))
        )
      )
    )
  );

  updateManyClassSubjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.updateManyClassSubjects),
      switchMap(({ forms }) =>
        this.http.put<GenericResponseInterface<ClassSubjectInterface[]>>(
          `${environment.baseUrl}/ClassSubject/UpdateMany`,
          forms,
          { withCredentials: true }
        ).pipe(
          map(payload => ClassSubjectActions.updateManyClassSubjectsSuccess({ payload })),
          catchError(error => of(ClassSubjectActions.updateManyClassSubjectsFail({ error })))
        )
      )
    )
  );

  deleteManyClassSubjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassSubjectActions.deleteManyClassSubjects),
      switchMap(({ ids }) =>
        this.http.request<GenericResponseInterface<any>>('delete', `${environment.baseUrl}/ClassSubject/DeleteMany`, {
          body: ids,
          withCredentials: true
        }).pipe(
          map(payload => ClassSubjectActions.deleteManyClassSubjectsSuccess({ payload })),
          catchError(error => of(ClassSubjectActions.deleteManyClassSubjectsFail({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
} 