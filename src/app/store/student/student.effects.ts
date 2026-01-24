import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as StudentAction from './student.actions';
import { environment } from '../../../environments/environment';
import {
  StudentListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  StudentFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class StudentEffect {
  // Get All (non-paginated)
  $studentAll = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.getStudentAll),
      switchMap(() =>
        this.http
          .post<GenericResponseInterface<StudentListInterface[]>>(
            `${environment.baseUrl}/Student/GetAll`,
            [],
            { withCredentials: true }
          )
          .pipe(
            map((payload) => {
              return StudentAction.getStudentAllSuccess({ 
                payload: { ...payload, entity: payload.entity }
              });
            }),
            catchError((error) => {
              return of(StudentAction.getStudentAllFail({ error }));
            })
          )
      )
    )
  );

  // Get Students Without Class
  $studentsWithoutClass = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.getStudentsWithoutClass),
      switchMap(({ sessionId }) =>
        this.http
          .get<GenericResponseInterface<StudentListInterface[]>>(
            `${environment.baseUrl}/Student/GetStudentsWithoutClass`,
            {
              params: { sessionId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) => {
              return StudentAction.getStudentsWithoutClassSuccess({ 
                payload: { ...payload, entity: payload.entity }
              });
            }),
            catchError((error) => {
              return of(StudentAction.getStudentsWithoutClassFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $studentList = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.getStudentList),
      switchMap(({ pageQuery }) => {
        

        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<StudentListInterface[]>>>(
            `${environment.baseUrl}/Student/GetAllPaginated`,
            pageQuery,
            { withCredentials: true }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<StudentListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return StudentAction.getStudentListSuccess({ 
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
            catchError((error) => {
              return of(StudentAction.getStudentListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $studentById = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.getStudentById),
      switchMap(({ studentId }) =>
        this.http
          .get<GenericResponseInterface<StudentListInterface>>(
            `${environment.baseUrl}/Student/GetById`,
            {
              params: { id: studentId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) => {
              return StudentAction.getStudentByIdSuccess({ 
                payload: { ...payload, entity: payload.entity }
              });
            }),
            catchError((error) => {
              return of(StudentAction.getStudentByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $studentByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.getStudentByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<StudentListInterface[]>>(
            `${environment.baseUrl}/Student/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) => {
              return StudentAction.getStudentByPropertiesSuccess({ 
                payload: { ...payload, entity: payload.entity }
              });
            }),
            catchError((error) => {
              return of(StudentAction.getStudentByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $studentExists = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.studentExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Student/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StudentAction.studentExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(StudentAction.studentExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $studentCount = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.studentCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/Student/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              StudentAction.studentCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(StudentAction.studentCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createStudent = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.createStudent),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StudentListInterface>>(
            `${environment.baseUrl}/Student/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) => {
              return StudentAction.createStudentSuccess({ 
                payload: { ...payload, entity: payload.entity }
              });
            }),
            catchError((error) => {
              return of(StudentAction.createStudentFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateStudent = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.updateStudent),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<StudentListInterface>>(
            `${environment.baseUrl}/Student/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) => {
              return StudentAction.updateStudentSuccess({ 
                payload: { ...payload, entity: payload.entity }
              });
            }),
            catchError((error) => {
              return of(StudentAction.updateStudentFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteStudent = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.deleteStudent),
      switchMap(({ studentId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Student/Delete`,
            {
              params: { id: studentId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              StudentAction.deleteStudentSuccess({ payload })
            ),
            catchError((error) => {
              return of(StudentAction.deleteStudentFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyStudents = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.createManyStudents),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StudentListInterface[]>>(
            `${environment.baseUrl}/Student/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) => {
              return StudentAction.createManyStudentsSuccess({ 
                payload: { ...payload, entity: payload.entity }
              });
            }),
            catchError((error) => {
              return of(StudentAction.createManyStudentsFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyStudents = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.updateManyStudents),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<StudentListInterface[]>>(
            `${environment.baseUrl}/Student/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) => {
              return StudentAction.updateManyStudentsSuccess({ 
                payload: { ...payload, entity: payload.entity }
              });
            }),
            catchError((error) => {
              return of(StudentAction.updateManyStudentsFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyStudents = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentAction.deleteManyStudents),
      switchMap(({ studentIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/Student/DeleteMany`,
            {
              params: { ids: studentIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              StudentAction.deleteManyStudentsSuccess({ payload })
            ),
            catchError((error) => {
              return of(StudentAction.deleteManyStudentsFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $studentLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          StudentAction.createStudent,
          StudentAction.updateStudent,
          StudentAction.deleteStudent,
          StudentAction.createManyStudents,
          StudentAction.updateManyStudents,
          StudentAction.deleteManyStudents
        ),
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
          StudentAction.createStudentSuccess,
          StudentAction.createStudentFail,
          StudentAction.updateStudentSuccess,
          StudentAction.updateStudentFail,
          StudentAction.deleteStudentSuccess,
          StudentAction.deleteStudentFail,
          StudentAction.createManyStudentsSuccess,
          StudentAction.createManyStudentsFail,
          StudentAction.updateManyStudentsSuccess,
          StudentAction.updateManyStudentsFail,
          StudentAction.deleteManyStudentsSuccess,
          StudentAction.deleteManyStudentsFail
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
